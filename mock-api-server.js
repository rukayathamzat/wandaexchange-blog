const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 1337;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const tags = [
  {
    id: 1,
    attributes: {
      name: 'Cryptocurrency',
      slug: 'cryptocurrency',
      description: 'Articles about cryptocurrencies and digital assets',
      locale: 'en'
    }
  },
  {
    id: 2,
    attributes: {
      name: 'Blockchain',
      slug: 'blockchain',
      description: 'Blockchain technology and applications',
      locale: 'en'
    }
  },
  {
    id: 3,
    attributes: {
      name: 'Trading',
      slug: 'trading',
      description: 'Trading strategies and market analysis',
      locale: 'en'
    }
  },
  {
    id: 4,
    attributes: {
      name: 'Kryptowaluty',
      slug: 'kryptowaluty',
      description: 'Artykuły o kryptowalutach i aktywach cyfrowych',
      locale: 'pl'
    }
  },
  {
    id: 5,
    attributes: {
      name: 'Blockchain',
      slug: 'blockchain-pl',
      description: 'Technologia blockchain i jej zastosowania',
      locale: 'pl'
    }
  },
  {
    id: 6,
    attributes: {
      name: 'Trading',
      slug: 'trading-pl',
      description: 'Strategie tradingowe i analiza rynku',
      locale: 'pl'
    }
  }
];

const articles = [
  {
    id: 1,
    attributes: {
      title: 'The Future of Cryptocurrency Trading',
      slug: 'future-of-cryptocurrency-trading',
      content: '<p>Cryptocurrency trading has evolved significantly over the past decade. From the early days of Bitcoin to the current landscape of thousands of digital assets, the market has seen tremendous growth and innovation.</p><h2>Key Trends</h2><p>Several key trends are shaping the future of crypto trading:</p><ul><li>Decentralized exchanges (DEXs) gaining popularity</li><li>Institutional adoption increasing</li><li>Regulatory frameworks developing</li><li>Advanced trading tools and analytics</li></ul><p>The future looks promising for cryptocurrency trading as more traditional financial institutions enter the space.</p>',
      shortDescription: 'Explore the latest trends and innovations in cryptocurrency trading platforms and strategies.',
      seoTitle: 'Future of Cryptocurrency Trading - WandaExchange',
      seoDescription: 'Discover the latest trends in cryptocurrency trading and what the future holds for digital asset markets.',
      seoKeywords: 'cryptocurrency, trading, blockchain, digital assets, crypto market',
      author: 'WandaExchange Team',
      locale: 'en',
      publicationDate: '2025-08-12T10:00:00.000Z',
      createdAt: '2025-08-12T10:00:00.000Z',
      updatedAt: '2025-08-12T10:00:00.000Z',
      publishedAt: '2025-08-12T10:00:00.000Z'
    }
  },
  {
    id: 2,
    attributes: {
      title: 'Przyszłość Handlu Kryptowalutami',
      slug: 'przyszlosc-handlu-kryptowalutami',
      content: '<p>Handel kryptowalutami znacząco ewoluował w ciągu ostatniej dekady. Od wczesnych dni Bitcoina po obecny krajobraz tysięcy aktywów cyfrowych, rynek odnotował ogromny wzrost i innowacje.</p><h2>Kluczowe Trendy</h2><p>Kilka kluczowych trendów kształtuje przyszłość handlu krypto:</p><ul><li>Zdecentralizowane giełdy (DEX) zyskują popularność</li><li>Zwiększa się adopcja instytucjonalna</li><li>Rozwijają się ramy regulacyjne</li><li>Zaawansowane narzędzia tradingowe i analityka</li></ul><p>Przyszłość wygląda obiecująco dla handlu kryptowalutami, gdy coraz więcej tradycyjnych instytucji finansowych wchodzi w tę przestrzeń.</p>',
      shortDescription: 'Poznaj najnowsze trendy i innowacje w platformach handlu kryptowalutami i strategiach.',
      seoTitle: 'Przyszłość Handlu Kryptowalutami - WandaExchange',
      seoDescription: 'Odkryj najnowsze trendy w handlu kryptowalutami i co przyniesie przyszłość dla rynków aktywów cyfrowych.',
      seoKeywords: 'kryptowaluty, trading, blockchain, aktywa cyfrowe, rynek krypto',
      author: 'Zespół WandaExchange',
      locale: 'pl',
      publicationDate: '2025-08-12T10:00:00.000Z',
      createdAt: '2025-08-12T10:00:00.000Z',
      updatedAt: '2025-08-12T10:00:00.000Z',
      publishedAt: '2025-08-12T10:00:00.000Z'
    }
  }
];

// Helper function to filter by locale
function filterByLocale(data, locale) {
  if (!locale) return data;
  return data.filter(item => item.attributes.locale === locale);
}

// API Routes

// Get all articles
app.get('/api/articles', (req, res) => {
  const { locale, 'pagination[pageSize]': pageSize = 25, 'pagination[page]': page = 1 } = req.query;
  
  let filteredArticles = filterByLocale(articles, locale);
  
  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedArticles,
    meta: {
      pagination: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        pageCount: Math.ceil(filteredArticles.length / pageSize),
        total: filteredArticles.length
      }
    }
  });
});

// Get article by slug
app.get('/api/articles/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const { locale } = req.query;
  
  const article = articles.find(article => 
    article.attributes.slug === slug && 
    (!locale || article.attributes.locale === locale)
  );
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json({ data: article });
});

// Get all tags
app.get('/api/tags', (req, res) => {
  const { locale } = req.query;
  const filteredTags = filterByLocale(tags, locale);
  
  res.json({
    data: filteredTags,
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: filteredTags.length
      }
    }
  });
});

// Get tag by slug
app.get('/api/tags/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const { locale } = req.query;
  
  const tag = tags.find(tag => 
    tag.attributes.slug === slug && 
    (!locale || tag.attributes.locale === locale)
  );
  
  if (!tag) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  
  res.json({ data: tag });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'WandaExchange Blog API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'WandaExchange Blog API',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      tags: '/api/tags',
      health: '/api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WandaExchange Blog API running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   - Articles: http://localhost:${PORT}/api/articles`);
  console.log(`   - Tags: http://localhost:${PORT}/api/tags`);
  console.log(`   - Health: http://localhost:${PORT}/api/health`);
  console.log(`\n🌐 Test with locale parameter:`);
  console.log(`   - English: http://localhost:${PORT}/api/articles?locale=en`);
  console.log(`   - Polish: http://localhost:${PORT}/api/articles?locale=pl`);
});
