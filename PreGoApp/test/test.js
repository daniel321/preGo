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
  
  
  
  describe('#Encuentros', function () {
	  
	var createServicios = function () {
		var store = {};
		var pregoServices = new PregoServices();
		
		var usuariosService =  pregoServices.getUsuariosService();
		var encuentrosService =  pregoServices.getEncuentrosService();
		
		var res = {};
		res.usuarios = usuariosService;
		res.encuentros = encuentrosService;
		return res;
	}

	it('deberia devolver error con email invalido', function () {
	    var servicios = createServicios();
		servicios.usuarios.rellenar();
		  
		assert.equal(false,servicios.encuentros.getProximoAConocer('no-existe@mail.com').exito);
    });	 
	
	it('deberia traer algun usuario', function () {
	    var servicios = createServicios();
		//assert.equal(false, servicios.usuarios==null);
		servicios.usuarios.rellenar();
		   
		
		assert.equal(true, servicios.encuentros.getProximoAConocer('nahuel@prego.com').exito);
		assert.isNotNull( servicios.encuentros.getProximoAConocer('nahuel@prego.com').usuarioAConocer);
    });
	
	
	it('deberia traer matches de sexo opuesto', function () {
	    var servicios = createServicios();
		//assert.equal(false, servicios.usuarios==null);
		servicios.usuarios.rellenar();
		
		var usuario = servicios.usuarios.getUsuarioByEmail('nahuel@prego.com');
		var usuarioAConocer = servicios.encuentros.getProximoAConocer(usuario.email).usuarioAConocer;
		
		assert.notEqual( usuario.sexo, usuarioAConocer.sexo);
    });
	
	
	//no deberia traer al mismo usuario que busca
	//deberia traer en orden de creacion de usuario
	//deberia permitir calificar
	//una vez que calificas no deberia volver a traer al mismo
	//deberia devolver match cuando calificas
	//al producirse un match deberia crear el chat
	//deberia traer primero los usuarios de fiestas a las que va el usuarioConocedor	
	
  });
});