const { MongoClient } = require("mongodb");

// Get MongoDB connection details from environment variables
const uri =
  "mongodb+srv://" +
  process.env.MONGO_LOGIN +
  ":" +
  process.env.MONGO_PWD +
  "@datacluster.k8djm8h.mongodb.net/?retryWrites=true&w=majority&appName=DataCluster";
const dbName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION_NAME;

// Create a MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

// Disconnect from MongoDB
async function disconnect() {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB", error);
  }
}

// CRUD ops

async function create(iphone) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(iphone);
    return result.insertedId;
  } catch (error) {
    console.error("Failed to create iPhone", error);
  }
}

async function read(id) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: id });
    return result;
  } catch (error) {
    console.error("Failed to read iPhone", error);
  }
}

async function update(id, updates) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: id }, { $set: updates });
    return result.modifiedCount;
  } catch (error) {
    console.error("Failed to update iPhone", error);
  }
}

async function remove(id) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount;
  } catch (error) {
    console.error("Failed to remove iPhone", error);
  }
}

// read all documents
async function readAll() {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.error("Failed to read all iPhones", error);
  }
}

module.exports = {
  connect,
  disconnect,
  create,
  read,
  update,
  remove,
  readAll,
};
