function UsuariosService(store) {
    var __store = store;
    if (typeof (__store.usuarios) === 'undefined') {
        __store.usuarios = [];
    }

	this.agregarUsuario = function (email, pass, nickname, avatar_url, sexo) {
		if (!__getUsuarioByEmail(email)) {
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

    var __getUsuarioByEmail = function (email) {
		var arr = __store.usuarios;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].email == email) {
				return arr[i];
			}
		}
		return null;
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

    this.addMatch = function (user, user2, msg) {
		var usr = __getUsuarioByName(user);
		var usr2 = __getUsuarioByName(user2);

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
		var auth = __getUsuarioByName(author);
		var usr2 = __getUsuarioByName(user2);

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
					message: msg,
					time: new Date().toString("HH:mm"),
				});
			}
		}
    }

    this.getChat = function (user, user2) {
		var usr = __getUsuarioByName(user);

		if (usr != null) {
			if (usr.matches.indexOf(user2) > -1) {
				if (usr.chats == null) {
					return ([]);
				}
				return usr.chats[user2];
			}
		}
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
					avatar_url: '/dist/img/user7-128x128.jpg',
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
					email: "Ursula@prego.com",
					pass: "asd",
					sexo: 'F',
				},
				{
					avatar_url: '/dist/img/user4-128x128.jpg',
					nickname: 'China',
					email: "China@prego.com",
					pass: "asd",
					sexo: 'F',
				},
				{
					avatar_url: '/dist/img/user5-128x128.jpg',
					nickname: 'Rosita',
					email: "Rosita@prego.com",
					pass: "asd",
					sexo: 'F',
				},
				{
					avatar_url: '/dist/img/user7-128x128.jpg',
					nickname: 'Malena',
					email: "Malena@prego.com",
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