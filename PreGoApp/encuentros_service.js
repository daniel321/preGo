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
		}
	}


	this.getProximoAConocer = function (emailUsuarioBuscador) {
		var usuarioBuscador = null;
		var arr = __store.usuarios;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].email == emailUsuarioBuscador) {
				usuarioBuscador = arr[i];
			}
		}
		var res = { exito: true, error:'', usuarioAConocer:null};
		if(usuarioBuscador){
			var usuarioEncontrado = null;
			for (var i = 0; i < arr.length && usuarioEncontrado==null; i++) {
				if (arr[i].sexo != usuarioBuscador.sexo ) {
					usuarioEncontrado = arr[i];
				}
			}
			res.usuarioAConocer =  __copyUsuario(usuarioEncontrado);
		}else{
			res.exito = false;
			res.error = 'No se encuentra el usuario: ' + emailUsuarioBuscador;
		}
		return res;
	}
 
}

module.exports = EncuentrosService;