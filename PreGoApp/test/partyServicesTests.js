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
		newParty.inicio =  "2015-12-12T23:00:00";
		newParty.fin = "2015-12-13T06:00:00";
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
		newParty2.inicio =  "2015-12-12T22:00:00";
		newParty2.fin = "2015-12-13T06:00:00";
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
		newParty3.inicio = "2015-12-13T23:00:00";
		newParty3.fin = "2015-12-13T06:00:00";
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
		newParty.inicio = "2015-12-13T23:00:00";
		newParty.fin = "2015-12-13T23:00:00";
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
		newParty.inicio = "2015-12-13T23:00:00";
		newParty.fin = "2015-12-13T23:00:00";
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.direccion= "Calle Paunero 1650, San Miguel, Buenos Aires";
		newParty.pos = {			
			lat: '-34.5410156', 
			long: '-58.7140899'
		};

		var res = servicios.fiestas.addParty(newParty);
		assert.equal(true, res.exito);
		var fiestaGuardada = servicios.fiestas.getParty(res.id);
		
		assert.equal(fiestaGuardada.nombre , newParty.nombre);
			
	});
	
	
	it('se puede rellenar el servicio', function () {
	    var servicios = createServicios();
		
		servicios.fiestas.rellenar();
		
		assert.equal(true, servicios.fiestas.getAll().length>6, 'se esperaban mas de 6 fistas');
    });
	
	
	
	it('se le puede dar una ubicacion vacia y no se cuelga', function () {
	    var servicios = createServicios();
		
		var newParty = {};
	
		newParty.nombre = 'Una fiesta';
		newParty.descripcion = 'Re copada';
		newParty.inicio = "2015-12-13T23:00:00";
		newParty.fin = "2015-12-13T23:00:00";
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.direccion= "Calle Paunero 1650, San Miguel, Buenos Aires";
		newParty.pos = {			
			lat: 'a', 
			long: ''
		};

		assert.equal(0, servicios.fiestas.getAll().length);
		var res = servicios.fiestas.addParty(newParty);
		
		assert.equal(true, res.exito);
		assert.equal(1, servicios.fiestas.getAll().length);
    });
	
	
	/*it('se puede obtener fiestas cercanas a sunset', function () {
	    var servicios = createServicios();
		
		var newParty = {};
	
		newParty.nombre = 'Una fiesta';
		newParty.descripcion = 'Re copada';
		newParty.inicio = "2015-12-13T23:00:00";
		newParty.fin = "2015-12-13T23:00:00";
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.generos = [ "ochentoso","dance"];
		newParty.direccion= "Calle Paunero 1650, San Miguel, Buenos Aires";
		newParty.pos = {			
			lat: 'a', 
			long: ''
		};

		assert.equal(0, servicios.fiestas.getAll().length);
		var res = servicios.fiestas.addParty(newParty);
		
		assert.equal(true, res.exito);
		assert.equal(1, servicios.fiestas.getAll().length);
    });
	*/
	
	it('se puede obtener fiestas por nombre', function () {
	    var servicios = createServicios();
		servicios.fiestas.rellenar();	
		
		assert.equal("descripcion bosque",servicios.fiestas.getParty('Bosque').descripcion);
    });
	
	
	// Cerca de Sunset -34.587581, -58.476997
	//        pos:{lat:-34.5876237,long:-58.4660913},
	
	
    
	 
	
  });
});