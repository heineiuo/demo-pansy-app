var pansy = require('pansy')
var router = module.exports = pansy.Router()

var main = require('../controller/main')

router.route('/').get(
  main.hello
)
