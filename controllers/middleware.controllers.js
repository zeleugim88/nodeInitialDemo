

const cacheTimePageController = (req, res, next) => {
    res.set('Cache-control', 'no-cache')
    next()
  }

const authTimePageController = (req, res, next) => {
    if (req.headers.name !== "pepito" || req.headers.password !== "123456") {
      return res.status(401).json({
        message: "Credentials not valid"
      });
    }
    next();
  }

module.exports = {
    cacheTimePageController,
    authTimePageController
}