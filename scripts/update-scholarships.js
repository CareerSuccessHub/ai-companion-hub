/**
 * Scholarship Auto-Updater
 * 
 * IMPORTANT: This script PRESERVES manually curated scholarships!
 * - Scholarships WITH 'country' field = PRESERVED (international/Filipino scholarships)
 * - Scholarships WITHOUT 'country' field = REGENERATED (US scholarships only)
 * 
 * Run: node scripts/update-scholarships.js
 * Frequency: Monthly (not bi-monthly, runs once per month)
 */

const fs = require('fs');
const path = require('path');

// Gemini model for scholarship updates
// Use ONLY best model - quality critical for scholarship content
// Runs once per month so won't hit 500/day quota
const GEMINI_MODELS = [
  'gemini-2.5-flash'  // Best quality model - mandatory for scholarship accuracy
];

// Scholarship APIs/Sources (free, public)
const SCHOLARSHIP_SOURCES = [
  // ScholarshipOwl API (if available) or scrape these sites:
  'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/',
  'https://www.fastweb.com/college-scholarships',
];

// Target categories
const CATEGORIES = [
  'merit-based',
  'need-based',
  'stem',
  'business',
  'arts',
  'athletics',
  'minority',
  'international',
];

/**
 * Generate scholarship data with AI using specific model
 */
async function generateScholarshipData(model, retries = 2) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found');
    return null;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s
      console.log(`   ⏳ Retry attempt ${attempt} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

  const prompt = `Generate 20 real, legitimate college scholarships for US students for the 2025-2026 academic cycle. Mix of different types (merit, need-based, STEM, minority, etc.).

IMPORTANT: Use deadlines between January 2026 and December 2026, spread throughout the year. Examples: "March 15, 2026", "June 30, 2026", "October 1, 2026". Do NOT use 2025 dates.

For each scholarship provide:
- name: Official scholarship name
- provider: Organization/company offering it
- amount: Dollar amount or range
- deadline: Application deadline (MUST be 2026 dates, spread across all months)
- category: One of: merit-based, need-based, stem, business, arts, athletics, minority, international
- eligibility: Brief requirements (GPA, major, demographics, etc.)
- description: 2-3 sentences about the scholarship
- link: Use OFFICIAL organization website ONLY. Never use scholarships.com or scholarship aggregators. Examples: https://www.nationalmerit.org/, https://www.thegatesscholarship.org/, https://www.coca-colascholarsfoundation.org/

Return as JSON array:
[
  {
    "name": "Gates Scholarship",
    "provider": "Bill & Melinda Gates Foundation",
    "amount": "$10,000 - Full Tuition",
    "deadline": "September 15, 2025",
    "category": "need-based",
    "eligibility": "High school seniors, Pell Grant eligible, minimum 3.3 GPA",
    "description": "Comprehensive scholarship for high-achieving minority students...",
    "link": "https://www.scholarships.com/gates-scholarship"
  },
  ...
]`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192,
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error?.message || 'Unknown error';
        
        if (response.status === 503 || response.status === 429) {
          console.error(`   ⚠️  ${model} overloaded (${response.status}): ${errorMsg}`);
          if (attempt === retries) {
            throw new Error(`${model} failed after ${retries + 1} attempts: ${errorMsg}`);
          }
          continue; // Retry
        }
        
        throw new Error(`API error ${response.status}: ${errorMsg}`);
      }

      const data = await response.json();
    
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.error('   ⚠️  No text in response');
        if (attempt === retries) return null;
        continue; // Retry
      }
      
      // Remove markdown code fences if present
      let cleanText = text.trim();
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```(?:json)?\s*\n?/i, '');
        cleanText = cleanText.replace(/\n?```\s*$/i, '');
      }
      
      // Extract JSON array
      const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error(`   ⚠️  JSON parse error (attempt ${attempt + 1}):`, e.message);
          if (attempt === retries) return null;
          continue; // Retry
        }
      }
      
      console.error('   ⚠️  No JSON array found in response');
      if (attempt === retries) return null;
      continue; // Retry
    } catch (error) {
      console.error(`   ❌ ${model} error (attempt ${attempt + 1}):`, error.message);
      if (attempt === retries) {
        throw error; // Final attempt failed
      }
    }
  }
  
  return null; // All retries exhausted
}

/**
 * Generate scholarships with model fallback
 */
async function generateScholarshipsWithFallback() {
  for (const model of GEMINI_MODELS) {
    try {
      console.log(`🤖 Attempting with ${model}...`);
      const result = await generateScholarshipData(model);
      if (result && result.length > 0) {
        console.log(`✅ Success with ${model} - Generated ${result.length} scholarships`);
        return result;
      }
    } catch (error) {
      console.error(`✗ ${model} failed:`, error.message);
      const isLastModel = GEMINI_MODELS.indexOf(model) === GEMINI_MODELS.length - 1;
      if (isLastModel) {
        throw new Error(`All models failed. Last error: ${error.message}`);
      }
      console.log(`⏭️  Trying next model...`);
    }
  }
  
  throw new Error('All models exhausted with no result');
}

/**
 * Update scholarships component file
 */
function updateScholarshipsFile(scholarships) {
  const componentPath = path.join(__dirname, '../components/ScholarshipDatabase.tsx');
  
  // Read existing file
  let content = fs.readFileSync(componentPath, 'utf-8');
  
  // Find the scholarships array and replace it
  const dataStart = content.indexOf('const scholarships = [');
  const dataEnd = content.indexOf('];', dataStart) + 2;
  
  if (dataStart === -1) {
    console.error('❌ Could not find scholarships array in file');
    return false;
  }
  
  const newDataString = `const scholarships = ${JSON.stringify(scholarships, null, 2)};`;
  
  content = content.substring(0, dataStart) + newDataString + content.substring(dataEnd);
  
  fs.writeFileSync(componentPath, content);
  console.log('✅ Updated ScholarshipDatabase component');
  return true;
}

/**
 * Create backup
 */
function backupCurrentData() {
  const componentPath = path.join(__dirname, '../components/ScholarshipDatabase.tsx');
  const backupPath = path.join(__dirname, '../components/ScholarshipDatabase.backup.tsx');
  
  fs.copyFileSync(componentPath, backupPath);
  console.log('📦 Created backup: ScholarshipDatabase.backup.tsx');
}

/**
 * Extract manually curated scholarships (those with country field or specific providers)
 */
function getManualScholarships() {
  const componentPath = path.join(__dirname, '../components/ScholarshipDatabase.tsx');
  const content = fs.readFileSync(componentPath, 'utf-8');
  
  // Extract current scholarships array
  const dataStart = content.indexOf('const scholarships = [');
  const dataEnd = content.indexOf('];', dataStart) + 2;
  
  if (dataStart === -1) return [];
  
  const arrayString = content.substring(dataStart + 'const scholarships = '.length, dataEnd - 1);
  
  try {
    const currentScholarships = eval(arrayString); // Parse the array
    
    // Filter for manually curated scholarships
    // These have 'country' field (international/Filipino scholarships)
    const manualScholarships = currentScholarships.filter(s => s.country);
    
    console.log(`📌 Found ${manualScholarships.length} manually curated scholarships to preserve:`);
    manualScholarships.forEach(s => {
      console.log(`   - ${s.name} (${s.country})`);
    });
    console.log('');
    
    return manualScholarships;
  } catch (error) {
    console.error('❌ Error parsing current scholarships:', error.message);
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎓 Updating scholarships...\n');
  
  // Backup current data
  backupCurrentData();
  
  // Get manually curated scholarships to preserve
  const manualScholarships = getManualScholarships();
  
  // Generate fresh scholarship data (US-based only)
  console.log('🤖 Generating US scholarship data with AI...\n');
  const generatedScholarships = await generateScholarshipsWithFallback();
  
  if (!generatedScholarships || generatedScholarships.length === 0) {
    console.error('❌ Failed to generate scholarships');
    return;
  }
  
  console.log(`✅ Generated ${generatedScholarships.length} US scholarships\n`);
  
  // Combine: Manual (international/Filipino) scholarships FIRST, then generated (US) scholarships
  const allScholarships = [...manualScholarships, ...generatedScholarships];
  
  console.log(`📊 Total scholarships: ${allScholarships.length} (${manualScholarships.length} manual + ${generatedScholarships.length} generated)\n`);
  
  // Show preview
  console.log('Preview (first 5):');
  allScholarships.slice(0, 5).forEach(s => {
    console.log(`  - ${s.name} (${s.amount}) ${s.country ? `[${s.country}]` : '[USA]'}`);
  });
  console.log('');
  
  // Update file
  if (updateScholarshipsFile(allScholarships)) {
    console.log('\n✨ Done! Scholarships updated successfully.');
    console.log(`   ✅ Preserved ${manualScholarships.length} manually curated scholarships`);
    console.log(`   ✅ Added ${generatedScholarships.length} fresh US scholarships`);
    console.log('   Run `npm run dev` to see changes locally.');
  }
}

main().catch(console.error);
