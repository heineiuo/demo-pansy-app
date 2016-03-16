/**
 * Created by Hansel.
 * 项目配置
 */


var pansy = require('pansy')
var conf = require('./conf')
var app = pansy.Main()

app.set('routeScope', conf.routeScope)
app.set('spa', true)

app.use(require('./router'))

app.go(location.href, 'none')