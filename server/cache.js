const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const checkCache = (req, res, next) => {
  const courseNumber = req.params.id;

  client.get(courseNumber, (err, data) => {
    if (err) res.status(400).send(err);
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};

module.exports = {
  client,
  checkCache,
};
