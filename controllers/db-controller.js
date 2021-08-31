import {MongoClient} from 'mongodb';
import {db} from '../config.js';

const url = db.url;
const databaseName = db.name;

const createDB = async () => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		console.log('Database created!');
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}

	return true;
};

const createCollection = async (collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		database.createCollection(collectionName);
		console.log('Collection ' + collectionName + ' created!');
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}

	return true;
};

const insertOne = async (doc, collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = await collection.insertOne(doc);
		console.log(
			`${result.insertedCount} document was inserted with the _id: ${result.insertedId}`,
		);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const insertMany = async (array, collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = await collection.insertMany(array);
		console.log(
			`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
		);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const updateOne = async (filter, doc, collectionName, options = {}) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = await collection.updateOne(filter, doc, options);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const updateMany = async (filter, doc, collectionName, options = {}) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = await collection.updateMany(filter, doc, options);
		console.log(`Updated ${result.modifiedCount} documents`);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const deleteOne = async (itemQuery, collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = await collection.deleteOne(itemQuery);
		if (result.deletedCount === 1) {
			console.log('Successfully deleted one document.');
		} else {
			console.log('No documents matched the query. Deleted 0 documents.');
		}
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const deleteMany = async (itemQuery, collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = await collection.deleteMany(itemQuery);
		console.log(`Deleted ${result.deletedCount} documents`);
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const findOne = async (itemQuery, collectionName, options = {}) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const response = await collection.findOne(itemQuery, options);
		return response;
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const find = async (itemQuery, collectionName, options = {}) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const cursor = collection.find(itemQuery, options);
		if ((await cursor.count()) === 0) {
			console.log('Documents not found!');
		}

		const response = await cursor.toArray();
		return response;
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const count = async (collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = collection.estimatedDocumentCount();
		console.log(`Estimated number of documents in the collection: ${result}`);
		return result;
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const countQuery = async (query, collectionName) => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		const database = client.db(databaseName);
		const collection = database.collection(collectionName);
		const result = collection.countDocuments(query);
		console.log(`Estimated number of documents with the filter: ${result}`);
		return result;
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

const empty = async () => {
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

export default {
	createDB,
	createCollection,
	insertOne,
	insertMany,
	deleteOne,
	deleteMany,
	updateOne,
	updateMany,
	findOne,
	find,
	count,
	countQuery,
	empty,
};
