const { MongoClient } = require('mongodb');
const fs = require('fs');

// Read the certificate authority
const ca = [fs.readFileSync(__dirname + '/ssl/ca.pem')];
module.exports = async () => {
  const dbName = 'burger-queen';
  const client = new MongoClient('mongodb://localhost:27017?ssl=true', {
    sslValidate: true,
    checkServerIdentity: false,
    sslCA: ca,
  });
  try {
    await client.connect();
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};
