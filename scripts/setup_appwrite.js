/**
 * Appwrite Database and Storage Setup Script for Gtrails
 * 
 * Usage:
 * 1. Generate an API key in Appwrite Console with the following permissions:
 *    - databases.write
 *    - collections.write
 *    - attributes.write
 *    - buckets.write
 * 2. Run the script:
 *    export APPWRITE_API_KEY="your_api_key_here"
 *    node scripts/setup_appwrite.js
 */

const PROJECT_ID = "6a1cf32a002c668912cc";
const ENDPOINT = "https://sgp.cloud.appwrite.io/v1";
const DATABASE_ID = "gtrails";
const COLLECTION_ID = "scraped_data";
const API_KEY = process.env.APPWRITE_API_KEY;

if (!API_KEY) {
  console.error("\x1b[31mError: APPWRITE_API_KEY environment variable is not set.\x1b[0m");
  console.log("Please set it before running the script:");
  console.log("  export APPWRITE_API_KEY=\"your_appwrite_api_key\"");
  console.log("  node scripts/setup_appwrite.js\n");
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  "X-Appwrite-Project": PROJECT_ID,
  "X-Appwrite-Key": API_KEY,
};

async function apiRequest(path, method = "GET", body = null) {
  const url = `${ENDPOINT}${path}`;
  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error ${response.status}`);
  }
  return data;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setup() {
  console.log("\x1b[36m=== Starting Appwrite Setup for Gtrails ===\x1b[0m\n");

  // 1. Create Database
  console.log("1. Creating Database...");
  try {
    await apiRequest("/databases", "POST", {
      databaseId: DATABASE_ID,
      name: "Gtrails Database"
    });
    console.log("\x1b[32m✔ Database created successfully.\x1b[0m");
  } catch (err) {
    if (err.message.includes("already exists")) {
      console.log("\x1b[33mℹ Database already exists. Skipping.\x1b[0m");
    } else {
      console.error("\x1b[31m✖ Failed to create database:\x1b[0m", err.message);
      process.exit(1);
    }
  }

  // 2. Create Collection
  console.log("\n2. Creating Collection 'scraped_data'...");
  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections`, "POST", {
      collectionId: COLLECTION_ID,
      name: "Scraped Data",
      permissions: ['read("any")'] // Publicly readable (Equivalent to Supabase RLS SELECT policy)
    });
    console.log("\x1b[32m✔ Collection created successfully.\x1b[0m");
  } catch (err) {
    if (err.message.includes("already exists")) {
      console.log("\x1b[33mℹ Collection already exists. Skipping.\x1b[0m");
    } else {
      console.error("\x1b[31m✖ Failed to create collection:\x1b[0m", err.message);
      process.exit(1);
    }
  }

  // 3. Create Attributes
  console.log("\n3. Creating Attributes inside 'scraped_data'...");
  const stringAttributes = [
    { key: "name", size: 255, required: false },
    { key: "rating", size: 50, required: false },
    { key: "review_count", size: 50, required: false },
    { key: "address", size: 1000, required: false },
    { key: "phone", size: 50, required: false },
    { key: "map_embed_url", size: 2048, required: false },
    { key: "reviews", size: 65535, required: false },
    { key: "media", size: 65535, required: false },
    { key: "source_data", size: 1048576, required: false } // 1MB text limit for raw scraped JSON
  ];

  for (const attr of stringAttributes) {
    try {
      await apiRequest(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/attributes/string`, "POST", {
        key: attr.key,
        size: attr.size,
        required: attr.required,
        array: false
      });
      console.log(`\x1b[32m✔ Attribute '${attr.key}' created.\x1b[0m`);
      await delay(1000); // Give Appwrite database a second to process index tasks
    } catch (err) {
      if (err.message.includes("already exists")) {
        console.log(`\x1b[33mℹ Attribute '${attr.key}' already exists. Skipping.\x1b[0m`);
      } else {
        console.warn(`\x1b[33m⚠ Warning: Failed to create attribute '${attr.key}':\x1b[0m`, err.message);
      }
    }
  }

  // Create array attribute for image_urls
  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/attributes/string`, "POST", {
      key: "image_urls",
      size: 2048,
      required: false,
      array: true
    });
    console.log("\x1b[32m✔ Attribute 'image_urls' (array) created.\x1b[0m");
    await delay(1000);
  } catch (err) {
    if (err.message.includes("already exists")) {
      console.log("\x1b[33mℹ Attribute 'image_urls' already exists. Skipping.\x1b[0m");
    } else {
      console.warn("\x1b[33m⚠ Warning: Failed to create 'image_urls':\x1b[0m", err.message);
    }
  }

  // 4. Create Storage Buckets
  console.log("\n4. Creating Storage Buckets...");
  const buckets = [
    { id: "scraped_images", name: "Scraped Images" },
    { id: "templates", name: "Templates" }
  ];

  for (const bucket of buckets) {
    try {
      await apiRequest("/storage/buckets", "POST", {
        bucketId: bucket.id,
        name: bucket.name,
        permissions: ['read("any")'], // Publicly readable (Equivalent to Supabase storage select policy)
        fileSecurity: false
      });
      console.log(`\x1b[32m✔ Bucket '${bucket.id}' created successfully.\x1b[0m`);
    } catch (err) {
      if (err.message.includes("already exists")) {
        console.log(`\x1b[33mℹ Bucket '${bucket.id}' already exists. Skipping.\x1b[0m`);
      } else {
        console.error(`\x1b[31m✖ Failed to create bucket '${bucket.id}':\x1b[0m`, err.message);
      }
    }
  }

  console.log("\n\x1b[32m=== Appwrite Setup Completed Successfully! ===\x1b[0m");
  console.log("You can now build/run the application with Appwrite support.");
}

setup().catch(err => {
  console.error("\x1b[31m✖ Setup failed with error:\x1b[0m", err.message);
});
