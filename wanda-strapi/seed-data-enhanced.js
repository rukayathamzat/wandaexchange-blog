/**
 * Enhanced Sample Data Seeding Script for WandaExchange Blog
 * 
 * This script creates comprehensive sample articles and tags for testing the blog functionality.
 * Features:
 * - Better error handling and validation
 * - More comprehensive sample data
 * - Progress tracking
 * - Data validation before seeding
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:1337';
const ADMIN_TOKEN = 'your_admin_token_here'; // Get this from Strapi admin panel

// Enhanced sample data with more comprehensive content
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
    description: 'Distributed ledger technology and its applications',
    locale: 'en'
  },
  {
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Technologia rozproszonego rejestru i jej zastosowania',
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
    description: 'Decentralized Finance protocols and applications',
    locale: 'en'
  },
  {
    name: 'DeFi',
    slug: 'defi',
    description: 'Protokoły zdecentralizowanych finansów i ich zastosowania',
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
  },
  {
    name: 'Bitcoin',
    slug: 'bitcoin',
    description: 'The original cryptocurrency and digital gold',
    locale: 'en'
  },
  {
    name: 'Bitcoin',
    slug: 'bitcoin',
    description: 'Pierwsza kryptowaluta i cyfrowe złoto',
    locale: 'pl'
  },
  {
    name: 'Ethereum',
    slug: 'ethereum',
    description: 'Smart contract platform and DeFi ecosystem',
    locale: 'en'
  },
  {
    name: 'Ethereum',
    slug: 'ethereum',
    description: 'Platforma smart kontraktów i ekosystem DeFi',
    locale: 'pl'
  },
  {
    name: 'Market Analysis',
    slug: 'market-analysis',
    description: 'Cryptocurrency market analysis and insights',
    locale: 'en'
  },
  {
    name: 'Analiza Rynku',
    slug: 'analiza-rynku',
    description: 'Analiza rynku kryptowalut i spostrzeżenia',
    locale: 'pl'
  }
];

const sampleArticles = [
  {
    title: 'The Future of Cryptocurrency in 2025: Trends and Predictions',
    slug: 'future-of-cryptocurrency-2025-trends-predictions',
    content: `
      <h2>Introduction</h2>
      <p>The cryptocurrency landscape is evolving rapidly, with new technologies and regulations shaping the future of digital finance. As we approach 2025, several key trends are emerging that will define the next phase of crypto adoption.</p>
      
      <h2>Institutional Adoption Accelerates</h2>
      <p>Major financial institutions are increasingly recognizing the value of cryptocurrency as an asset class. We're seeing more traditional banks offering crypto services, and institutional investors are allocating significant portions of their portfolios to digital assets.</p>
      
      <h2>Regulatory Clarity Improves</h2>
      <p>Governments worldwide are developing clearer regulatory frameworks for cryptocurrency. This increased clarity is reducing uncertainty and encouraging more mainstream adoption.</p>
      
      <h2>DeFi Protocols Become More User-Friendly</h2>
      <p>Decentralized Finance protocols are evolving to provide better user experiences. Complex DeFi operations are being simplified through improved interfaces and automated processes.</p>
      
      <h2>Environmental Concerns Drive Innovation</h2>
      <p>The crypto industry is responding to environmental concerns by developing more energy-efficient consensus mechanisms and supporting green initiatives.</p>
      
      <h2>Conclusion</h2>
      <p>As we move into 2025, cryptocurrency is becoming an integral part of the global financial system. The combination of institutional adoption, regulatory clarity, and technological innovation is creating a more mature and sustainable crypto ecosystem.</p>
    `,
    shortDescription: 'Explore the emerging trends and developments in cryptocurrency for 2025 and beyond, including institutional adoption, regulatory changes, and technological innovations.',
    author: 'WandaExchange Team',
    publicationDate: new Date('2025-01-15'),
    locale: 'en',
    tags: ['cryptocurrency', 'blockchain', 'trading', 'market-analysis']
  },
  {
    title: 'Przyszłość kryptowalut w 2025 roku: trendy i prognozy',
    slug: 'przyszlosc-kryptowalut-2025-trendy-prognozy',
    content: `
      <h2>Wprowadzenie</h2>
      <p>Rynek kryptowalut rozwija się w szybkim tempie, a nowe technologie i regulacje kształtują przyszłość cyfrowych finansów. W miarę zbliżania się do 2025 roku pojawia się kilka kluczowych trendów, które zdefiniują kolejną fazę adopcji krypto.</p>
      
      <h2>Przyspieszenie adopcji instytucjonalnej</h2>
      <p>Główne instytucje finansowe coraz częściej rozpoznają wartość kryptowalut jako klasy aktywów. Widzimy, że coraz więcej tradycyjnych banków oferuje usługi krypto, a inwestorzy instytucjonalni alokują znaczące części swoich portfeli w aktywa cyfrowe.</p>
      
      <h2>Poprawa jasności regulacyjnej</h2>
      <p>Rządy na całym świecie opracowują jaśniejsze ramy regulacyjne dla kryptowalut. Ta zwiększona jasność zmniejsza niepewność i zachęca do większej adopcji mainstreamowej.</p>
      
      <h2>Protokoły DeFi stają się bardziej przyjazne dla użytkownika</h2>
      <p>Protokoły zdecentralizowanych finansów ewoluują, aby zapewnić lepsze doświadczenia użytkownika. Złożone operacje DeFi są upraszczane poprzez ulepszone interfejsy i zautomatyzowane procesy.</p>
      
      <h2>Obawy środowiskowe napędzają innowacje</h2>
      <p>Branża krypto odpowiada na obawy środowiskowe poprzez opracowywanie bardziej energooszczędnych mechanizmów konsensusu i wspieranie zielonych inicjatyw.</p>
      
      <h2>Podsumowanie</h2>
      <p>W miarę jak wchodzimy w 2025 rok, kryptowaluty stają się integralną częścią globalnego systemu finansowego. Połączenie adopcji instytucjonalnej, jasności regulacyjnej i innowacji technologicznych tworzy bardziej dojrzały i zrównoważony ekosystem krypto.</p>
    `,
    shortDescription: 'Poznaj pojawiające się trendy i rozwój kryptowalut na 2025 rok i dalej, w tym adopcję instytucjonalną, zmiany regulacyjne i innowacje technologiczne.',
    author: 'Zespół WandaExchange',
    publicationDate: new Date('2025-01-15'),
    locale: 'pl',
    tags: ['kryptowaluty', 'blockchain', 'handel', 'analiza-rynku']
  },
  {
    title: 'Understanding DeFi: A Complete Guide to Decentralized Finance',
    slug: 'understanding-defi-complete-guide-decentralized-finance',
    content: `
      <h2>What is DeFi?</h2>
      <p>Decentralized Finance (DeFi) represents a paradigm shift in how we think about financial services. By leveraging blockchain technology, DeFi eliminates the need for traditional intermediaries like banks and financial institutions.</p>
      
      <h2>Core Components of DeFi</h2>
      <h3>Lending and Borrowing Protocols</h3>
      <p>Platforms like Aave and Compound allow users to lend their crypto assets and earn interest, or borrow against their holdings without traditional credit checks.</p>
      
      <h3>Decentralized Exchanges (DEXs)</h3>
      <p>DEXs like Uniswap and SushiSwap enable peer-to-peer trading without centralized exchanges, providing greater privacy and control over assets.</p>
      
      <h3>Yield Farming and Liquidity Mining</h3>
      <p>Users can earn additional tokens by providing liquidity to DeFi protocols, creating new opportunities for passive income.</p>
      
      <h3>Stablecoins and Synthetic Assets</h3>
      <p>Stablecoins provide price stability in the volatile crypto market, while synthetic assets allow exposure to traditional financial instruments.</p>
      
      <h2>Benefits of DeFi</h2>
      <ul>
        <li><strong>Accessibility:</strong> Anyone with an internet connection can access DeFi services</li>
        <li><strong>Transparency:</strong> All transactions are recorded on public blockchains</li>
        <li><strong>Control:</strong> Users maintain full control over their assets</li>
        <li><strong>Innovation:</strong> Rapid development of new financial products</li>
      </ul>
      
      <h2>Risks and Considerations</h2>
      <p>While DeFi offers many benefits, it also comes with risks including smart contract vulnerabilities, impermanent loss, and regulatory uncertainty.</p>
      
      <h2>Conclusion</h2>
      <p>DeFi offers greater accessibility, transparency, and control over financial assets compared to traditional finance. As the ecosystem matures, we can expect to see more sophisticated financial products and broader adoption.</p>
    `,
    shortDescription: 'A comprehensive guide to understanding decentralized finance, its core components, benefits, and how it's revolutionizing the financial industry.',
    author: 'WandaExchange Team',
    publicationDate: new Date('2025-01-20'),
    locale: 'en',
    tags: ['defi', 'blockchain', 'cryptocurrency', 'ethereum']
  },
  {
    title: 'Zrozumienie DeFi: Kompletny przewodnik po zdecentralizowanych finansach',
    slug: 'zrozumienie-defi-kompletny-przewodnik-zdecentralizowane-finanse',
    content: `
      <h2>Co to jest DeFi?</h2>
      <p>Zdecentralizowane Finanse (DeFi) reprezentują zmianę paradygmatu w sposobie myślenia o usługach finansowych. Wykorzystując technologię blockchain, DeFi eliminuje potrzebę tradycyjnych pośredników, takich jak banki i instytucje finansowe.</p>
      
      <h2>Główne komponenty DeFi</h2>
      <h3>Protokoły pożyczania i pożyczania</h3>
      <p>Platformy takie jak Aave i Compound pozwalają użytkownikom pożyczać swoje aktywa krypto i zarabiać odsetki, lub pożyczać przeciwko swoim holdingom bez tradycyjnych sprawdzeń kredytowych.</p>
      
      <h3>Zdecentralizowane giełdy (DEX)</h3>
      <p>DEX-y takie jak Uniswap i SushiSwap umożliwiają handel peer-to-peer bez scentralizowanych giełd, zapewniając większą prywatność i kontrolę nad aktywami.</p>
      
      <h3>Uprawa plonów i wydobywanie płynności</h3>
      <p>Użytkownicy mogą zarabiać dodatkowe tokeny, dostarczając płynność do protokołów DeFi, tworząc nowe możliwości pasywnego dochodu.</p>
      
      <h3>Stablecoiny i aktywa syntetyczne</h3>
      <p>Stablecoiny zapewniają stabilność cenową na zmiennym rynku krypto, podczas gdy aktywa syntetyczne pozwalają na ekspozycję na tradycyjne instrumenty finansowe.</p>
      
      <h2>Korzyści DeFi</h2>
      <ul>
        <li><strong>Dostępność:</strong> Każdy z połączeniem internetowym może uzyskać dostęp do usług DeFi</li>
        <li><strong>Przejrzystość:</strong> Wszystkie transakcje są rejestrowane na publicznych blockchainach</li>
        <li><strong>Kontrola:</strong> Użytkownicy zachowują pełną kontrolę nad swoimi aktywami</li>
        <li><strong>Innowacje:</strong> Szybki rozwój nowych produktów finansowych</li>
      </ul>
      
      <h2>Ryzyka i rozważania</h2>
      <p>Chociaż DeFi oferuje wiele korzyści, wiąże się również z ryzykami, w tym podatnościami smart kontraktów, niepermanentną stratą i niepewnością regulacyjną.</p>
      
      <h2>Podsumowanie</h2>
      <p>DeFi oferuje większą dostępność, przejrzystość i kontrolę nad aktywami finansowymi w porównaniu z tradycyjnymi finansami. W miarę dojrzewania ekosystemu możemy spodziewać się bardziej zaawansowanych produktów finansowych i szerszej adopcji.</p>
    `,
    shortDescription: 'Kompletny przewodnik do zrozumienia zdecentralizowanych finansów, ich głównych komponentów, korzyści i jak rewolucjonizują branżę finansową.',
    author: 'Zespół WandaExchange',
    publicationDate: new Date('2025-01-20'),
    locale: 'pl',
    tags: ['defi', 'blockchain', 'kryptowaluty', 'ethereum']
  },
  {
    title: 'Bitcoin vs Ethereum: Understanding the Key Differences',
    slug: 'bitcoin-vs-ethereum-key-differences',
    content: `
      <h2>Introduction</h2>
      <p>Bitcoin and Ethereum are the two most prominent cryptocurrencies, but they serve different purposes and have distinct characteristics. Understanding these differences is crucial for any crypto investor or enthusiast.</p>
      
      <h2>Bitcoin: Digital Gold</h2>
      <p>Bitcoin was created as a peer-to-peer electronic cash system and has evolved into a store of value, often referred to as "digital gold." Its primary focus is on security, decentralization, and scarcity.</p>
      
      <h3>Key Characteristics of Bitcoin:</h3>
      <ul>
        <li><strong>Limited Supply:</strong> Only 21 million bitcoins will ever exist</li>
        <li><strong>Proof of Work:</strong> Uses energy-intensive mining for security</li>
        <li><strong>Simple Scripting:</strong> Limited programmability</li>
        <li><strong>Store of Value:</strong> Primarily used for long-term investment</li>
      </ul>
      
      <h2>Ethereum: The World Computer</h2>
      <p>Ethereum was designed as a platform for decentralized applications (dApps) and smart contracts. It's more like a programmable blockchain that enables developers to build complex applications.</p>
      
      <h3>Key Characteristics of Ethereum:</h3>
      <ul>
        <li><strong>Smart Contracts:</strong> Programmable agreements that execute automatically</li>
        <li><strong>dApps:</strong> Decentralized applications built on the platform</li>
        <li><strong>DeFi Ecosystem:</strong> Most DeFi protocols are built on Ethereum</li>
        <li><strong>NFTs:</strong> Non-fungible tokens are primarily Ethereum-based</li>
      </ul>
      
      <h2>Technical Differences</h2>
      <h3>Consensus Mechanism</h3>
      <p>Bitcoin uses Proof of Work (PoW), while Ethereum has transitioned to Proof of Stake (PoS), making it more energy-efficient.</p>
      
      <h3>Transaction Speed and Cost</h3>
      <p>Ethereum generally has faster transaction times but higher fees, while Bitcoin has slower transactions but lower fees.</p>
      
      <h2>Use Cases</h2>
      <p>Bitcoin is primarily used for investment and as a hedge against inflation, while Ethereum is used for building applications, DeFi protocols, and NFTs.</p>
      
      <h2>Conclusion</h2>
      <p>Both Bitcoin and Ethereum have their unique strengths and use cases. Bitcoin excels as a store of value, while Ethereum provides the foundation for the decentralized web and DeFi ecosystem.</p>
    `,
    shortDescription: 'A comprehensive comparison of Bitcoin and Ethereum, exploring their differences in purpose, technology, and use cases in the cryptocurrency ecosystem.',
    author: 'WandaExchange Team',
    publicationDate: new Date('2025-01-25'),
    locale: 'en',
    tags: ['bitcoin', 'ethereum', 'cryptocurrency', 'blockchain', 'market-analysis']
  },
  {
    title: 'Bitcoin vs Ethereum: Zrozumienie kluczowych różnic',
    slug: 'bitcoin-vs-ethereum-kluczowe-roznice',
    content: `
      <h2>Wprowadzenie</h2>
      <p>Bitcoin i Ethereum to dwie najbardziej prominentne kryptowaluty, ale służą różnym celom i mają odrębne charakterystyki. Zrozumienie tych różnic jest kluczowe dla każdego inwestora krypto lub entuzjasty.</p>
      
      <h2>Bitcoin: Cyfrowe złoto</h2>
      <p>Bitcoin został stworzony jako peer-to-peer elektroniczny system gotówkowy i ewoluował w magazyn wartości, często określany jako "cyfrowe złoto". Jego główny nacisk kładzie się na bezpieczeństwo, decentralizację i rzadkość.</p>
      
      <h3>Kluczowe charakterystyki Bitcoina:</h3>
      <ul>
        <li><strong>Ograniczona podaż:</strong> Kiedykolwiek będzie istniało tylko 21 milionów bitcoinów</li>
        <li><strong>Proof of Work:</strong> Używa energochłonnego wydobywania dla bezpieczeństwa</li>
        <li><strong>Proste skrypty:</strong> Ograniczona programowalność</li>
        <li><strong>Magazyn wartości:</strong> Głównie używany do długoterminowych inwestycji</li>
      </ul>
      
      <h2>Ethereum: Światowy komputer</h2>
      <p>Ethereum został zaprojektowany jako platforma dla zdecentralizowanych aplikacji (dApps) i smart kontraktów. To bardziej jak programowalny blockchain, który umożliwia programistom budowanie złożonych aplikacji.</p>
      
      <h3>Kluczowe charakterystyki Ethereum:</h3>
      <ul>
        <li><strong>Smart kontrakty:</strong> Programowalne umowy, które wykonują się automatycznie</li>
        <li><strong>dApps:</strong> Zdecentralizowane aplikacje zbudowane na platformie</li>
        <li><strong>Ekosystem DeFi:</strong> Większość protokołów DeFi jest zbudowana na Ethereum</li>
        <li><strong>NFT:</strong> Tokeny niepodzielne są głównie oparte na Ethereum</li>
      </ul>
      
      <h2>Różnice techniczne</h2>
      <h3>Mechanizm konsensusu</h3>
      <p>Bitcoin używa Proof of Work (PoW), podczas gdy Ethereum przeszedł na Proof of Stake (PoS), czyniąc go bardziej energooszczędnym.</p>
      
      <h3>Szybkość i koszt transakcji</h3>
      <p>Ethereum generalnie ma szybsze czasy transakcji, ale wyższe opłaty, podczas gdy Bitcoin ma wolniejsze transakcje, ale niższe opłaty.</p>
      
      <h2>Przypadki użycia</h2>
      <p>Bitcoin jest głównie używany do inwestycji i jako zabezpieczenie przed inflacją, podczas gdy Ethereum jest używany do budowania aplikacji, protokołów DeFi i NFT.</p>
      
      <h2>Podsumowanie</h2>
      <p>Zarówno Bitcoin, jak i Ethereum mają swoje unikalne mocne strony i przypadki użycia. Bitcoin wyróżnia się jako magazyn wartości, podczas gdy Ethereum zapewnia fundament dla zdecentralizowanego internetu i ekosystemu DeFi.</p>
    `,
    shortDescription: 'Kompleksowe porównanie Bitcoina i Ethereum, badanie ich różnic w celu, technologii i przypadkach użycia w ekosystemie kryptowalut.',
    author: 'Zespół WandaExchange',
    publicationDate: new Date('2025-01-25'),
    locale: 'pl',
    tags: ['bitcoin', 'ethereum', 'kryptowaluty', 'blockchain', 'analiza-rynku']
  }
];

// Helper function to validate data before seeding
function validateData() {
  console.log('🔍 Validating sample data...');
  
  // Validate tags
  const tagSlugs = new Set();
  for (const tag of sampleTags) {
    if (tagSlugs.has(tag.slug)) {
      throw new Error(`Duplicate tag slug found: ${tag.slug}`);
    }
    tagSlugs.add(tag.slug);
  }
  
  // Validate articles
  const articleSlugs = new Set();
  for (const article of sampleArticles) {
    if (articleSlugs.has(article.slug)) {
      throw new Error(`Duplicate article slug found: ${article.slug}`);
    }
    articleSlugs.add(article.slug);
    
    // Validate tag references
    for (const tagSlug of article.tags) {
      const tagExists = sampleTags.some(tag => tag.slug === tagSlug && tag.locale === article.locale);
      if (!tagExists) {
        throw new Error(`Tag not found for article ${article.slug}: ${tagSlug}`);
      }
    }
  }
  
  console.log('✅ Data validation passed');
}

// Helper function to check Strapi connectivity
async function checkStrapiConnection() {
  try {
    const response = await axios.get(`${BASE_URL}/api/articles`, {
      timeout: 5000
    });
    console.log('✅ Strapi is running and accessible');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Strapi is not running. Please start it with: npm run develop');
    } else {
      console.error('❌ Strapi connection error:', error.message);
    }
    return false;
  }
}

// Helper function to create tags with better error handling
async function createTags() {
  console.log('🏷️ Creating tags...');
  const createdTags = {};
  let successCount = 0;
  let errorCount = 0;
  
  for (const tagData of sampleTags) {
    try {
      const response = await axios.post(`${BASE_URL}/api/tags`, tagData, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      const tag = response.data.data;
      const key = `${tagData.slug}_${tagData.locale}`;
      createdTags[key] = tag.id;
      
      console.log(`✅ Created tag: ${tagData.name} (${tagData.locale})`);
      successCount++;
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(`⚠️ Tag already exists: ${tagData.name} (${tagData.locale})`);
        // Try to get existing tag
        try {
          const existingResponse = await axios.get(`${BASE_URL}/api/tags?filters[slug][$eq]=${tagData.slug}&filters[locale][$eq]=${tagData.locale}`, {
            headers: {
              'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
          });
          if (existingResponse.data.data.length > 0) {
            const key = `${tagData.slug}_${tagData.locale}`;
            createdTags[key] = existingResponse.data.data[0].id;
          }
        } catch (getError) {
          console.error(`❌ Error retrieving existing tag ${tagData.name}:`, getError.message);
        }
      } else {
        console.error(`❌ Error creating tag ${tagData.name}:`, error.response?.data || error.message);
        errorCount++;
      }
    }
  }
  
  console.log(`📊 Tags created: ${successCount}, Errors: ${errorCount}`);
  return createdTags;
}

// Helper function to create articles with better error handling
async function createArticles(createdTags) {
  console.log('📝 Creating articles...');
  let successCount = 0;
  let errorCount = 0;
  
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
          seoKeywords: articleData.tags.join(', ')
        }
      };
      
      const response = await axios.post(`${BASE_URL}/api/articles`, articlePayload, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });
      
      console.log(`✅ Created article: ${articleData.title} (${articleData.locale})`);
      successCount++;
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(`⚠️ Article already exists: ${articleData.title} (${articleData.locale})`);
      } else {
        console.error(`❌ Error creating article ${articleData.title}:`, error.response?.data || error.message);
        errorCount++;
      }
    }
  }
  
  console.log(`📊 Articles created: ${successCount}, Errors: ${errorCount}`);
}

// Main seeding function with enhanced error handling
async function seedData() {
  const startTime = Date.now();
  
  try {
    console.log('🚀 Starting enhanced data seeding...');
    console.log(`📍 Target URL: ${BASE_URL}`);
    console.log(`🔑 Admin Token: ${ADMIN_TOKEN === 'your_admin_token_here' ? 'NOT SET' : 'SET'}`);
    
    if (ADMIN_TOKEN === 'your_admin_token_here') {
      console.error('❌ Please set ADMIN_TOKEN in the script before running');
      console.log('💡 To get your admin token:');
      console.log('   1. Start Strapi: npm run develop');
      console.log('   2. Go to http://localhost:1337/admin');
      console.log('   3. Create an admin account');
      console.log('   4. Go to Settings > API Tokens');
      console.log('   5. Create a new token with full access');
      return;
    }
    
    // Validate data before seeding
    validateData();
    
    // Check Strapi connectivity
    const isConnected = await checkStrapiConnection();
    if (!isConnected) {
      return;
    }
    
    // Create tags first
    const createdTags = await createTags();
    
    // Create articles with tag references
    await createArticles(createdTags);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n🎉 Enhanced data seeding completed successfully!');
    console.log(`⏱️ Total time: ${duration} seconds`);
    console.log('\n📊 Summary:');
    console.log(`- Tags: ${sampleTags.length} (${Object.keys(createdTags).length} created/retrieved)`);
    console.log(`- Articles: ${sampleArticles.length}`);
    console.log('\n🔗 You can now visit:');
    console.log(`- Admin panel: ${BASE_URL}/admin`);
    console.log(`- API: ${BASE_URL}/api/articles`);
    console.log(`- Tags API: ${BASE_URL}/api/tags`);
    
  } catch (error) {
    console.error('❌ Enhanced seeding failed:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, sampleTags, sampleArticles, validateData };
