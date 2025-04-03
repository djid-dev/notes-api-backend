const notFoundErrorMiddleware = (req, res) => {
  console.log(req.path)
  res.status(404).json({ error: 'Not found' })
}

module.exports = notFoundErrorMiddleware
