const redis = require("@redis/client");
const taskLine = require("../service/taskQueue");
const client = redis.createClient({
  url: "redis://127.0.0.1:6380",
});

client.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

async function rateLimit(req, res, next) {
  const userId = req.body.userId;
  const minuteKey = `rate_limit:${userId}:minute`;
  const secondKey = `rate_limit:${userId}:second`;

  try {
    const [countMinute, countSecond] = await Promise.all([
      client.get(minuteKey),
      client.get(secondKey),
    ]);

    const newCountSecond = (parseInt(countSecond) || 0) + 1;
    await client.set(secondKey, newCountSecond, { EX: 1 });

    if (newCountSecond > 1) {
      taskLine(userId);
      return res
        .status(202)
        .send("Request queued due to rate limit per second");
    }

    const newCountMinute = (parseInt(countMinute) || 0) + 1;
    await client.set(minuteKey, newCountMinute, { EX: 60 });

    if (newCountMinute > 20) {
      taskLine(userId);
      return res
        .status(202)
        .send("Request queued due to rate limit per minute");
    }

    next();
  } catch (error) {
    console.error("Error in rate limiting middleware", error);
    next(error);
  }
}

module.exports = rateLimit;
