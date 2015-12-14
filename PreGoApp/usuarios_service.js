function UsuariosService(store) {
    var __store = store;
	
	this.rellenarDemo = function () {
		
	}
	
    var __getUsuarioByEmail = function (email) {
		var arr = __store.usuarios;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].email == email) {
				return arr[i];
			} 
		}
		return null;
    }
 
	
    if (typeof (__store.usuarios) === 'undefined') {
        __store.usuarios = [];
		__store.__getUsuarioByEmail = __getUsuarioByEmail;
    }

	this.agregarUsuario = function (email, pass, nickname, avatar_url, sexo) {
		if (!__getUsuarioByEmail(email)) {
			if(typeof(avatar_url)=='undefined' || avatar_url==''){
				avatar_url='/dist/img/avatar.png';
			}
			if(typeof(sexo)=='undefined' || sexo==''){
				sexo='M';
			}
			
			__store.usuarios.push({ pass: pass, email: email, nickname: nickname, avatar_url: avatar_url, sexo: sexo });
			return { exito: true };
		}
		return { exito: false };
    }

    this.getUsuarios = function () {
		var res = [];
		var arr = __store.usuarios;
		for (var i = 0; i < arr.length; i++) {
			res.push({
				pass: arr[i].pass
				, email: arr[i].email
				, nickname: arr[i].nickname
				, avatar_url: arr[i].avatar_url
				, sexo: arr[i].sexo
			});
		}
		return res;
    }

    this.login = function (email, pass) {
		var user = __getUsuarioByEmail(email);
		if (user) {
			return user.pass == pass;
		}
		return false;
    }

    var __getUsuarioByName = function (name) {
		var arr = __store.usuarios;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].nickname == name) {
				return arr[i];
			}
		}
		return null;
    }

    var __copyUsuario = function (user) {
		return {
			pass: user.pass
			, email: user.email
			, nickname: user.nickname
			, avatar_url: user.avatar_url
			, matches: user.matches
			, sexo: user.sexo
		}
    }

    this.getUsuarioByEmail = function (email) {
		var u = __getUsuarioByEmail(email);
		if (u) {
			return __copyUsuario(u);
		}
		return null;
    }

    this.getUsuarioByName = function (name) {
		var u = __getUsuarioByName(name);
		if (u) {
			return __copyUsuario(u);
		}
		return null;
    }

    this.rellenar = function () {
		var relleno =
			[
				{
					avatar_url: '/dist/img/user1-128x128.jpg',
					nickname: 'Damian',
					email: "damian@prego.com",
					pass: "asd",
					sexo: 'M',
				},
				{
					avatar_url: '/dist/img/user2-160x160.jpg',
					nickname: 'Daniel',
					email: "daniel@prego.com",
					pass: "asd",
					sexo: 'M',
				},
				{
					avatar_url: '/dist/img/user6-128x128.jpg',
					nickname: 'Nahuel',
					email: "nahuel@prego.com",
					pass: "asd",
					sexo: 'M',
				},
				{
					avatar_url: '/dist/img/avatar5.png',
					nickname: 'Ezequiel',
					email: "ezequiel@prego.com",
					pass: "asd",
					sexo: 'M',
				},
				{
					avatar_url: '/dist/img/user8-128x128.jpg',
					nickname: 'Guido',
					email: "guido@prego.com",
					pass: "asd",
					sexo: 'M',
				},
				{
					avatar_url: '/dist/img/avatar04.png',
					nickname: 'Facundo',
					email: "facundo@prego.com",
					pass: "asd",
					sexo: 'M',
				},
				{
					avatar_url: '/dist/img/user3-128x128.jpg',
					nickname: 'Ursula',
					email: "ursula@prego.com",
					pass: "asd",
					sexo: 'F',
				},
				{
					avatar_url: '/dist/img/user4-128x128.jpg',
					nickname: 'China',
					email: "china@prego.com",
					pass: "asd",
					sexo: 'F',
				},
				{
					avatar_url: '/dist/img/user5-128x128.jpg',
					nickname: 'Rosita',
					email: "rosita@prego.com",
					pass: "asd",
					sexo: 'F',
				},
				{
					avatar_url: '/dist/img/user7-128x128.jpg',
					nickname: 'Malena',
					email: "malena@prego.com",
					pass: "asd",
					sexo: 'F',
				}
			];
		var arr = relleno;
		for (var i = 0; i < arr.length; i++) {
			var u = arr[i];
			this.agregarUsuario(u.email, u.pass, u.nickname, u.avatar_url, u.sexo);
		};
		
		return true;
    }
}

module.exports = UsuariosService;
