// setup-express-app.js
// This script sets up an Express.js app with dotenv, cors, mongoose, and provides a Docker command for MongoDB

const fs = require('fs');

// 1. Initialize npm project
defaultPackageJson = `{
  "name": "express-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}`;
if (!fs.existsSync('package.json')) {
  fs.writeFileSync('package.json', defaultPackageJson);
}

// 2. Install dependencies
console.log('Installing express, dotenv, cors, mongoose...');
const { execSync } = require('child_process');
execSync('npm install express dotenv cors mongoose', { stdio: 'inherit' });

// 3. Create .env file
if (!fs.existsSync('.env')) {
  fs.writeFileSync('.env', 'MONGO_URI=mongodb://localhost:27017/mydb\nPORT=3000\n');
}

// 4. Create index.js
const indexJs = require('dotenv').config();

;
if (!fs.existsSync('index.js')) {
  fs.writeFileSync('index.js', indexJs);
}

// 5. Print Docker command for MongoDB
console.log('\nTo start a MongoDB container, run:');
console.log('docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo');
