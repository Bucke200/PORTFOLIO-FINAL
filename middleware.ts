import { NextResponse, type NextRequest } from 'next/server'

// --- Rate Limiting Store ---
// Using a Map to store request timestamps for each IP address.
const requestTimestamps = new Map<string, number[]>()
const RATE_LIMIT_COUNT = 5 // Max requests per window
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes in milliseconds

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1'

  // --- Test Support ---
  // Allow test script to reset rate limit state
  if (request.headers.get('x-test-reset-rate-limit') === 'true') {
    requestTimestamps.delete(ip)
  }
  // Allow test script to bypass rate limit for non-rate-limit tests
  const bypassRateLimit = request.headers.get('x-test-bypass-rate-limit') === 'true';


  // --- Rate Limiting for the Contact API ---
  if (pathname.startsWith('/api/contact') && !bypassRateLimit) {
    const now = Date.now()

    const timestamps = requestTimestamps.get(ip) ?? []

    // Filter out timestamps that are older than the time window
    const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW)

    if (recentTimestamps.length >= RATE_LIMIT_COUNT) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }

    // Add the new timestamp and update the map
    recentTimestamps.push(now)
    requestTimestamps.set(ip, recentTimestamps)
  }

  // --- Security Headers ---
  // This Content Security Policy is a baseline. For a production site, it would
  // need to be carefully tuned to be more restrictive (e.g., by using nonces
  // instead of 'unsafe-inline' and 'unsafe-eval').
  const csp = [
    "default-src 'self'",
    // 'unsafe-eval' may be needed for libraries like Three.js/Framer Motion
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    // Inline styles are used by several libraries
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'", // Prevents clickjacking (replaces X-Frame-Options)
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp.replace(/\s{2,}/g, ' ').trim())
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY') // For older browsers that don't support CSP frame-ancestors
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
