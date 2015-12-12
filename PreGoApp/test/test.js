var assert = require('assert');
var PregoServices = require('../prego_services.js');

var createUsuariosService = function () {
    var pregoServices = new PregoServices();
    var usuariosService = pregoServices.getUsuariosService();
    return usuariosService;
}


describe('PregoServices', function() {
  describe('#Usuarios', function () {
    
	it('deberia devolver true', function () {
	    var usuarios = createUsuariosService();

		assert.equal(true, usuarios.agregarUsuario('pepe@pepe.com','pepePass').exito);
    });	
	
	it('no deberian haber usuarios al principio', function () {
	    var usuarios = createUsuariosService();

		assert.equal(0, usuarios.getUsuarios().length);
    });
	
	it('deberia existir el usuario recien agregado', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.agregarUsuario('pepe@pepe.com','pepePass');
		assert.equal('pepe@pepe.com', usuarios.getUsuarios()[0].email);
    });
	
	it('no deberia permitir usuarios duplicados', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.agregarUsuario('usuarioDup','pepePass');
		
		assert.equal(false, usuarios.agregarUsuario('usuarioDup','pepePass').exito);
		assert.equal(1, usuarios.getUsuarios().length);
    });
	

	it('deberia permitir loggearse con credenciales correctas', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.agregarUsuario('pepe@pepe.com','pepePass');
		
		assert.equal(true, usuarios.login('pepe@pepe.com','pepePass'));
    });
	
	it('no deberia permitir loggearse con credenciales erroneas', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.agregarUsuario('pepe@pepe.com','pepa');
		
		assert.equal(false, usuarios.login('pepe@pepe.com','pepe@pepe.com'));
    });
	
	
	it('deberian permitir rellenar la base con datos de prueba', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.rellenar();
		
		assert.equal(6, usuarios.getUsuarios().length);
    });
	
	
	it('deberian permitir buscar un usuario por email', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.rellenar();
		
		assert.equal("Nahuel", usuarios.getUsuarioByEmail("nahuel@prego.com").nickname);
    });
	
	
  });
});



 /*
describe('PregoServices', function() {
  describe('#Usuarios', function () {
    
	it('deberia devolver true', function () {
		var serivicios = servicios.init();
		assert.equal(true, serivicios.agregarUsuario('pepe@pepe.com','pepePass').exito);
    });	
	
	it('no deberian haber usuarios al principio', function () {
		var serivicios = servicios.init();
		
		assert.equal(0, serivicios.usuarios().length);
    });
	
	it('deberia existir el usuario recien agregado', function () {
		var serivicios = servicios.init();
		serivicios.agregarUsuario('pepe@pepe.com','pepePass');
		assert.equal('pepe@pepe.com', serivicios.usuarios()[0].nombre);
    });
	
	it('no deberia permitir usuarios duplicados', function () {
		var serivicios = servicios.init();
		serivicios.agregarUsuario('usuarioDup','pepePass');
		
		assert.equal(false, serivicios.agregarUsuario('usuarioDup','pepePass').exito);
		assert.equal(1, serivicios.usuarios().length);
    });
	
	
  });
});
*/