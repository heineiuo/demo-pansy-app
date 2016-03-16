var express = require('express')
var app = express()
var http = require('http').Server(app)
var morgan = require('morgan')
app.use(morgan('dev', {}))
app.use('/client', express.static(process.cwd()+'/dist/client'))
app.route(/^(?!\/client).*$/).get(function (req, res, next) {
  res.sendFile(process.cwd()+'/dist/client/example/index.html')
})
http.listen(8080, function () {
  console.log('listing on port 8080')
})