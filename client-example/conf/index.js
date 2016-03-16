var conf = module.exports = {
  baseUrl: '', // default: ''
  routeScope: '',
  hrefPrefix: ''
}

if (typeof window != 'undefined') window.conf = conf