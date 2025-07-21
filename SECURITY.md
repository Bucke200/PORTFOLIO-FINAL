# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: srinjaypanja200@gmail.com
3. Include detailed information about the vulnerability
4. Allow reasonable time for response before public disclosure

## Security Measures Implemented

### Input Validation & Sanitization
- ✅ Email format validation with regex
- ✅ Input length limits enforced
- ✅ HTML/script tag sanitization
- ✅ Control character removal
- ✅ Required field validation

### Rate Limiting
- ✅ Contact form rate limiting (5 requests per 15 minutes)
- ✅ IP-based tracking
- ✅ Configurable limits

### Security Headers
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Content Security Policy (CSP)

### Data Protection
- ✅ Environment variables for sensitive data
- ✅ No hardcoded secrets in code
- ✅ Secure error handling (no information leakage)
- ✅ Input sanitization before email sending

### CORS Configuration
- ✅ Restricted origins in production
- ✅ Limited HTTP methods
- ✅ Controlled headers

## Environment Variables Required

```bash
# SMTP Configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password

# Email Configuration
EMAIL_FROM=your-verified-sender@yourdomain.com
EMAIL_TO=your-email@yourdomain.com

# Environment
NODE_ENV=production
```

## Security Best Practices

### For Deployment
1. Use HTTPS in production
2. Set up proper environment variables
3. Configure firewall rules
4. Enable logging and monitoring
5. Regular security updates
6. Use a reverse proxy (nginx/cloudflare)

### For Development
1. Never commit `.env.local` files
2. Use `.env.example` for documentation
3. Rotate credentials if accidentally exposed
4. Test security headers in staging
5. Validate all user inputs

## Content Security Policy

The application implements a strict CSP that:
- Blocks inline scripts (except where required for Three.js)
- Prevents XSS attacks
- Restricts resource loading to trusted sources
- Blocks object/embed tags
- Enforces HTTPS upgrades

## Rate Limiting Details

- **Contact Form**: 5 requests per 15-minute window per IP
- **Implementation**: In-memory store (use Redis in production)
- **Response**: 429 Too Many Requests with retry message

## Known Security Considerations

1. **Three.js Requirements**: CSP allows `unsafe-eval` for WebGL functionality
2. **Rate Limiting**: Current implementation uses in-memory storage (not persistent)
3. **Email Validation**: Client-side validation supplemented by server-side checks

## Security Checklist for Production

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers verified
- [ ] Rate limiting tested
- [ ] Error handling reviewed
- [ ] Logging configured
- [ ] Backup procedures in place
- [ ] Monitoring alerts set up

## Updates and Maintenance

- Security patches applied regularly
- Dependencies updated monthly
- Security audit performed quarterly
- Penetration testing recommended annually

## Contact

For security-related questions or concerns:
- Email: srinjaypanja200@gmail.com
- Response time: Within 48 hours for critical issues