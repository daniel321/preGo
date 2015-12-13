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
		  
		assert.equal(false,servicios.encuentros.sugerir('no-existe@mail.com').exito);
    });	 
	
	it('deberia traer algun usuario', function () {
	    var servicios = createServicios();
		//assert.equal(false, servicios.usuarios==null);
		servicios.usuarios.rellenar();
		   
		
		assert.equal(true, servicios.encuentros.sugerir('nahuel@prego.com').exito);
		assert.isNotNull( servicios.encuentros.sugerir('nahuel@prego.com').usuarioAConocer);
		assert.isNotNull( servicios.encuentros.sugerir('nahuel@prego.com').usuarioAConocer.email);
    });
	
	
	it('deberia traer matches de sexo opuesto', function () {
	    var servicios = createServicios();
		//assert.equal(false, servicios.usuarios==null);
		servicios.usuarios.rellenar();
		
		var usuario = servicios.usuarios.getUsuarioByEmail('nahuel@prego.com');
		var usuarioAConocer = servicios.encuentros.sugerir(usuario.email).usuarioAConocer;
		
		assert.notEqual( usuario.sexo, usuarioAConocer.sexo);
    });
	
	
	it('deberia permitir calificar, luego la proxima sugerencia debe ser distinta', function () {
	    var servicios = createServicios();
		servicios.usuarios.rellenar();
		
		var usuario = servicios.usuarios.getUsuarioByEmail('nahuel@prego.com');
		var usuarioAConocer1 = servicios.encuentros.sugerir(usuario.email).usuarioAConocer;
		assert.isNotNull( usuarioAConocer1.email,'usuarioAConocer1 null');				
		var resCalif = servicios.encuentros.calificar(usuario.email, usuarioAConocer1.email, true);
		assert.equal(true,resCalif.exito , "problema al calificar");
		var usuarioAConocer2 = servicios.encuentros.sugerir(usuario.email).usuarioAConocer;
		assert.notEqual( usuarioAConocer1.email, usuarioAConocer2.email, 'No deberia traer al mismo usuario que ya fue calificado');
		servicios.encuentros.calificar(usuario.email, usuarioAConocer2.email, false);
		var usuarioAConocer3 = servicios.encuentros.sugerir(usuario.email).usuarioAConocer;
		//console.log('Tercera sugerencia:' + usuarioAConocer3.email);
		assert.notEqual( usuarioAConocer2.email, usuarioAConocer3.email, 'No deberia traer al mismo usuario que ya fue calificado');
		assert.notEqual( usuarioAConocer1.email, usuarioAConocer3.email, 'No deberia traer al mismo usuario que ya fue calificado');
		
    });
	
	
	it('deberia permitir calificar, luego la proxima sugerencia debe ser distinta', function () {
	    var servicios = createServicios();
		servicios.usuarios.rellenar();
		
		var usuario = servicios.usuarios.getUsuarioByEmail('nahuel@prego.com');
		var usuarioAConocer1 = servicios.encuentros.sugerir(usuario.email).usuarioAConocer;
		var usuarioAConocer2 = servicios.encuentros.sugerir(usuario.email).usuarioAConocer;		
		assert.equal(usuarioAConocer1.email, usuarioAConocer2.email,  'Mientras no se califique muestra siempre al mismo usuario');
    });
	
	
	it('get Matches', function () {
		var servicios = createServicios();
		servicios.usuarios.rellenar();
		
		assert.equal(0, servicios.encuentros.getMatches('damian@prego.com').length);
		servicios.encuentros.rellenar();
		assert.equal(2, servicios.encuentros.getMatches('damian@prego.com').length);
		
    });
	
	
	it('getMatches deberia devolver algo aunque no haya mensajes aun', function () {
		var servicios = createServicios();
		servicios.usuarios.rellenar();
		
		servicios.encuentros.addMatch('nahuel@prego.com','china@prego.com');
		//console.log(servicios.encuentros.getMatches('nahuel@prego.com')[0]);
		assert.equal(1, servicios.encuentros.getMatches('nahuel@prego.com').length);
		
    });
	
	
	it('cuando ambos se califican mutuamente deberia haber una coincidencia', function () {
	    var servicios = createServicios();
		servicios.usuarios.rellenar();
		
		assert.equal(0,servicios.encuentros.getMatches('china@prego.com','nahuel@prego.com').length)
		var resCalifIda1 = servicios.encuentros.calificar('nahuel@prego.com', 'china@prego.com', true);		
		assert.equal(true,resCalifIda1.exito);		
		assert.equal(false,resCalifIda1.match,'No se esperaba match 1');
		
		//console.log(servicios.encuentros.calificar('nahuel@prego.com', 'ursula@prego.com', false));
		var resCalifIda2 = servicios.encuentros.calificar('nahuel@prego.com', 'ursula@prego.com', false);
		assert.equal(true,resCalifIda2.exito);		
		assert.equal(false,resCalifIda2.match,'No se esperaba match 2');
		
		var resCalifVuelta1 = servicios.encuentros.calificar('ursula@prego.com','nahuel@prego.com', true);
		assert.equal(true,resCalifVuelta1.exito);		
		assert.equal(false,resCalifVuelta1.match,'No se esperaba match 3');
		
		var resCalifVuelta2 = servicios.encuentros.calificar('china@prego.com','nahuel@prego.com', true);
		assert.equal(true,resCalifVuelta2.exito);		
		assert.equal(true,resCalifVuelta2.match,'Se esperaba match 4');
		
		assert.equal(1,servicios.encuentros.getMatches('china@prego.com','nahuel@prego.com').length);
		
    });
	
	
	
	it('cuando hay coincidencia se devuelve informacion del match', function () {
	    var servicios = createServicios();
		servicios.usuarios.rellenar();
		
		var resCalifIda1 = servicios.encuentros.calificar('nahuel@prego.com', 'china@prego.com', true);
		assert.equal(null,resCalifIda1.matchInfo,'No se esperaba match 1');
		
		var resCalifVuelta2 = servicios.encuentros.calificar('china@prego.com','nahuel@prego.com', true);
		assert.equal(true,resCalifVuelta2.match,'Se esperaba match 4');
		assert.equal('nahuel@prego.com',resCalifVuelta2.matchInfo.other.email,'Deberia venir el email');
		assert.equal('china@prego.com',resCalifVuelta2.matchInfo.you.email,'Deberia venir el email');
		
		assert.equal(1,servicios.encuentros.getMatches('china@prego.com','nahuel@prego.com').length);
		
    });
	
	//verificar que al haber match se cree un match en los usuarios
	//que no se puedan agregar matches entre mismos usuarios
	//que no se puedan agregar matches repetidos
	//no deberia traer al mismo usuario que busca
	//deberia traer en orden de creacion de usuario
	//deberia devolver match cuando calificas
	//al producirse un match deberia crear el chat	
	//deberia traer primero los usuarios de fiestas a las que va el usuarioConocedor	
	
  });
});