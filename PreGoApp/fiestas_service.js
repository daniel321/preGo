function FiestasService(store, services) {
    var __store = store;
	var services = services;
	
	var _getFiestasDondeParticipa = function(usuarioDom){
		var res = [];
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			if(item.participantes && item.participantes.indexOf(usuarioDom)>-1){
				res.push(item);	
			}			
		}
		return res;
	}
	
    if (typeof (__store.fiestas) === 'undefined') {
        __store.fiestas = [];
		__store.fiesta_last_id = 0;
		__store.getFiestasDondeParticipa = _getFiestasDondeParticipa;
    };
	
	
	this.getAll = function(){
		var res = [];
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			res.push(copyParty(item));
		}
		return res;
	};
	 
	
	this.rellenarDemo = function () {
		var participantes_fill = [
			"daniel@prego.com",
			"facundo@prego.com",
			"malena@prego.com",
			"facundo@prego.com",
			"damian@prego.com",
			"guido@prego.com",
			"damian@prego.com",
			"china@prego.com",
			"malena@prego.com",
			"guido@prego.com",
			"rosita@prego.com",
			"ezequiel@prego.com",
			"ezequiel@prego.com",
			"facundo@prego.com",
			"usrula@prego.com",
			"china@prego.com",
			"guido@prego.com",
			"china@prego.com",
			"ezequiel@prego.com",
			"facundo@prego.com",
			"usrula@prego.com",
			"malena@prego.com",
			"guido@prego.com",
			"china@prego.com",
			"damian@prego.com",
			"china@prego.com",
			"guido@prego.com",
			"rosita@prego.com"
		];
		 
		// this.participar(1,"nahuel@prego.com");
		// this.participar(1,"rosita@prego.com");
		
		// this.participar(2,"nahuel@prego.com");
		// this.participar(2,"nahuel@prego.com");
		
		// this.participar(3,"nahuel@prego.com");
		// this.participar(3,"nahuel@prego.com");
		// this.participar(3,"nahuel@prego.com");
		
		// this.participar(4,"nahuel@prego.com");
		// this.participar(4,"nahuel@prego.com");
		// this.participar(4,"nahuel@prego.com");
			
		// this.participar(5,"nahuel@prego.com");
		// this.participar(5,"nahuel@prego.com");
		// this.participar(5,"nahuel@prego.com");
		
		var f=0;
		for(var i=0; i<participantes_fill.length; i++){
			if(f>=__store.fiestas.length){
				f=0;
			}
			//console.log(__store.fiestas[f]);
			this.participar(__store.fiestas[f].id,participantes_fill[i]);
			f++;
		}
		
		
	}
	
    this.rellenar = function () {
		 
		var partys = {};

	 	this.addParty({
			nombre:"Ink",	
			esSugerida:true,		
			types:["bar","disco"],
			musicGenres:["tropical","dance"],
			fotos:["otras imagenes"],
			descripcion:"descripcion Ink",
			pos:{ name:'Av Cnel. Niceto Vega 5635, 1414 Buenos Aires',lat:-34.5865587,long:-58.4395189},
			
			cantidadDeGente:325,
			imagenDeFondo:"/dist/img/clubs/ink.jpg",
			imagenBanner:"/dist/img/clubs/ink_BAR.jpg",

			inicio: "2015-12-18T09:30:00",
			fin:    "2015-12-19T04:30:00",
		});
		
		this.addParty({
			nombre: "Hiio",
			esSugerida:true,
			types:["bar","disco"],
			musicGenres:["dance"],
			imagenDeFondo:"/dist/img/clubs/Hiio.jpg",
			imagenBanner:"/dist/img/clubs/Hiio_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion Hiio",
			pos:{
				name:'C1088AAB, Adolfo Alsina 940, Buenos Aires',
				lat:-34.610724,
				long:-58.379743
			},
			inicio: "2015-12-17T13:30:00",
			fin:    "2015-12-19T21:30:00",

			cantidadDeGente:202,
			userRates:[8,9,7,9,6,4,7],
			comentarios: [ {"avatar_url":"/dist/img/user2-160x160.jpg", autor:"Nahuel",comentario:"festejando en este gran lugar!!"}]
		});

		this.addParty({
			nombre: "Moscow",
			//esSugerida:false,//es lo mismo
			types:["bar","disco"],
			musicGenres:["tropical","reggae"],
			imagenDeFondo:"/dist/img/clubs/Moscow.jpg",
			imagenBanner:"/dist/img/clubs/Moscow_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion Moscow",
			pos:{name: 'Av Juan B. Justo 1302-1400, C1414CWP CABA', lat:-34.584532,long:-58.433644},
			inicio: "2015-12-16T06:30:00",
			fin:    "2015-12-20T21:30:00",

			cantidadDeGente:235,
			userRates:[6,8,10,7,4],
			comentarios: [ {"avatar_url":"/dist/img/user8-128x128.jpg", autor:"Guido",comentario:"que buena fiesta !!!"}]
		});

		this.addParty({
			nombre:"Bosque",
			esSugerida:false,
			types:["bar","disco"],
			musicGenres:["tropical","dance","rock"],
			imagenDeFondo:"/dist/img/clubs/bosque.jpg",
			imagenBanner:"/dist/img/clubs/bosque_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion bosque",
			pos:{name:'Av la Plata 3749, Quilmes Oeste, Buenos Aires',lat:-34.750622,long:-58.268180},

			inicio: "2015-12-23T07:30:00",
			fin:    "2015-12-24T21:30:00",

			cantidadDeGente:135,
			userRates:[8,10,7],
			comentarios: [ {"avatar_url":"/dist/img/avatar5.png", autor:"Ezequiel",comentario:"aca hay de todo !!!"}]
		});

		this.addParty({
			nombre: "Sunset",
			esSugerida:true,
			types:["bar","disco"],
			musicGenres:["dance","other"],
			imagenDeFondo:"/dist/img/clubs/sunset.jpg",
			imagenBanner:"/dist/img/clubs/sunset_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion sunset",
			pos:{name:'Av del Libertador 2701-2799,C1425ABA CABA',lat:-34.578253,long:-58.407982},

			inicio: "2015-12-14T03:00:00",
			fin:    "2015-12-16T03:30:00",

			cantidadDeGente:1632,
			userRates:[9,10,8,10,7,9],
			comentarios: [ {"avatar_url":"/dist/img/avatar5.png", autor:"Ezequiel",comentario:"esta genial!"},
				{"avatar_url":"/dist/img/user8-128x128.jpg", autor:"Guido",comentario:"festejando como loco!!"},
				{"avatar_url":"/dist/img/user6-128x128.jpg", autor:"Nahuel",comentario:"fiestaaaaa!"}]
		});

		this.addParty({
			nombre: "BsAsEnFoco",
			esSugerida:false,
			types:["after","bar","disco"],
			musicGenres:["tropical"],
			imagenDeFondo:"/dist/img/clubs/Buenos-Aires-En-Foco.jpg",
			imagenBanner:"/dist/img/clubs/Buenos-Aires-En-Foco_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion Buenos-Aires-En-Foco",
			pos:{name:'Pereyra 1672,C1237ACD CABA',lat:-34.6324812,long:-58.4184982},
			inicio: "2015-12-10T06:30:00",
			fin:    "2015-12-12T21:30:00",

			cantidadDeGente:6,
			userRates:[8,10,7],

			comentarios: [ {"avatar_url":"/dist/img/avatar04.png", autor:"Facundo",comentario:"muy bueno, pero no hay nadie..."}]
		});

		this.addParty({
			nombre: "PoolParty",
			esSugerida:false,
			types:["private","other"],
			musicGenres:["tropical","dance"],
			imagenDeFondo:"/dist/img/clubs/Pool-Party.jpg",
			imagenBanner:"/dist/img/clubs/Pool-Party_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion Pool-Party",
			pos:{name:'Av Presidente Ram?n San Castillo 2500, Ciudad Aut?noma de Buenos Aires',lat:-34.5739245,long:-58.3923359},
			inicio: "2015-12-14T10:30:00",
			fin:    "2015-12-15T21:30:00",

			cantidadDeGente:302,
			userRates:[8,8,8,5,7,10],
			comentarios: [ {"avatar_url":"/dist/img/user6-128x128.jpg", autor:"Nahuel",comentario:"chicas lindas x todos lados !!!"}] 
			
		});

	};
	
	this.addParty = function(newParty){
		
		if(newParty.nombre==null || newParty.nombre=='' || newParty.nombre.trim() == ''){
			return {exito:false, error:'Fiesta sin nombre'};
		}
		
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			var inicio = new Date(item.inicio); 
			var newPartyinicio = new Date(newParty.inicio);
			if(item.nombre==newParty.nombre 
				&& inicio.getFullYear()==newPartyinicio.getFullYear()
				&& inicio.getMonth()==newPartyinicio.getMonth()
				&& inicio.getDate()==newPartyinicio.getDate()
				){
				return {exito:false,error:'Ya existe una fiesta con el mismo nombre'};		
			}
		}
		if(newParty.pos){
			//console.log(getDD2DMS(newParty.pos.lat, 'lat'));
			//console.log(newParty.nombre + '\nhttps://www.google.com.ar/maps/place/'+getDD2DMS(newParty.pos.lat, 'lat')+'+'+getDD2DMS(newParty.pos.long, 'lon'));	
		}
		//console.log(newParty.pos);
		newParty.id = ++ __store.fiesta_last_id;
		__store.fiestas.push(newParty);
		//console.log(newParty);
		return {exito:true, id : newParty.id};
	};
	
	this.getParty = function(key, usuarioConsulta){
		var nombre=null;
		var id=null;
		if(isNaN(key)){
			nombre = key;
			//console.log('getParty con nombre:' + nombre);
		}else{
			id = key;
			//console.log('id:' + id);
		}
		
		var fiesta=null;
		var res = null;
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			if( (nombre!=null && item.nombre == nombre) || (id!=null && item.id==id)){
				fiesta = __store.fiestas[i];
				res = copyParty(fiesta);
				break;
			}
		}
		if(fiesta){			
			if(!isUndef(usuarioConsulta) && fiesta!=null){
				for(var i=0;i<fiesta.participantes.length;i++){
					var item = fiesta.participantes[i];
					if( item.email == usuarioConsulta ){
						res.soyAsistente = true;
						break;
					}
				}	
			}
			res.flama = getFlame(fiesta);
			
		}
		return res;
	};


	var convertAllPartys = function(partys){
		var res = [];
		for(var i=0; i<partys.length; i++){
			var party = partys[i];
			res.push(copyParty(party));
		}
		return res;
	}
	
	var copyParty = function(party){
		var copy = {};
		
		party.userRates = asegurarArray(party.userRates);
		party.types = asegurarArray(party.types);
		party.musicGenres = asegurarArray(party.musicGenres);		
		party.fotos = asegurarArray(party.fotos);
		party.userRates = asegurarArray(party.userRates);
		party.comentarios = asegurarArray(party.comentarios);
		
		copy.id=party.id;
		copy.nombre=party.nombre;
		copy.esSugerida=party.esSugerida;
		copy.types=party.types.slice();
		copy.musicGenres=party.musicGenres.slice();		
		copy.imagenDeFondo=party.imagenDeFondo;
		copy.imagenBanner=party.imagenBanner;
		copy.fotos = party.fotos.slice();
		copy.descripcion=party.descripcion;
		copy.pos = party.pos;
		copy.inicio=party.inicio;
		copy.fin=party.fin;
		copy.userRates=party.userRates.slice();
		copy.comentarios=party.comentarios.slice();

		copy.nombre = party.nombre;
		copy.flama = party.flama;
		copy.dist = party.dist;


		party.participantes = asegurarArray(party.participantes);
		copy.participantes = [];
		for(var i=0;i<party.participantes.length;i++){
			var participante = party.participantes[i];  			
			copy.participantes.push(participante.avatar_url);
		}
		
		if(isUndef(party.cantidadDeGente)){
			party.cantidadDeGente=0;
		}
		
		copy.cantidadDeGente=party.cantidadDeGente + party.participantes.length * 1;
		
		copy.soyAsistente = false;
		
		return copy;
	}
	
	this.getPartysByType = function(destacadas, lat, long, types){
		var ret = []; 
		for(var i=0;i<__store.fiestas.length;i++){
			var party = __store.fiestas[i];  			
			var dist = this.getDistance([lat,long],party);			 
			if (!destacadas && ( isUndef( party.esSugerida) || party.esSugerida ==null )  || (party.esSugerida == destacadas)){
				if(  esDeAlgunoDeLosTipos(types, party.types)){
					agregar(ret,party.nombre,party,dist);		
				}
			}
		}
		ret.sort(biggerAmountOfPeople);
		return convertAllPartys(ret);
	};
	
	
	this.getPartysCloseBy = function(destacadas, lat, long, tol){
		var ret = []; 

		for(var i=0;i<__store.fiestas.length;i++){
			var party = __store.fiestas[i];  
			var dist = this.getDistance([lat,long],party);
			if((dist < tol)){
				if(!destacadas){
					//console.log('>Sugerida:' + party.esSugerida);
					//console.log(party);
				}
				if (!destacadas && ( isUndef( party.esSugerida) || party.esSugerida ==null )  || (party.esSugerida == destacadas)){
					agregar(ret,party.nombre,party,dist);		
				}
			}
		}

		ret.sort(closest);
		return convertAllPartys(ret);
	};
	
	
	this.getPartysByDate = function(destacadas, lat, long, desde, hasta){
		
		var ret = []; 

		for(var i=0;i<__store.fiestas.length;i++){
			var party = __store.fiestas[i];  
			
			var dist = this.getDistance([lat,long],party);
			
			if(!destacadas){
				//console.log('>Sugerida:' + party.esSugerida);
				//console.log(party);
			}
			if (!destacadas && ( isUndef( party.esSugerida) || party.esSugerida ==null )  || (party.esSugerida == destacadas)){
				if( (isUndef(desde) && isUndef(hasta)) || comesBetween(party,desde,hasta)){
					agregar(ret,party.nombre,party,dist);		
				}
			}
		}
		ret.sort(biggerAmountOfPeople);
		return convertAllPartys(ret);
	};
	
	
	this.participar = function(fiestaId, emailUsuario){
		var party = __getParty(fiestaId);
		if(party){
			var usuario = __store.__getUsuarioByEmail(emailUsuario);
			if(usuario){
				party.participantes = asegurarArray(party.participantes);
				for(var i=0;i<party.participantes.length;i++){
					if(party.participantes[i].email==usuario.email){
						return {exito:false, error:'Intentando participar dos veces'};
					}
				}
				party.participantes.push(usuario);
				return {exito:true};
			}else{
				return {exito:false,error:'Usuario inexistente'};	
			}			
		}else{
			return {exito:false,error:'Fiesta inexistente'};	
		}
	}
    
	this.comentar = function (fiestaId, emailUsuario, comentario) {
	    var party = __getParty(fiestaId);
	    if (party) {
	        var usuario = __store.__getUsuarioByEmail(emailUsuario);
	        if (usuario) {
	            var objComentario = {
	                avatar_url: usuario.avatar_url,
	                email: usuario.email,
	                time: Date.now(),
	                autor: usuario.nickname,
                    comentario: comentario
	            }
	            party.comentarios = asegurarArray(party.comentarios);
	            party.comentarios.push(objComentario);
	            //party.participantes = asegurarArray(party.participantes);
	            //for (var i = 0; i < party.participantes.length; i++) {
	            //    if (party.participantes[i].email == usuario.email) {
	            //        return { exito: false, error: 'Intentando participar dos veces' };
	            //    }
	            //}
	            //party.participantes.push(usuario);
	            return { exito: true };
	        } else {
	            return { exito: false, error: 'Usuario inexistente' };
	        }
	    } else {
	        return { exito: false, error: 'Fiesta inexistente' };
	    }
	}



	
	var __getParty = function(id){
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			if( (id!=null && item.id == id)){
				return __store.fiestas[i];		
			}
		}
		return null;
	}
	
	
	
	var asegurarArray = function(arr){
		if(isUndef(arr) || arr==null){
			return [];	
		}
		return arr;
	}
	
	var isUndef = function(obj){
		return typeof(obj)=='undefined';
	};
	
	var agregar = function(ret,name,party,dist){
		var flame = getFlame(party);

		party.nombre = name;
		party.flama = flame;
		party.dist = dist;

		party.googleMapsUrl = 'https://www.google.com.ar/maps/place/'+getDD2DMS(party.pos.lat, 'lat')+'+'+getDD2DMS(party.pos.long, 'lon');
		
		ret.push(party);
	};

	var biggerAmountOfPeople = function(party1,party2){ //pasada
		return (party2.cantidadDeGente - party1.cantidadDeGente);
	}

	
	var getFlame = function(party){
		if(isUndef(party)){
			return "/dist/img/icons/fire/fireIconWhite.png";
		}
		var rates = asegurarArray(party.comentarios).length;
		
		var personas = 1;
		if(party.cantidadDeGente){
			personas +=party.cantidadDeGente;
		}
		
		var people =  asegurarArray(party.participantes).length ;
		
		if(isUndef(rates)){
			rates = [];
		}
		 
 /*
		console.log('people:' + people);
		console.log('rates:' + rates);
	*/	
		if((personas >= 500)){
			return "/dist/img/icons/fire/fireIconPurple.png";
		}else{
			if((personas >= 500)){
					return "/dist/img/icons/fire/fireIconRed.png";
			}else{
				if( (personas >= 100)  ){
					return "/dist/img/icons/fire/fireIconOrange.png";
				}else{
					if(rates > 0){
						return "/dist/img/icons/fire/fireIconYellow.png";
					}else{
						if(people > 0){
							return "/dist/img/icons/fire/fireIconBlue.png";
						}else{
							return "/dist/img/icons/fire/fireIconWhite.png";
						}
					}	
				}
			}
		}
	};
	
	
	var closest = function(party1,party2){
		return (party1.dist - party2.dist);
	};
	
	this.getDistance = function (direccion,party) {
		if(party.pos){	
			var lat = party.pos.lat;
			var long = party.pos.long;

			var lat2 = direccion[0];
			var long2 = direccion[1];

			var dlat = enRadianes(lat2-lat);
			var dlong = enRadianes(long2-long);

			var a = Math.pow( Math.sin( dlat/2 ), 2) + Math.cos(enRadianes(lat)) * Math.cos(enRadianes(lat2)) * Math.pow( Math.sin( dlong/2 ), 2);

			var c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));		
			
			var RadioTierra = 6378.0;
			return Math.round(RadioTierra*c);	
		}else{
			console.log('Party sin pos:');
			console.log(party);
		}
		
	};
	
	
	var enRadianes = function(valor){
		return (Math.PI/180)*valor;
	};

	
	function getDD2DMS(dms, type){

		var sign = 1, Abs=0;
		var days, minutes, secounds, direction;

		if(dms < 0)  { sign = -1; }
		Abs = Math.abs( Math.round(dms * 1000000.));
		//Math.round is used to eliminate the small error caused by rounding in the computer:
		//e.g. 0.2 is not the same as 0.20000000000284
		//Error checks
		if(type == "lat" && Abs > (90 * 1000000)){
			//alert(" Degrees Latitude must be in the range of -90. to 90. ");
			return false;
		} else if(type == "lon" && Abs > (180 * 1000000)){
			//alert(" Degrees Longitude must be in the range of -180 to 180. ");
			return false;
		}

		days = Math.floor(Abs / 1000000);
		minutes = Math.floor(((Abs/1000000) - days) * 60);
		secounds = ( Math.floor((( ((Abs/1000000) - days) * 60) - minutes) * 100000) *60/100000 ).toFixed();
		days = days * sign;
		if(type == 'lat') direction = days<0 ? 'S' : 'N';
		if(type == 'lon') direction = days<0 ? 'W' : 'E';
		//else return value     
		return (days * sign) + 'º' + minutes + "'" + secounds + '"' + direction;
	};
	//alert(getDD2DMS(-8.68388888888889, 'lon'));
	
	
	var comesBetween = function(party,start,end){

		var rangeStart = new Date(start.split(".")[0]);
		var rangeEnd = new Date(end.split(".")[0]);

		var partyStart = new Date(party.inicio.split(".")[0]);
		var partyEnd = new Date(party.fin.split(".")[0]);

		var res = ( ((partyStart >= rangeStart)&&(partyStart <= rangeEnd)) || ((rangeStart >= partyStart)&&(rangeStart <= partyEnd)) ); 
		return res;
	}
	
	var esDeAlgunoDeLosTipos = function(types,partyTypes){ //pasada
		
		for(t1 in types){
			var type1 = types[t1];

			for(t2 in partyTypes){
				var type2 = partyTypes[t2];
				if(type1 == type2){
					return true;
				}
			}
		}
		return false;
	}

 
}

module.exports = FiestasService;
