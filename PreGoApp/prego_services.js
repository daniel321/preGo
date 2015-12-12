UsuariosService = require('./usuarios_service.js');
EncuentrosService = require('./encuentros_service.js');

function PregoServices() {
    var __store = {};
    var __usuariosService = new UsuariosService(__store);
	var __encuentrosService = new EncuentrosService(__store);

    this.setStore = function (store) {
		__store = store;
		__usuariosService.setStore(__store);
		__encuentrosService.setStore(__store);
    }

    this.rellenar = function () {
        __usuariosService.rellenar();
        __encuentrosService.rellenar();
    }

    this.getUsuariosService = function () {
        return __usuariosService;
    }
	
    this.getEncuentrosService = function () {
        return __encuentrosService;
    }
}

module.exports = PregoServices;