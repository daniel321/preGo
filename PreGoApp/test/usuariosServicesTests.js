var assert = require('chai').assert;
var PregoServices = require('../prego_services.js');

describe('PregoServices', function() {
  describe('#Usuarios', function () {
	var createUsuariosService = function () { 
		var usuariosService = new PregoServices().getUsuariosService();
		return usuariosService;
	}
    
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
		
		assert.equal(true, usuarios.getUsuarios().length>=6);
    });
	
	
	it('deberian permitir buscar un usuario por email', function () {
	    var usuarios = createUsuariosService();
		
		usuarios.rellenar();
		
		assert.equal("Nahuel", usuarios.getUsuarioByEmail("nahuel@prego.com").nickname);
		assert.equal("M", usuarios.getUsuarioByEmail("nahuel@prego.com").sexo);
    });
  });
});