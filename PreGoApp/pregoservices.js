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
		,__copyUsuario:function(user){			
			return {
				pass:user.pass
				, email:user.email
				, nickname:user.nickname
				, avatar_url:user.avatar_url					
			}
		}
		,getUsuarioByEmail:function(email){
			var u = this.__getUsuarioByEmail(email);
			if(u){
				return this.__copyUsuario(u);
			}
			return null;
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
								email: "damiel@prego.com",
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