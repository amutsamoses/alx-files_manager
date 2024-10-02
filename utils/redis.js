import { createClient } from 'redis';
import { promisify } from 'util';

// redis client class
class RedisClient {
  /**
   * @constructor: create redis client
   * any error of redis client will be logged use( on('error')of the client)
   */

  constructor() {
    this.redisClient = createClient();
    this.redisClient.on('error', (err) => {
      console.log(err.message);
    });
  }

  /**
   * check the connection status of redis client
   * @returns {Promise<boolean>} true if connected, false otherwise
   */
  isAlive() {
    return this.redisClient.connected;
  }

  /**
   * async func to get values by key from redis
   * @param {string} key - key to get value from redis
   * @returns {*} - value associated with key in redis if exists or null
   */
  async get(key) {
    const asyncGet = promisify(this.redisClient.get).bind(this.redisClient);
    const value = await asyncGet(key);
    return value;
  }

  /**
   * async func to set key value pair in redis
   * @param {string} key - key to set value in redis
   * @param {*} value - value to set in redis
   * @param {number} duration - duration in seconds for the key to expire
   * @returns {void}
   */
  async set(key, value, duration) {
    const asyncSet = promisify(this.redisClient.set).bind(this.redisClient);
    await asyncSet(key, value, 'EX', duration);
  }

  /**
   * async func to delete key from redis
   * @param {string} key - key to delete from redis
   * @returns {void}
   */

  async del(key) {
    const asyncDel = promisify(this.redisClient.del).bind(this.redisClient);
    await asyncDel(key);
  }

  /**
   * close the connection to redis
   */
  async quit() {
    this.redisClient.quit();
  }
}

// export instance of  the RedisClient class
const redisClient = new RedisClient();
export default redisClient;
