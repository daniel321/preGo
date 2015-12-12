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

	var __usuarioYaCalificado = function(usuarioCalificador, posibleCalificado){
		if(usuarioCalificador.calificados){		
			var arr = usuarioCalificador.calificados;
			for (var i = 0; i < arr.length; i++) {
				//console.log("Calificado");
				if (arr[i].email == posibleCalificado.email) {
					return true;
				}
			}	
		}else{
			return false;
		}
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
				
				if ( !__usuarioYaCalificado(usuarioBuscador, arr[i]) && arr[i].sexo != usuarioBuscador.sexo ) {
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
			usuarioCalificador.calificados.push(usuarioCalificado, calificacionPositiva);	
			return { exito: true};
		}else{
			return { exito: false, error:'No se encuentra uno de los usuarios. usuarioCalificador:' + (usuarioCalificador?'Ok':'Null') + ',usuarioCalificado:'+ (usuarioCalificado?'Ok':'Null')};
		}
	}
	
	
	
 
}

module.exports = EncuentrosService;