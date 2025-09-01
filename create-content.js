const axios = require('axios');

// Base URL for Strapi API
const STRAPI_URL = 'http://localhost:1337';

// Sample data for tags
const tags = [
  {
    name: 'Cryptocurrency',
    slug: 'cryptocurrency',
    description: 'Articles about cryptocurrencies and digital assets',
    locale: 'en'
  },
  {
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Blockchain technology and applications',
    locale: 'en'
  },
  {
    name: 'Trading',
    slug: 'trading',
    description: 'Trading strategies and market analysis',
    locale: 'en'
  },
  {
    name: 'Kryptowaluty',
    slug: 'kryptowaluty',
    description: 'Artykuły o kryptowalutach i aktywach cyfrowych',
    locale: 'pl'
  },
  {
    name: 'Blockchain',
    slug: 'blockchain-pl',
    description: 'Technologia blockchain i jej zastosowania',
    locale: 'pl'
  },
  {
    name: 'Trading',
    slug: 'trading-pl',
    description: 'Strategie tradingowe i analiza rynku',
    locale: 'pl'
  }
];

// Sample data for articles
const articles = [
  {
    title: 'The Future of Cryptocurrency Trading',
    slug: 'future-of-cryptocurrency-trading',
    content: '<p>Cryptocurrency trading has evolved significantly over the past decade. From the early days of Bitcoin to the current landscape of thousands of digital assets, the market has seen tremendous growth and innovation.</p><h2>Key Trends</h2><p>Several key trends are shaping the future of crypto trading:</p><ul><li>Decentralized exchanges (DEXs) gaining popularity</li><li>Institutional adoption increasing</li><li>Regulatory frameworks developing</li><li>Advanced trading tools and analytics</li></ul><p>The future looks promising for cryptocurrency trading as more traditional financial institutions enter the space.</p>',
    shortDescription: 'Explore the latest trends and innovations in cryptocurrency trading platforms and strategies.',
    seoTitle: 'Future of Cryptocurrency Trading - WandaExchange',
    seoDescription: 'Discover the latest trends in cryptocurrency trading and what the future holds for digital asset markets.',
    seoKeywords: 'cryptocurrency, trading, blockchain, digital assets, crypto market',
    author: 'WandaExchange Team',
    locale: 'en',
    publicationDate: '2025-08-12T10:00:00.000Z'
  },
  {
    title: 'Przyszłość Handlu Kryptowalutami',
    slug: 'przyszlosc-handlu-kryptowalutami',
    content: '<p>Handel kryptowalutami znacząco ewoluował w ciągu ostatniej dekady. Od wczesnych dni Bitcoina po obecny krajobraz tysięcy aktywów cyfrowych, rynek odnotował ogromny wzrost i innowacje.</p><h2>Kluczowe Trendy</h2><p>Kilka kluczowych trendów kształtuje przyszłość handlu krypto:</p><ul><li>Zdecentralizowane giełdy (DEX) zyskują popularność</li><li>Zwiększa się adopcja instytucjonalna</li><li>Rozwijają się ramy regulacyjne</li><li>Zaawansowane narzędzia tradingowe i analityka</li></ul><p>Przyszłość wygląda obiecująco dla handlu kryptowalutami, gdy coraz więcej tradycyjnych instytucji finansowych wchodzi w tę przestrzeń.</p>',
    shortDescription: 'Poznaj najnowsze trendy i innowacje w platformach handlu kryptowalutami i strategiach.',
    seoTitle: 'Przyszłość Handlu Kryptowalutami - WandaExchange',
    seoDescription: 'Odkryj najnowsze trendy w handlu kryptowalutami i co przyniesie przyszłość dla rynków aktywów cyfrowych.',
    seoKeywords: 'kryptowaluty, trading, blockchain, aktywa cyfrowe, rynek krypto',
    author: 'Zespół WandaExchange',
    locale: 'pl',
    publicationDate: '2025-08-12T10:00:00.000Z'
  }
];

async function createTags() {
  console.log('Creating tags...');
  
  for (const tag of tags) {
    try {
      const response = await axios.post(`${STRAPI_URL}/api/tags`, {
        data: tag
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Created tag: ${tag.name} (${tag.locale})`);
    } catch (error) {
      console.log(`❌ Failed to create tag ${tag.name}: ${error.message}`);
    }
  }
}

async function createArticles() {
  console.log('Creating articles...');
  
  for (const article of articles) {
    try {
      const response = await axios.post(`${STRAPI_URL}/api/articles`, {
        data: article
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Created article: ${article.title} (${article.locale})`);
    } catch (error) {
      console.log(`❌ Failed to create article ${article.title}: ${error.message}`);
    }
  }
}

async function testAPI() {
  console.log('Testing API endpoints...');
  
  try {
    // Test getting all articles
    const articlesResponse = await axios.get(`${STRAPI_URL}/api/articles?locale=en`);
    console.log(`✅ Articles API working: ${articlesResponse.data.data.length} articles found`);
    
    // Test getting all tags
    const tagsResponse = await axios.get(`${STRAPI_URL}/api/tags?locale=en`);
    console.log(`✅ Tags API working: ${tagsResponse.data.data.length} tags found`);
    
  } catch (error) {
    console.log(`❌ API test failed: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Starting content creation for WandaExchange Blog...\n');
  
  // First test if the API is working
  await testAPI();
  
  console.log('\n📝 Creating content...\n');
  
  // Create tags first
  await createTags();
  
  // Then create articles
  await createArticles();
  
  console.log('\n🎉 Content creation completed!');
  console.log('\n📊 Test your API endpoints:');
  console.log(`   Articles (EN): ${STRAPI_URL}/api/articles?locale=en`);
  console.log(`   Articles (PL): ${STRAPI_URL}/api/articles?locale=pl`);
  console.log(`   Tags (EN): ${STRAPI_URL}/api/tags?locale=en`);
  console.log(`   Tags (PL): ${STRAPI_URL}/api/tags?locale=pl`);
}

// Run the script
main().catch(console.error);
