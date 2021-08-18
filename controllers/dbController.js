const mongo = require('mongodb');
const config = require('../config.js');

const url = config.db.url;

const createDB = async () => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('Database created!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
  return true;
};

 const createCollection = async collec => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    database.createCollection(collec);
    console.log('Collection ' + collec + ' created!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
  return true;
};

 const insertOne = async (doc, collec) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const result = await collection.insertOne(doc);
    console.log(
      `${result.insertedCount} document was inserted with the _id: ${result.insertedId}`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

 const insertMany = async (arr, collec) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const result = await collection.insertMany(arr);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

 const findOne = async (itemQuery, collec, options = {}) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const response = await collection.findOne(itemQuery, options);
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

 const find = async (itemQuery, collec, options = {}) => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('woodpecker-db');
    const collection = database.collection(collec);
    const cursor = collection.find(itemQuery, options);
    if ((await cursor.count()) === 0) {
      console.log('Documents not found!');
    }
    const response = await cursor.toArray();
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

 const empty = async () => {
  const client = new mongo.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

module.exports = {createDB, createCollection, insertOne, insertMany, findOne, find, empty};
