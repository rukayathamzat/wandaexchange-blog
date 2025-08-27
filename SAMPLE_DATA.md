# Sample Data for WandaExchange Blog

## Sample Tags

### English Tags
```json
{
  "name": "Cryptocurrency",
  "slug": "cryptocurrency",
  "description": "Articles about cryptocurrencies and digital assets"
}
```

```json
{
  "name": "Blockchain",
  "slug": "blockchain",
  "description": "Blockchain technology and applications"
}
```

```json
{
  "name": "Trading",
  "slug": "trading",
  "description": "Trading strategies and market analysis"
}
```

### Polish Tags
```json
{
  "name": "Kryptowaluty",
  "slug": "kryptowaluty",
  "description": "Artykuły o kryptowalutach i aktywach cyfrowych"
}
```

```json
{
  "name": "Blockchain",
  "slug": "blockchain-pl",
  "description": "Technologia blockchain i jej zastosowania"
}
```

```json
{
  "name": "Trading",
  "slug": "trading-pl",
  "description": "Strategie tradingowe i analiza rynku"
}
```

## Sample Articles

### English Article
```json
{
  "title": "The Future of Cryptocurrency Trading",
  "slug": "future-of-cryptocurrency-trading",
  "content": "<p>Cryptocurrency trading has evolved significantly over the past decade...</p><h2>Key Trends</h2><p>Several key trends are shaping the future of crypto trading...</p>",
  "shortDescription": "Explore the latest trends and innovations in cryptocurrency trading platforms and strategies.",
  "seoTitle": "Future of Cryptocurrency Trading - WandaExchange",
  "seoDescription": "Discover the latest trends in cryptocurrency trading and what the future holds for digital asset markets.",
  "seoKeywords": "cryptocurrency, trading, blockchain, digital assets, crypto market",
  "author": "WandaExchange Team",
  "language": "en",
  "publicationDate": "2025-08-12T10:00:00.000Z",
  "tags": ["cryptocurrency", "trading"]
}
```

### Polish Article
```json
{
  "title": "Przyszłość Handlu Kryptowalutami",
  "slug": "przyszlosc-handlu-kryptowalutami",
  "content": "<p>Handel kryptowalutami znacząco ewoluował w ciągu ostatniej dekady...</p><h2>Kluczowe Trendy</h2><p>Kilka kluczowych trendów kształtuje przyszłość handlu krypto...</p>",
  "shortDescription": "Poznaj najnowsze trendy i innowacje w platformach handlu kryptowalutami i strategiach.",
  "seoTitle": "Przyszłość Handlu Kryptowalutami - WandaExchange",
  "seoDescription": "Odkryj najnowsze trendy w handlu kryptowalutami i co przyniesie przyszłość dla rynków aktywów cyfrowych.",
  "seoKeywords": "kryptowaluty, trading, blockchain, aktywa cyfrowe, rynek krypto",
  "author": "Zespół WandaExchange",
  "language": "pl",
  "publicationDate": "2025-08-12T10:00:00.000Z",
  "tags": ["kryptowaluty", "trading-pl"]
}
```

## API Test Examples

### Get All Articles (English)
```bash
curl "http://localhost:1337/api/articles?locale=en&pagination[pageSize]=5"
```

### Get All Articles (Polish)
```bash
curl "http://localhost:1337/api/articles?locale=pl&pagination[pageSize]=5"
```

### Get Article by Slug
```bash
curl "http://localhost:1337/api/articles/slug/future-of-cryptocurrency-trading?locale=en"
```

### Get Articles by Tag
```bash
curl "http://localhost:1337/api/articles?filters[tags][slug][$eq]=cryptocurrency&locale=en"
```

### Get All Tags
```bash
curl "http://localhost:1337/api/tags?locale=en&populate=articles"
```

## Vue.js Integration Examples

### Basic Article List
```javascript
// Fetch articles
const response = await fetch('http://localhost:1337/api/articles?locale=en&pagination[pageSize]=10');
const data = await response.json();
console.log(data.data); // Array of articles
```

### Article with Tags
```javascript
// Fetch article with related tags
const response = await fetch('http://localhost:1337/api/articles/slug/future-of-cryptocurrency-trading?locale=en&populate=tags');
const data = await response.json();
console.log(data.data.attributes.tags.data); // Array of tags
```

### Filtered Articles
```javascript
// Fetch articles by tag
const response = await fetch('http://localhost:1337/api/articles?filters[tags][slug][$eq]=cryptocurrency&locale=en');
const data = await response.json();
console.log(data.data); // Articles filtered by tag
```

## Content Management Workflow

1. **Create Tags First**
   - Go to Strapi Admin → Content Manager → Tag
   - Create tags in both English and Polish
   - Ensure slugs are unique per language

2. **Create Articles**
   - Go to Strapi Admin → Content Manager → Article
   - Create articles with proper titles and content
   - Set publication dates
   - Upload featured images
   - Assign tags
   - Publish articles

3. **Test API Endpoints**
   - Use the curl commands above to test
   - Verify multilingual content loads correctly
   - Check pagination and filtering work

4. **Frontend Integration**
   - Use the Vue.js examples to integrate with your frontend
   - Test both English and Polish content
   - Verify image loading and SEO meta tags
