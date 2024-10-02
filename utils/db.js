import { MongoClient } from 'mongodb';

class DBClient {
  /**
   * Initializes a new instance of DBClient
   */
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || 27017; // Fix typo from BD_PORT to DB_PORT
    const DATABASE = process.env.DB_DATABASE || 'files_manager';
    const URI = `mongodb://${HOST}:${PORT}`;

    this.mongoClient = new MongoClient(URI, { useUnifiedTopology: true });
    this.connected = false; // Track connection status

    this.mongoClient.connect()
      .then(() => {
        this.db = this.mongoClient.db(DATABASE);
        this.connected = true; // Mark connection as successful
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  }

  /**
   * Check mongodb client's connection status
   * @returns {boolean} - true if connected, false otherwise
   */
  isAlive() {
    return this.connected; // Use the connection flag
  }

  /**
   * Retrieves specified collection from database
   * @param {string} collectionName - Name of the collection
   * @returns {import("mongodb").Collection} - MongoDB collection object
   */
  getCollection(collectionName) {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
    return this.db.collection(collectionName);
  }

  /**
   * Retrieves the number of users from the 'users' collection
   * @returns {Promise<number>} - Number of users
   */
  async nbUsers() {
    const usersCollection = this.getCollection('users');
    return await usersCollection.countDocuments();
  }

  /**
   * Queries 'files' collection
   * @returns {Promise<number>} - Number of documents in files collection
   */
  async nbFiles() {
    const filesCollection = this.getCollection('files');
    return await filesCollection.countDocuments();
  }

  /**
   * Closes connection to mongodb client
   */
  async close() {
    await this.mongoClient.close();
  }
}

const dbClient = new DBClient();
export default dbClient;
