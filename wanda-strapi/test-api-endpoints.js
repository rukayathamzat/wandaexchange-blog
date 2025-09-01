/**
 * Comprehensive API Testing Script for WandaExchange Blog
 * 
 * This script tests all API endpoints to ensure they're working correctly
 * before proceeding with content seeding and production deployment.
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:1337';
const ADMIN_TOKEN = 'your_admin_token_here'; // Get this from Strapi admin panel

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Helper function to log test results
function logTest(name, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${name}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${name}`);
    if (details) {
      console.log(`   Details: ${details}`);
    }
  }
  testResults.details.push({ name, passed, details });
}

// Test Strapi connectivity
async function testConnectivity() {
  console.log('\n🔗 Testing Strapi Connectivity...');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/articles`, { timeout: 5000 });
    logTest('Strapi is running and accessible', true);
    return true;
  } catch (error) {
    logTest('Strapi connectivity', false, error.message);
    return false;
  }
}

// Test basic API endpoints
async function testBasicEndpoints() {
  console.log('\n📡 Testing Basic API Endpoints...');
  
  // Test articles endpoint
  try {
    const response = await axios.get(`${BASE_URL}/api/articles`);
    logTest('GET /api/articles', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/articles', false, error.message);
  }
  
  // Test tags endpoint
  try {
    const response = await axios.get(`${BASE_URL}/api/tags`);
    logTest('GET /api/tags', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/tags', false, error.message);
  }
  
  // Test single article endpoint (should return 404 if no articles exist)
  try {
    const response = await axios.get(`${BASE_URL}/api/articles/1`);
    logTest('GET /api/articles/:id', true, `Status: ${response.status}`);
  } catch (error) {
    if (error.response?.status === 404) {
      logTest('GET /api/articles/:id', true, 'Returns 404 for non-existent article (expected)');
    } else {
      logTest('GET /api/articles/:id', false, error.message);
    }
  }
}

// Test custom API endpoints
async function testCustomEndpoints() {
  console.log('\n🔧 Testing Custom API Endpoints...');
  
  // Test articles with pagination
  try {
    const response = await axios.get(`${BASE_URL}/api/articles?page=1&limit=5`);
    logTest('GET /api/articles with pagination', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/articles with pagination', false, error.message);
  }
  
  // Test articles with locale filter
  try {
    const response = await axios.get(`${BASE_URL}/api/articles?locale=en`);
    logTest('GET /api/articles with locale filter', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/articles with locale filter', false, error.message);
  }
  
  // Test articles with search
  try {
    const response = await axios.get(`${BASE_URL}/api/articles?search=crypto`);
    logTest('GET /api/articles with search', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/articles with search', false, error.message);
  }
  
  // Test featured articles endpoint
  try {
    const response = await axios.get(`${BASE_URL}/api/articles/featured`);
    logTest('GET /api/articles/featured', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/articles/featured', false, error.message);
  }
  
  // Test popular tags endpoint
  try {
    const response = await axios.get(`${BASE_URL}/api/tags/popular`);
    logTest('GET /api/tags/popular', true, `Status: ${response.status}`);
  } catch (error) {
    logTest('GET /api/tags/popular', false, error.message);
  }
}

// Test slug-based endpoints
async function testSlugEndpoints() {
  console.log('\n🔗 Testing Slug-based Endpoints...');
  
  // Test article by slug (should return 404 if no articles exist)
  try {
    const response = await axios.get(`${BASE_URL}/api/articles/slug/test-article`);
    logTest('GET /api/articles/slug/:slug', true, `Status: ${response.status}`);
  } catch (error) {
    if (error.response?.status === 404) {
      logTest('GET /api/articles/slug/:slug', true, 'Returns 404 for non-existent slug (expected)');
    } else {
      logTest('GET /api/articles/slug/:slug', false, error.message);
    }
  }
  
  // Test tag by slug (should return 404 if no tags exist)
  try {
    const response = await axios.get(`${BASE_URL}/api/tags/slug/test-tag`);
    logTest('GET /api/tags/slug/:slug', true, `Status: ${response.status}`);
  } catch (error) {
    if (error.response?.status === 404) {
      logTest('GET /api/tags/slug/:slug', true, 'Returns 404 for non-existent slug (expected)');
    } else {
      logTest('GET /api/tags/slug/:slug', false, error.message);
    }
  }
}

// Test admin endpoints (if token is provided)
async function testAdminEndpoints() {
  console.log('\n🔐 Testing Admin Endpoints...');
  
  if (ADMIN_TOKEN === 'your_admin_token_here') {
    logTest('Admin token configured', false, 'Please set ADMIN_TOKEN to test admin endpoints');
    return;
  }
  
  // Test creating a tag
  try {
    const tagData = {
      name: 'Test Tag',
      slug: 'test-tag',
      description: 'Test tag for API testing',
      locale: 'en'
    };
    
    const response = await axios.post(`${BASE_URL}/api/tags`, tagData, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    logTest('POST /api/tags (create tag)', true, `Status: ${response.status}`);
    
    // Clean up - delete the test tag
    const tagId = response.data.data.id;
    await axios.delete(`${BASE_URL}/api/tags/${tagId}`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      }
    });
    
  } catch (error) {
    logTest('POST /api/tags (create tag)', false, error.message);
  }
}

// Test response structure
async function testResponseStructure() {
  console.log('\n📋 Testing Response Structure...');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/articles`);
    
    // Check if response has expected structure
    const hasData = response.data.hasOwnProperty('data');
    const hasMeta = response.data.hasOwnProperty('meta');
    
    logTest('Response has data property', hasData);
    logTest('Response has meta property', hasMeta);
    
    if (hasMeta && response.data.meta.hasOwnProperty('pagination')) {
      logTest('Response has pagination metadata', true);
    } else {
      logTest('Response has pagination metadata', false);
    }
    
  } catch (error) {
    logTest('Response structure validation', false, error.message);
  }
}

// Test error handling
async function testErrorHandling() {
  console.log('\n⚠️ Testing Error Handling...');
  
  // Test invalid article ID
  try {
    await axios.get(`${BASE_URL}/api/articles/invalid-id`);
    logTest('Invalid article ID handling', false, 'Should return 400 or 404');
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 404) {
      logTest('Invalid article ID handling', true, `Returns ${error.response.status} (expected)`);
    } else {
      logTest('Invalid article ID handling', false, `Unexpected status: ${error.response?.status}`);
    }
  }
  
  // Test invalid query parameters
  try {
    await axios.get(`${BASE_URL}/api/articles?page=invalid`);
    logTest('Invalid query parameters handling', false, 'Should return 400');
  } catch (error) {
    if (error.response?.status === 400) {
      logTest('Invalid query parameters handling', true, 'Returns 400 (expected)');
    } else {
      logTest('Invalid query parameters handling', false, `Unexpected status: ${error.response?.status}`);
    }
  }
}

// Test performance
async function testPerformance() {
  console.log('\n⚡ Testing Performance...');
  
  const startTime = Date.now();
  
  try {
    await axios.get(`${BASE_URL}/api/articles`);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    if (duration < 1000) {
      logTest('API response time', true, `${duration}ms (under 1 second)`);
    } else {
      logTest('API response time', false, `${duration}ms (over 1 second)`);
    }
  } catch (error) {
    logTest('API response time', false, error.message);
  }
}

// Print test summary
function printSummary() {
  console.log('\n📊 Test Summary');
  console.log('==============');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.details
      .filter(test => !test.passed)
      .forEach(test => {
        console.log(`   - ${test.name}: ${test.details}`);
      });
  }
  
  console.log('\n🎯 Recommendations:');
  if (testResults.failed === 0) {
    console.log('✅ All tests passed! The API is ready for content seeding and production deployment.');
  } else {
    console.log('⚠️ Some tests failed. Please review the issues before proceeding.');
  }
}

// Main testing function
async function runTests() {
  console.log('🧪 Starting Comprehensive API Tests');
  console.log('====================================');
  console.log(`📍 Target URL: ${BASE_URL}`);
  console.log(`🔑 Admin Token: ${ADMIN_TOKEN === 'your_admin_token_here' ? 'NOT SET' : 'SET'}`);
  
  // Run all tests
  const isConnected = await testConnectivity();
  if (!isConnected) {
    console.log('\n❌ Cannot proceed with tests - Strapi is not accessible');
    return;
  }
  
  await testBasicEndpoints();
  await testCustomEndpoints();
  await testSlugEndpoints();
  await testAdminEndpoints();
  await testResponseStructure();
  await testErrorHandling();
  await testPerformance();
  
  printSummary();
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  });
}

module.exports = { runTests, testResults };
