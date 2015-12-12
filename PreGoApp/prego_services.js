UsuariosService = require('./usuarios_service.js');

function PregoServices() {
    var __store = {};
    var __usuariosService = new UsuariosService(__store);

    this.setStore = function (store) {
        __store = store;
        __usuariosService.setStore(__store);
    }

    this.rellenar = function () {
        __usuariosService.rellenar();
    }

    this.getUsuariosService = function () {
        return __usuariosService;
    }
}

module.exports = PregoServices;