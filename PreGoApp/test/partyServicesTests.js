var assert = require('chai').assert;
var PregoServices = require('../prego_services.js');
var moment = require('../node_modules/moment/moment.js');


 

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
	
	
	it('agregar una fiesta', function () {
		//console.log(moment());
	    var servicios = createServicios();
		var newParty = {};	
		newParty.nombre = 'Una fiesta';
		newParty.descripcion = 'Re copada';
		newParty.inicio = moment([2015, 12, 12,23,0,0]).toDate();
		newParty.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.location = {
			direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
			lat: '-34.5410156', 
			long: '-58.7140899'
		};

		var res = servicios.fiestas.addParty(newParty);	
		assert.equal(true, res.exito);
		assert.equal(1, res.id);
		assert.equal(1, servicios.fiestas.getAll().length);
		assert.equal('Una fiesta', servicios.fiestas.getAll()[0].nombre);
			
	});
	
	
	
	it('no se pueden agregar fiestas con el mismo nombre y misma fecha de inicio', function () {
		//console.log(moment());
	    var servicios = createServicios();
		var newParty = {};
	
		newParty.nombre = 'Una fiesta';
		newParty.descripcion = 'Re copada';
		newParty.inicio = moment([2015, 12, 12,23,0,0]).toDate();
		newParty.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.location = {
			direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
			lat: '-34.5410156', 
			long: '-58.7140899'
		};

		var res = servicios.fiestas.addParty(newParty);
		assert.equal(true, res.exito);
		
		var newParty2 = {};	
		newParty2.nombre = 'Una fiesta';
		newParty2.descripcion = 'Re copada';
		newParty2.inicio = moment([2015, 12, 12,22,0,0]).toDate();
		newParty2.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty2.types = [ "after","bar"];
		newParty2.generos = [ "after","bar"]; 
		newParty2.generos = [ "ochentoso","dance"];
		newParty2.location = {
			direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
			lat: '-34.5410156', 
			long: '-58.7140899'
		};
		
		var res = servicios.fiestas.addParty(newParty2);
		assert.equal(false, res.exito);
		assert.equal(1, servicios.fiestas.getAll().length);
		
		var newParty3 = {};	
		newParty3.nombre = 'Una fiesta';
		newParty3.descripcion = 'Re copada';
		newParty3.inicio = moment([2015, 12, 13,23,0,0]).toDate();
		newParty3.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty3.types = [ "after","bar"];
		newParty3.generos = [ "after","bar"]; 
		newParty3.generos = [ "ochentoso","dance"];
		newParty3.location = {
			direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
			lat: '-34.5410156', 
			long: '-58.7140899'
		};
		var res = servicios.fiestas.addParty(newParty3);
		assert.equal(true, res.exito);
		assert.equal(2, res.id);
		assert.equal(2, servicios.fiestas.getAll().length);
			
	});
	
	
	it('una fiesta no puede tener nombre vacio', function () {
		//console.log(moment());
	    var servicios = createServicios();
		var newParty = {};
	
		newParty.nombre = '';
		newParty.descripcion = 'Re copada';
		newParty.inicio = moment([2015, 12, 12,23,0,0]).toDate();
		newParty.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.location = {
			direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
			lat: '-34.5410156', 
			long: '-58.7140899'
		};

		var res = servicios.fiestas.addParty(newParty);
		assert.equal(false, res.exito);
		
		assert.equal(0, servicios.fiestas.getAll().length);
		
		var servicios = createServicios();
		var newParty = {};
	
		newParty.nombre = '         '; 

		var res = servicios.fiestas.addParty(newParty);
		assert.equal(false, res.exito);
		
		assert.equal(0, servicios.fiestas.getAll().length);
			
	});
	
	it('obtener una fiesta', function () {
		//console.log(moment());
	    var servicios = createServicios();
		var newParty = {};
	
		newParty.nombre = 'Una fiesta';
		newParty.descripcion = 'Re copada';
		newParty.inicio = moment([2015, 12, 12,23,0,0]).toDate();
		newParty.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.location = {
			direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
			lat: '-34.5410156', 
			long: '-58.7140899'
		};

		var res = servicios.fiestas.addParty(newParty);
		assert.equal(true, res.exito);
		var fiestaGuardada = servicios.fiestas.getParty(res.id);
		
		assert.equal(fiestaGuardada.nombre , newParty.nombre);
			
	});
    
	 
	
  });
});