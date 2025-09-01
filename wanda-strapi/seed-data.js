/**
 * Sample Data Seeding Script for WandaExchange Blog
 * 
 * This script creates sample articles and tags for testing the blog functionality.
 * Run this after setting up the database and before going live.
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:1337';
const ADMIN_TOKEN = 'your_admin_token_here'; // Get this from Strapi admin panel

// Sample data
const sampleTags = [
  {
    name: 'Cryptocurrency',
    slug: 'cryptocurrency',
    description: 'Digital currencies and blockchain technology',
    locale: 'en'
  },
  {
    name: 'Kryptowaluty',
    slug: 'kryptowaluty',
    description: 'Cyfrowe waluty i technologia blockchain',
    locale: 'pl'
  },
  {
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Distributed ledger technology',
    locale: 'en'
  },
  {
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Technologia rozproszonego rejestru',
    locale: 'pl'
  },
  {
    name: 'Trading',
    slug: 'trading',
    description: 'Financial trading and investment strategies',
    locale: 'en'
  },
  {
    name: 'Handel',
    slug: 'handel',
    description: 'Strategie handlu finansowego i inwestycji',
    locale: 'pl'
  },
  {
    name: 'DeFi',
    slug: 'defi',
    description: 'Decentralized Finance protocols',
    locale: 'en'
  },
  {
    name: 'DeFi',
    slug: 'defi',
    description: 'Protokoły zdecentralizowanych finansów',
    locale: 'pl'
  },
  {
    name: 'NFTs',
    slug: 'nfts',
    description: 'Non-Fungible Tokens and digital art',
    locale: 'en'
  },
  {
    name: 'NFT',
    slug: 'nft',
    description: 'Tokeny niepodzielne i sztuka cyfrowa',
    locale: 'pl'
  }
];

const sampleArticles = [
  {
    title: 'The Future of Cryptocurrency in 2025',
    slug: 'future-of-cryptocurrency-2025',
    content: `
      <h2>Introduction</h2>
      <p>The cryptocurrency landscape is evolving rapidly, with new technologies and regulations shaping the future of digital finance.</p>
      
      <h2>Key Trends</h2>
      <ul>
        <li>Institutional adoption continues to grow</li>
        <li>Regulatory clarity improves globally</li>
        <li>DeFi protocols become more user-friendly</li>
        <li>Environmental concerns drive green crypto initiatives</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As we move into 2025, cryptocurrency is becoming an integral part of the global financial system.</p>
    `,
    shortDescription: 'Explore the emerging trends and developments in cryptocurrency for 2025 and beyond.',
    author: 'WandaExchange Team',
    publicationDate: new Date('2025-01-15'),
    locale: 'en',
    tags: ['cryptocurrency', 'blockchain', 'trading']
  },
  {
    title: 'Przyszłość kryptowalut w 2025 roku',
    slug: 'przyszlosc-kryptowalut-2025',
    content: `
      <h2>Wprowadzenie</h2>
      <p>Rynek kryptowalut rozwija się w szybkim tempie, a nowe technologie i regulacje kształtują przyszłość cyfrowych finansów.</p>
      
      <h2>Kluczowe trendy</h2>
      <ul>
        <li>Adopcja instytucjonalna nadal rośnie</li>
        <li>Jasność regulacyjna poprawia się globalnie</li>
        <li>Protokoły DeFi stają się bardziej przyjazne dla użytkownika</li>
        <li>Obawy środowiskowe napędzają inicjatywy zielonych kryptowalut</li>
      </ul>
      
      <h2>Podsumowanie</h2>
      <p>W miarę jak wchodzimy w 2025 rok, kryptowaluty stają się integralną częścią globalnego systemu finansowego.</p>
    `,
    shortDescription: 'Poznaj pojawiające się trendy i rozwój kryptowalut na 2025 rok i dalej.',
    author: 'Zespół WandaExchange',
    publicationDate: new Date('2025-01-15'),
    locale: 'pl',
    tags: ['kryptowaluty', 'blockchain', 'handel']
  },
  {
    title: 'Understanding DeFi: A Complete Guide',
    slug: 'understanding-defi-complete-guide',
    content: `
      <h2>What is DeFi?</h2>
      <p>Decentralized Finance (DeFi) represents a paradigm shift in how we think about financial services.</p>
      
      <h2>Core Components</h2>
      <ul>
        <li>Lending and borrowing protocols</li>
        <li>Decentralized exchanges (DEXs)</li>
        <li>Yield farming and liquidity mining</li>
        <li>Stablecoins and synthetic assets</li>
      </ul>
      
      <h2>Benefits</h2>
      <p>DeFi offers greater accessibility, transparency, and control over financial assets compared to traditional finance.</p>
    `,
    shortDescription: 'A comprehensive guide to understanding decentralized finance and its impact on the financial industry.',
    author: 'WandaExchange Team',
    publicationDate: new Date('2025-01-20'),
    locale: 'en',
    tags: ['defi', 'blockchain', 'cryptocurrency']
  },
  {
    title: 'Zrozumienie DeFi: Kompletny przewodnik',
    slug: 'zrozumienie-defi-kompletny-przewodnik',
    content: `
      <h2>Co to jest DeFi?</h2>
      <p>Zdecentralizowane Finanse (DeFi) reprezentują zmianę paradygmatu w sposobie myślenia o usługach finansowych.</p>
      
      <h2>Główne komponenty</h2>
      <ul>
        <li>Protokoły pożyczania i pożyczania</li>
        <li>Zdecentralizowane giełdy (DEX)</li>
        <li>Uprawa plonów i wydobywanie płynności</li>
        <li>Stablecoiny i aktywa syntetyczne</li>
      </ul>
      
      <h2>Korzyści</h2>
      <p>DeFi oferuje większą dostępność, przejrzystość i kontrolę nad aktywami finansowymi w porównaniu z tradycyjnymi finansami.</p>
    `,
    shortDescription: 'Kompletny przewodnik do zrozumienia zdecentralizowanych finansów i ich wpływu na branżę finansową.',
    author: 'Zespół WandaExchange',
    publicationDate: new Date('2025-01-20'),
    locale: 'pl',
    tags: ['defi', 'blockchain', 'kryptowaluty']
  },
  {
    title: 'NFT Market Trends: What\'s Next?',
    slug: 'nft-market-trends-whats-next',
    content: `
      <h2>Current State of NFTs</h2>
      <p>The NFT market has experienced significant growth and evolution over the past few years.</p>
      
      <h2>Emerging Trends</h2>
      <ul>
        <li>Utility-focused NFTs gain popularity</li>
        <li>Gaming and metaverse integration</li>
        <li>Environmental sustainability concerns</li>
        <li>Regulatory developments</li>
      </ul>
      
      <h2>Future Outlook</h2>
      <p>NFTs are evolving beyond digital art to become integral parts of various industries and ecosystems.</p>
    `,
    shortDescription: 'Explore the latest trends in the NFT market and what to expect in the coming months.',
    author: 'WandaExchange Team',
    publicationDate: new Date('2025-01-25'),
    locale: 'en',
    tags: ['nfts', 'blockchain', 'cryptocurrency']
  },
  {
    title: 'Trendy rynku NFT: Co dalej?',
    slug: 'trendy-rynku-nft-co-dalej',
    content: `
      <h2>Obecny stan NFT</h2>
      <p>Rynek NFT doświadczył znaczącego wzrostu i ewolucji w ciągu ostatnich kilku lat.</p>
      
      <h2>Pojawiające się trendy</h2>
      <ul>
        <li>NFT skupione na użyteczności zyskują popularność</li>
        <li>Integracja z grami i metawersem</li>
        <li>Obawy o zrównoważenie środowiskowe</li>
        <li>Rozwój regulacyjny</li>
      </ul>
      
      <h2>Perspektywy na przyszłość</h2>
      <p>NFT ewoluują poza cyfrową sztukę, stając się integralnymi częściami różnych branż i ekosystemów.</p>
    `,
    shortDescription: 'Poznaj najnowsze trendy na rynku NFT i czego oczekiwać w nadchodzących miesiącach.',
    author: 'Zespół WandaExchange',
    publicationDate: new Date('2025-01-25'),
    locale: 'pl',
    tags: ['nft', 'blockchain', 'kryptowaluty']
  }
];

// Helper function to create tags
async function createTags() {
  console.log('Creating tags...');
  const createdTags = {};
  
  for (const tagData of sampleTags) {
    try {
      const response = await axios.post(`${BASE_URL}/api/tags`, tagData, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      const tag = response.data.data;
      const key = `${tagData.slug}_${tagData.locale}`;
      createdTags[key] = tag.id;
      
      console.log(`✅ Created tag: ${tagData.name} (${tagData.locale})`);
    } catch (error) {
      console.error(`❌ Error creating tag ${tagData.name}:`, error.response?.data || error.message);
    }
  }
  
  return createdTags;
}

// Helper function to create articles
async function createArticles(createdTags) {
  console.log('Creating articles...');
  
  for (const articleData of sampleArticles) {
    try {
      // Map tag slugs to tag IDs
      const tagIds = articleData.tags.map(tagSlug => {
        const key = `${tagSlug}_${articleData.locale}`;
        return createdTags[key];
      }).filter(Boolean);
      
      const articlePayload = {
        ...articleData,
        tags: tagIds,
        seo: {
          seoTitle: articleData.title,
          seoDescription: articleData.shortDescription,
          seoKeywords: articleData.tags
        }
      };
      
      const response = await axios.post(`${BASE_URL}/api/articles`, articlePayload, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`✅ Created article: ${articleData.title} (${articleData.locale})`);
    } catch (error) {
      console.error(`❌ Error creating article ${articleData.title}:`, error.response?.data || error.message);
    }
  }
}

// Main seeding function
async function seedData() {
  try {
    console.log('🚀 Starting data seeding...');
    
    // Check if Strapi is running
    try {
      await axios.get(`${BASE_URL}/api/articles`);
      console.log('✅ Strapi is running and accessible');
    } catch (error) {
      console.error('❌ Strapi is not accessible. Make sure it\'s running on', BASE_URL);
      return;
    }
    
    // Create tags first
    const createdTags = await createTags();
    
    // Create articles with tag references
    await createArticles(createdTags);
    
    console.log('🎉 Data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Created ${Object.keys(createdTags).length} tags`);
    console.log(`- Created ${sampleArticles.length} articles`);
    console.log('\n🔗 You can now visit:');
    console.log(`- Admin panel: ${BASE_URL}/admin`);
    console.log(`- API: ${BASE_URL}/api/articles`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, sampleTags, sampleArticles };
