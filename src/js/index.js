require('normalize.css')
require('../css/app.scss')
require('./lib/common.js')

$(function () {

  class Base {
      start() {
          console.log('class test')
      }
  }

  const base = new Base()
  base.start()
})
console.log($(document).width())
