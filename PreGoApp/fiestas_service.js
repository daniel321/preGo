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
			"nahuel@prego.com",
			"daniel@prego.com",
			"facundo@prego.com",
			"facundo@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"damian@prego.com",
			"guido@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"damian@prego.com",
			"china@prego.com",
			"guido@prego.com",
			"rosita@prego.com",
			"ezequiel@prego.com",
			"facundo@prego.com",
			"china@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"china@prego.com",
			"guido@prego.com",
			"china@prego.com",
			"ezequiel@prego.com",
			"facundo@prego.com",
			"nahuel@prego.com",
			"nahuel@prego.com",
			"guido@prego.com",
			"china@prego.com",
			"damian@prego.com",
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
			pos:{lat:-34.5865587,long:-58.4395189},
			
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
			pos:{lat:-34.4961641,long:-58.5549297},

			inicio: "2015-12-17T13:30:00",
			fin:    "2015-12-19T21:30:00",

			cantidadDeGente:202,
			userRates:[8,9,7,9,6,4,7],
			comentarios: [ {autor:"Damian",comentario:"festejando en este gran lugar!!"}]
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
			pos:{lat:-34.4513129,long:-58.5561985},

			inicio: "2015-12-16T06:30:00",
			fin:    "2015-12-20T21:30:00",

			cantidadDeGente:235,
			userRates:[6,8,10,7,4],
			comentarios: [ {autor:"Guido",comentario:"que buena fiesta !!!"}]
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
			pos:{lat:-34.8304372,long:-58.5712683},

			inicio: "2015-12-23T07:30:00",
			fin:    "2015-12-24T21:30:00",

			cantidadDeGente:135,
			userRates:[8,10,7],
			comentarios: [ {autor:"Ezequiel",comentario:"aca hay de todo !!!"}]
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
			pos:{lat:-34.5876237,long:-58.4660913},

			inicio: "2015-12-14T03:00:00",
			fin:    "2015-12-16T03:30:00",

			cantidadDeGente:1632,
			userRates:[9,10,8,10,7,9],
			comentarios: [ {autor:"Ezequiel",comentario:"esta genial!"},
				{autor:"Guido",comentario:"festejando como loco!!"},
				{autor:"Nahuel",comentario:"fiestaaaaa!"}]
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
			pos:{lat:-34.6324812,long:-58.4184982},

			inicio: "2015-12-10T06:30:00",
			fin:    "2015-12-12T21:30:00",

			cantidadDeGente:6,
			userRates:[8,10,7],

			comentarios: [ {autor:"Facundo",comentario:"muy bueno, pero no hay nadie..."}]
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
			pos:{lat:-34.5739245,long:-58.3923359},

			inicio: "2015-12-14T10:30:00",
			fin:    "2015-12-15T21:30:00",

			cantidadDeGente:302,
			userRates:[8,8,8,5,7,10],
			comentarios: [ {autor:"Nahuel",comentario:"chicas lindas x todos lados !!!"}]
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
		console.log(newParty.pos);
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
			console.log('getParty con nombre:' + nombre);
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
		if(!isUndef(usuarioConsulta) && fiesta!=null){
			for(var i=0;i<fiesta.participantes.length;i++){
				var item = fiesta.participantes[i];
				if( item.email == usuarioConsulta ){
					res.soyAsistente = true;
					break;
				}
			}	
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
		copy.cantidadDeGente=party.cantidadDeGente;
		copy.userRates=party.userRates.slice();
		copy.comentarios=party.comentarios.slice();

		party.participantes = asegurarArray(party.participantes);
		copy.participantes = [];
		for(var i=0;i<party.participantes.length;i++){
			var participante = party.participantes[i];  			
			copy.participantes.push(participante.avatar_url);
		}
		
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
		var rates = party.userRates;
		var people = party.cantidadDeGente;
		
		if(isUndef(rates)){
			rates = [];
		}
		
		if(isUndef(people)){
			people = [];
		}

		var count = 0;

		for (var i=0;i<rates.length;i++)
			count += rates[i];

		var avg = count/rates.length;

		if((people > 1000)&&(avg > 9)){
			return "/dist/img/icons/fire/fireIconPurple.png";
		}else{
			if((people > 500)&&(avg > 8)){
				return "/dist/img/icons/fire/fireIconBlue.png";
			}else{
				if((people > 400)&&(avg > 7)){
					return "/dist/img/icons/fire/fireIconRed.png";
				}else{
					if((people > 300)&&(avg > 6)){
						return "/dist/img/icons/fire/fireIconOrange.png";
					}else{
						if((people > 200)&&(avg > 5)){
							return "/dist/img/icons/fire/fireIconYellow.png";
						}else{
							return "/dist/img/icons/fire/fireIconWhite.png";
						}
					}	
				}
			}
		}
	};
	
	
	var closest = function(party1,party2){
		return (party2.dist - party1.dist);
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

		var res = ( ((partyStart > rangeStart)&&(partyStart < rangeEnd)) || ((rangeStart > partyStart)&&(rangeStart < partyEnd)) ); 
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