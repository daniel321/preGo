module.exports.Servicios =function(){
	return {
		store : {
			a:1
			,usuarios:[]
		}
		,Usuarios:function(){
			return module.exports.__Usuarios(this.store);
		}
	};
}


module.exports.__Usuarios =function(store){
	return {
		agregarUsuario : function(email, pass,nickname,avatar_url){
			if(!this.__getUsuarioByEmail(email)){
				store.usuarios.push({ pass:pass, email:email, nickname:nickname, avatar_url:avatar_url});
				return {exito:true};
			}
			return {exito:false};
		}
		,getUsuarios : function(){
			var res = [];
			var arr = store.usuarios;
			for(var i=0; i<arr.length; i++){
				res.push({
					pass:arr[i].pass
					, email:arr[i].email
					, nickname:arr[i].nickname
					, avatar_url:arr[i].avatar_url					
					});
			}
			return res;
		}
		,login:function(email, pass){
			var user = this.__getUsuarioByEmail(email);
			if(user){
				return user.pass==pass;
			}
			return false;
		}
		,__getUsuarioByEmail:function(email){
			var arr = store.usuarios;
			for(var i=0; i<arr.length; i++){
				if(arr[i].email==email){
					return arr[i];					
				}
			}
			return null;
		}
		,__getUsuarioByName:function(name){
			var arr = store.usuarios;
			for(var i=0; i<arr.length; i++){
				if(arr[i].nickname==name){
					return arr[i];					
				}
			}
			return null;
		}
		,__copyUsuario:function(user){			
			return {
				pass:user.pass
				, email:user.email
				, nickname:user.nickname
				, avatar_url:user.avatar_url
				, matches: user.matches					
			}
		}
		,getUsuarioByEmail:function(email){
			var u = this.__getUsuarioByEmail(email);
			if(u){
				return this.__copyUsuario(u);
			}
			return null;
		}
		,getUsuarioByName:function(name){
			var u = this.__getUsuarioByName(name);
			if(u){
				return this.__copyUsuario(u);
			}
			return null;
		}		
		,addMatch:function(user,user2,msg){
			var usr = this.__getUsuarioByName(user);
			var usr2 = this.__getUsuarioByName(user2);

			if((usr != null) && (usr2 != null)){
				if(usr.matches == null){
					usr.matches = [];
				}
		
				if(usr2.matches == null){
					usr2.matches = [];
				}

				usr.matches.push(user2);
				usr2.matches.push(user);
			}	
		}
		,addChat:function(author,user2,msg){
			var auth = this.__getUsuarioByName(author);
			var usr2 = this.__getUsuarioByName(user2);

			if((auth != null) && (usr2 != null)){
				if((auth.matches.indexOf(user2) >-1)&&(usr2.matches.indexOf(author) >-1)){

					if(auth.chats == null){
						auth.chats = {};
					}

					if(usr2.chats == null){
						usr2.chats = {};
					}

					var chat = auth.chats[user2];				
					if(chat == null){
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
 
		,getChat:function(user,user2){
			var usr = this.__getUsuarioByName(user);

			if(usr != null){
				if(usr.matches.indexOf(user2) >-1){
					if(usr.chats == null){
						return([]);
					}
					return usr.chats[user2];
				}
			}
		}

		,rellenar:function(){
			var relleno = 
						[
							{
								avatar_url: '/dist/img/user1-128x128.jpg',
								nickname: 'Damian',
								email: "damian@prego.com",
								pass: "asd"
							},
							{
								avatar_url: '/dist/img/user2-160x160.jpg',
								nickname: 'Daniel',
								email: "daniel@prego.com",
								pass: "asd"
							},
							{
								avatar_url: '/dist/img/user3-128x128.jpg',
								nickname: 'Nahuel',
								email: "nahuel@prego.com",
								pass: "asd"
							},
							{
								avatar_url: '/dist/img/user4-128x128.jpg',
								nickname: 'Ezequiel',
								email: "ezequiel@prego.com",
								pass: "asd"
							},
							{
								avatar_url: '/dist/img/user5-128x128.jpg',
								nickname: 'Guido',
								email: "guido@prego.com",
								pass: "asd"
							},
							{
								avatar_url: '/dist/img/user6-128x128.jpg',
								nickname: 'Facundo',
								email: "facundo@prego.com",
								pass: "asd"
							}
						];
			var arr = relleno;
			for(var i=0; i<arr.length; i++){
				var u = arr[i];
				this.agregarUsuario(u.email, u.pass,u.nickname,u.avatar_url);
			};
			return true;
		}
		
	};
}