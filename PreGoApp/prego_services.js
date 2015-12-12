module.exports = {};

var __store = {};
var __usuariosService = require('./usuarios_service.js');
__usuariosService.setStore(__store);

module.exports.setStore = function (store) {
    __store = store;
    __usuariosService.setStore(__store);
}

module.exports.resetStore = function () {
    __store = {};
    module.exports.setStore(__store);
}

module.exports.rellenar = function () {
    __usuariosService.rellenar();
}

module.exports.getUsuariosService = function () {
    return __usuariosService;
}