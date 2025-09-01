const Database = require('better-sqlite3');
const path = require('path');

// Path to the database file
const dbPath = path.join(__dirname, '.tmp', 'data.db');

try {
  console.log('🔍 Examining Strapi database...');
  console.log(`📁 Database path: ${dbPath}`);
  
  // Open the database
  const db = new Database(dbPath);
  
  // Get all table names
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  
  console.log('\n📋 Database tables:');
  tables.forEach(table => {
    console.log(`  - ${table.name}`);
  });
  
  // Show structure of main content tables
  console.log('\n🏗️  Table structures:');
  tables.forEach(table => {
    if (table.name.startsWith('core_') || table.name.startsWith('strapi_')) {
      return; // Skip system tables
    }
    
    try {
      const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();
      console.log(`\n📊 ${table.name}:`);
      columns.forEach(col => {
        console.log(`    ${col.name} (${col.type})${col.notnull ? ' NOT NULL' : ''}${col.pk ? ' PRIMARY KEY' : ''}`);
      });
      
      // Show sample data (first 3 rows)
      try {
        const sampleData = db.prepare(`SELECT * FROM ${table.name} LIMIT 3`).all();
        if (sampleData.length > 0) {
          console.log(`    Sample data (${sampleData.length} rows):`);
          sampleData.forEach((row, index) => {
            console.log(`      Row ${index + 1}:`, JSON.stringify(row, null, 2));
          });
        }
      } catch (e) {
        // Some tables might be empty or have issues
      }
    } catch (e) {
      console.log(`    Error reading table ${table.name}: ${e.message}`);
    }
  });
  
  // Close the database
  db.close();
  
  console.log('\n✅ Database examination complete!');
  
} catch (error) {
  console.error('❌ Error examining database:', error.message);
  console.error('Stack trace:', error.stack);
}
