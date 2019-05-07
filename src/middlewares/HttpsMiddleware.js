
const handler = (req, res, next) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https')
    return res.redirect('https://' + req.get('host') + req.url);

  next();
};

module.exports = handler;