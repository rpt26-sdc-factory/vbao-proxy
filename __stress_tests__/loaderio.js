module.exports = (req, res) => {
  // Generate a random endpoint at last 10% of DB
  const getRandom = (max) => Math.floor(Math.random() * max);
  const max = 10000001;
  let endpoint = getRandom(max);

  while (endpoint < max * 0.9) {
    endpoint = getRandom(max);
  }

  res.redirect(`/${endpoint}`);
};
