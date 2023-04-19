import { useEffect, useState } from 'react';
import { MongoClient, Collection, Db } from 'mongodb';

interface MongoDBHookResult {
  client: MongoClient | null;
  collection: Collection | null;
  error: Error | null;
}

const useMongoDB = (
  connectionString: string,
  dbName: string,
  collectionName: string
): MongoDBHookResult => {
    const [client, setClient] = useState<MongoClient | null>(null);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const connectToMongoDB = async () => {
        try {
        const mongoClient = new MongoClient(connectionString);
        await mongoClient.connect();
        const db: Db = mongoClient.db(dbName);
        const mongoCollection: Collection = db.collection(collectionName);
        setClient(mongoClient);
        setCollection(mongoCollection);
        } catch (err) {
        setError(err);
        }
        };
        connectToMongoDB();
  }, [connectionString, dbName, collectionName]);

  return {
    client,
    collection,
    error
  };
};

export default useMongoDB;
