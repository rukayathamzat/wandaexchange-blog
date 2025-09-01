const axios = require('axios');

const BASE_URL = 'http://localhost:1337';
const API_URL = `${BASE_URL}/api`;

// Test data
const sampleTags = [
  { name: 'Technology', description: 'Technology related articles' },
  { name: 'Business', description: 'Business and entrepreneurship' },
  { name: 'Programming', description: 'Software development and coding' }
];

const sampleArticles = [
  {
    title: 'Getting Started with Strapi',
    content: 'Strapi is a headless CMS that provides a flexible and scalable solution for building modern applications...',
    shortDescription: 'Learn how to get started with Strapi CMS',
    author: 'John Doe',
    publicationDate: new Date().toISOString()
  },
  {
    title: 'Building APIs with Strapi',
    content: 'Strapi makes it easy to build powerful APIs with minimal configuration...',
    shortDescription: 'Create robust APIs using Strapi',
    author: 'Jane Smith',
    publicationDate: new Date().toISOString()
  }
];

async function testRelationships() {
  try {
    console.log('🧪 Testing Article ↔ Tag Relationships...\n');

    // Step 1: Create sample tags
    console.log('📝 Step 1: Creating sample tags...');
    const createdTags = [];
    
    for (const tag of sampleTags) {
      try {
        const response = await axios.post(`${API_URL}/tags`, { data: tag });
        createdTags.push(response.data.data);
        console.log(`✅ Created tag: ${tag.name} (ID: ${response.data.data.id})`);
      } catch (error) {
        console.log(`❌ Failed to create tag ${tag.name}:`, error.response?.data?.error?.message || error.message);
      }
    }

    // Step 2: Create sample articles
    console.log('\n📝 Step 2: Creating sample articles...');
    const createdArticles = [];
    
    for (const article of sampleArticles) {
      try {
        const response = await axios.post(`${API_URL}/articles`, { data: article });
        createdArticles.push(response.data.data);
        console.log(`✅ Created article: ${article.title} (ID: ${response.data.data.id})`);
      } catch (error) {
        console.log(`❌ Failed to create article ${article.title}:`, error.response?.data?.error?.message || error.message);
      }
    }

    // Step 3: Assign tags to articles (test the relationship)
    console.log('\n🔗 Step 3: Testing tag-article relationships...');
    
    if (createdTags.length > 0 && createdArticles.length > 0) {
      // Assign first tag to first article
      try {
        const updateResponse = await axios.put(`${API_URL}/articles/${createdArticles[0].id}`, {
          data: {
            tags: [createdTags[0].id]
          }
        });
        console.log(`✅ Assigned tag "${createdTags[0].name}" to article "${createdArticles[0].title}"`);
      } catch (error) {
        console.log(`❌ Failed to assign tag to article:`, error.response?.data?.error?.message || error.message);
      }

      // Assign multiple tags to second article
      try {
        const updateResponse = await axios.put(`${API_URL}/articles/${createdArticles[1].id}`, {
          data: {
            tags: [createdTags[0].id, createdTags[1].id]
          }
        });
        console.log(`✅ Assigned tags "${createdTags[0].name}" and "${createdTags[1].name}" to article "${createdArticles[1].title}"`);
      } catch (error) {
        console.log(`❌ Failed to assign multiple tags to article:`, error.response?.data?.error?.message || error.message);
      }
    }

    // Step 4: Test retrieving articles with tags
    console.log('\n🔍 Step 4: Testing retrieval of articles with tags...');
    
    for (const article of createdArticles) {
      try {
        const response = await axios.get(`${API_URL}/articles/${article.id}?populate=tags`);
        const articleData = response.data.data;
        const tagNames = articleData.tags?.map(tag => tag.name) || [];
        console.log(`📄 Article: "${articleData.title}" - Tags: [${tagNames.join(', ')}]`);
      } catch (error) {
        console.log(`❌ Failed to retrieve article ${article.title}:`, error.response?.data?.error?.message || error.message);
      }
    }

    // Step 5: Test retrieving tags with articles
    console.log('\n🔍 Step 5: Testing retrieval of tags with articles...');
    
    for (const tag of createdTags) {
      try {
        const response = await axios.get(`${API_URL}/tags/${tag.id}?populate=articles`);
        const tagData = response.data.data;
        const articleTitles = tagData.articles?.map(article => article.title) || [];
        console.log(`🏷️  Tag: "${tagData.name}" - Articles: [${articleTitles.join(', ')}]`);
      } catch (error) {
        console.log(`❌ Failed to retrieve tag ${tag.name}:`, error.response?.data?.error?.message || error.message);
      }
    }

    console.log('\n🎉 Relationship testing completed!');
    
    // Cleanup: Delete test data
    console.log('\n🧹 Cleaning up test data...');
    
    for (const article of createdArticles) {
      try {
        await axios.delete(`${API_URL}/articles/${article.id}`);
        console.log(`🗑️  Deleted article: ${article.title}`);
      } catch (error) {
        console.log(`⚠️  Failed to delete article ${article.title}:`, error.message);
      }
    }
    
    for (const tag of createdTags) {
      try {
        await axios.delete(`${API_URL}/tags/${tag.id}`);
        console.log(`🗑️  Deleted tag: ${tag.name}`);
      } catch (error) {
        console.log(`⚠️  Failed to delete tag ${tag.name}:`, error.message);
      }
    }

    console.log('\n✨ Test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testRelationships();
