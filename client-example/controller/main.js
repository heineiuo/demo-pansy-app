var main = module.exports = {}

main.hello = function(req, res, next){

  $('#app').html(JST['hello']())
  res.end()

}