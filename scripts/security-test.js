#!/usr/bin/env node

/**
 * Security Testing Script
 * Run this script to test basic security measures
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

console.log('🔒 Running Security Tests...\n');

// Test 1: Security Headers
async function testSecurityHeaders() {
  console.log('1. Testing Security Headers...');
  
  return new Promise((resolve) => {
    const client = BASE_URL.startsWith('https') ? https : http;
    
    client.get(BASE_URL, (res) => {
      const headers = res.headers;
      
      const requiredHeaders = {
        'x-frame-options': 'DENY',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'strict-origin-when-cross-origin',
      };
      
      let passed = 0;
      let total = Object.keys(requiredHeaders).length;
      
      for (const [header, expectedValue] of Object.entries(requiredHeaders)) {
        if (headers[header] === expectedValue.toLowerCase()) {
          console.log(`   ✅ ${header}: ${headers[header]}`);
          passed++;
        } else {
          console.log(`   ❌ ${header}: ${headers[header] || 'MISSING'} (expected: ${expectedValue})`);
        }
      }
      
      console.log(`   Result: ${passed}/${total} headers correct\n`);
      resolve(passed === total);
    }).on('error', (err) => {
      console.log(`   ❌ Error testing headers: ${err.message}\n`);
      resolve(false);
    });
  });
}

// Test 2: Contact Form Rate Limiting
async function testRateLimit() {
  console.log('2. Testing Rate Limiting...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Security Test',
    message: 'This is a security test message.'
  };
  
  let successCount = 0;
  let rateLimitHit = false;
  
  for (let i = 0; i < 7; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      if (response.status === 429) {
        rateLimitHit = true;
        console.log(`   ✅ Rate limit triggered after ${successCount} requests`);
        break;
      } else if (response.ok) {
        successCount++;
      }
    } catch (error) {
      console.log(`   ⚠️  Request ${i + 1} failed: ${error.message}`);
    }
  }
  
  if (!rateLimitHit && successCount >= 6) {
    console.log(`   ❌ Rate limiting not working (${successCount} successful requests)`);
    return false;
  }
  
  console.log(`   Result: Rate limiting ${rateLimitHit ? 'WORKING' : 'NOT WORKING'}\n`);
  return rateLimitHit;
}

// Test 3: Input Validation
async function testInputValidation() {
  console.log('3. Testing Input Validation...');
  
  const testCases = [
    {
      name: 'Empty fields',
      data: { name: '', email: '', subject: '', message: '' },
      shouldFail: true
    },
    {
      name: 'Invalid email',
      data: { name: 'Test', email: 'invalid-email', subject: 'Test', message: 'Test' },
      shouldFail: true
    },
    {
      name: 'Long name',
      data: { name: 'x'.repeat(101), email: 'test@example.com', subject: 'Test', message: 'Test' },
      shouldFail: true
    },
    {
      name: 'XSS attempt',
      data: { name: '<script>alert("xss")</script>', email: 'test@example.com', subject: 'Test', message: 'Test' },
      shouldFail: false // Should be sanitized, not rejected
    }
  ];
  
  let passed = 0;
  
  for (const testCase of testCases) {
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data),
      });
      
      const failed = response.status >= 400;
      
      if (testCase.shouldFail === failed) {
        console.log(`   ✅ ${testCase.name}: ${failed ? 'Rejected' : 'Accepted'} as expected`);
        passed++;
      } else {
        console.log(`   ❌ ${testCase.name}: ${failed ? 'Rejected' : 'Accepted'} (unexpected)`);
      }
    } catch (error) {
      console.log(`   ⚠️  ${testCase.name}: Request failed - ${error.message}`);
    }
  }
  
  console.log(`   Result: ${passed}/${testCases.length} validation tests passed\n`);
  return passed === testCases.length;
}

// Run all tests
async function runAllTests() {
  const results = [];
  
  results.push(await testSecurityHeaders());
  results.push(await testRateLimit());
  results.push(await testInputValidation());
  
  const passedTests = results.filter(Boolean).length;
  const totalTests = results.length;
  
  console.log('📊 Security Test Summary:');
  console.log(`   Passed: ${passedTests}/${totalTests} test suites`);
  
  if (passedTests === totalTests) {
    console.log('   🎉 All security tests passed!');
    process.exit(0);
  } else {
    console.log('   ⚠️  Some security tests failed. Please review and fix.');
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help')) {
  console.log(`
Security Test Script

Usage:
  node scripts/security-test.js [options]

Options:
  --help          Show this help message

Environment Variables:
  TEST_URL        Base URL to test (default: http://localhost:3000)

Examples:
  node scripts/security-test.js
  TEST_URL=https://yoursite.com node scripts/security-test.js
  `);
  process.exit(0);
}

runAllTests().catch(console.error);