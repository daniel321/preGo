function EncuentrosService(store) {
    var __store = store;
    if (typeof (__store.usuarios) === 'undefined') {
        __store.usuarios = [];
    }
	
	var __copyUsuario = function (user) {
		return {
			nickname: user.nickname
			, avatar_url: user.avatar_url
			, sexo: user.sexo
			, email : user.email
		}
	}
	
	var __buscarUsuario = function(email){
		var arr = __store.usuarios;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].email == email) {
				return arr[i];
			}
		}
		return null;
	}

	var __getUsuarioCalificado = function(usuarioCalificador, posibleCalificado){
		if(usuarioCalificador.calificados){		
			var arr = usuarioCalificador.calificados;
			for (var i = 0; i < arr.length; i++) {
				//console.log("Calificado");
				if (arr[i].usuario.email == posibleCalificado.email) {
					return arr[i];
				}
			}	
		}else{
			return null;
		}
	}

    this.addMatch = function (user, user2, msg) {
		var usr = __buscarUsuario(user);
		var usr2 = __buscarUsuario(user2);

		if ((usr != null) && (usr2 != null)) {
			if (usr.matches == null) {
				usr.matches = [];
			}

			if (usr2.matches == null) {
				usr2.matches = [];
			}

			usr.matches.push(user2);
			usr2.matches.push(user);
		}
    }

    this.addChat = function (author, user2, msg) {
		var auth = __buscarUsuario(author);
		var usr2 = __buscarUsuario(user2);
		
		if ((auth != null) && (usr2 != null)) {
			if ((auth.matches.indexOf(user2) > -1) && (usr2.matches.indexOf(author) > -1)) {

				if (auth.chats == null) {
					auth.chats = {};
				}

				if (usr2.chats == null) {
					usr2.chats = {};
				}

				var chat = auth.chats[user2];
				if (chat == null) {
					chat = [];
					auth.chats[user2] = chat;
					usr2.chats[author] = chat;
				}

				chat.push({
					avatar_url: auth.avatar_url,
					nickname: auth.nickname,
					email: auth.email,
					message: msg,
					time: new Date().toString("HH:mm"),
				});
			}
		}
    }

    this.getChat = function (emailUsuario, emailOtro) {
		var usr = __buscarUsuario(emailUsuario);

		if (usr != null) {
			if (usr.matches && usr.matches.indexOf(emailOtro) > -1) {
				if (usr.chats == null) {
					return ([]);
				}
				return usr.chats[emailOtro];
			}
		}
		return [];
    }
	
    this.getMatches = function (emailUsuario) {
		var user = __buscarUsuario(emailUsuario);
		if (user != null) {
			if (user.matches) {
				var ret = [];
				
				for(var i=0; i< user.matches.length;i++){
					var matchEmail = user.matches[i];					
					var other = __buscarUsuario(matchEmail);  
					var chats = this.getChat(user.email,matchEmail);
					if(chats && chats.length>0){
						chats = chats.slice(-3);				
					}					
					ret.push( {
						nickname: other.nickname,
						avatar_url: other.avatar_url,
						lastChats: chats,						
						email: other.email,
					});
				} 
				return ret;
			}else{
				return [];				
			}
		}		
		
		return null;
    }
	

	this.sugerir = function (emailUsuarioBuscador) {
		
		var usuarioBuscador = null;
		usuarioBuscador = __buscarUsuario(emailUsuarioBuscador);
		var res = { exito: true, error:'', usuarioAConocer:null};
		if(usuarioBuscador){
			var arr = __store.usuarios;
			var usuarioEncontrado = null;
			//console.log('Recorriendo usuarios');
			for (var i = 0; i < arr.length && usuarioEncontrado==null; i++) {
				
				if ( __getUsuarioCalificado(usuarioBuscador, arr[i])==null && arr[i].sexo != usuarioBuscador.sexo ) {
					usuarioEncontrado = arr[i];
				}
			}
			if(usuarioEncontrado){
				res.usuarioAConocer =  __copyUsuario(usuarioEncontrado);	
			}			
		}else{
			res.exito = false;
			res.error = 'No se encuentra el usuario: ' + emailUsuarioBuscador;
		}
		return res;
	}
	
	

	this.calificar = function (emailUsuarioCalificador, emailUsuarioCalificado, calificacionPositiva) {
		var usuarioCalificador = __buscarUsuario(emailUsuarioCalificador);
		var usuarioCalificado = __buscarUsuario(emailUsuarioCalificado);
		
		if(usuarioCalificado != null && usuarioCalificador!=null){		
			if(typeof (usuarioCalificador.calificados) == 'undefined'){
				usuarioCalificador.calificados = [];
			}			
			usuarioCalificador.calificados.push({
					usuario:usuarioCalificado, 
					calificacion:calificacionPositiva
				});	
			
			if(calificacionPositiva){
				var posibleCalificacionReciproca = __getUsuarioCalificado(usuarioCalificado, usuarioCalificador);
				if( posibleCalificacionReciproca!= null && posibleCalificacionReciproca.calificacion==true){
					this.addMatch(emailUsuarioCalificador,emailUsuarioCalificado);
					return { exito: true, match: true};
				}				
			}			
			return { exito: true, match: false};	
						
		}else{
			return { exito: false, error:'No se encuentra uno de los usuarios. usuarioCalificador:' + (usuarioCalificador?'Ok':'Null') + ',usuarioCalificado:'+ (usuarioCalificado?'Ok':'Null')};
		}
	}
	
	
	
	
    this.rellenar = function () {
		this.addMatch("daniel@prego.com","damian@prego.com");

		this.addChat("daniel@prego.com","damian@prego.com","No estoy en casa ahora, iré en un rato y a las 20 me voy");
		this.addChat("damian@prego.com","daniel@prego.com","Avisame cuando llegues");
		this.addChat("daniel@prego.com","damian@prego.com","Llego en 15");
		this.addChat("daniel@prego.com","damian@prego.com","ya llego");

		this.addMatch("facundo@prego.com","damian@prego.com");

		this.addChat("damian@prego.com","facundo@prego.com","Estas ahi??");
		this.addChat("facundo@prego.com","damian@prego.com","no :p");
		this.addChat("damian@prego.com","facundo@prego.com","...");

		this.addMatch("ezequiel@prego.com","nahuel@prego.com");
		this.addChat("ezequiel@prego.com","nahuel@prego.com","todo en orden?");
		this.addChat("nahuel@prego.com","ezequiel@prego.com","sip");
		
		this.calificar('ursula@prego.com','nahuel@prego.com', true);
		this.calificar('china@prego.com','nahuel@prego.com', true);
		
		this.addMatch("nahuel@prego.com","china@prego.com");
	}
 
}

module.exports = EncuentrosService;