var assert = require('chai').assert;
var PregoServices = require('../prego_services.js');

describe('PregoServices', function() {
  describe('#Fiestas', function () {
	 var createServicios = function () {
		var store = {};
		var pregoServices = new PregoServices();
		
		var usuariosService =  pregoServices.getUsuariosService();
		var encuentrosService =  pregoServices.getEncuentrosService();
		var fiestasService =  pregoServices.getFiestasService();
		
		var res = {};
		res.usuarios = usuariosService;
		res.encuentros = encuentrosService;
		res.fiestas = fiestasService;
		return res;
	}


	it('no hay fiestas al principio', function () {
	     var servicios = createServicios();
		assert.equal(0, servicios.fiestas.getAll().length);
    });	
	 
	
  });
});