// import Redis from 'ioredis';

// const REDIS_URL = 'redis://localhost:6379'; // Use 'localhost' or the service name if in Docker
// // redis://redis:6379
// function connectToRedis() {
//     const redis = new Redis(REDIS_URL);

//     redis.on('connect', () => {
//         console.log('Connected to Redis');
//     });

//     redis.on('error', (error) => {
//         console.error('Redis connection error:', error);
//     });

//     return redis;
// }

// // const redisClient = connectToRedis();
// // export {redisClient}