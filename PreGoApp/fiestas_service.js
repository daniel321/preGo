function EncuentrosService(store) {
    var __store = store;
    if (typeof (__store.fiestas) === 'undefined') {
        __store.fiestas = [];
		__store.fiesta_last_id = 0;
    }
	
	this.getAll = function(){
		return __store.fiestas;
	}
	 
	 
    this.rellenar = function () {
		 
		var partys = {};
		/*
		newParty.nombre = 'Una fiesta';
		newParty.descripcion = 'Re copada';
		newParty.inicio = moment([2015, 12, 12,23,0,0]).toDate();
		newParty.fin = moment([2015, 12, 13,6,0,0]).toDate();
		newParty.types = [ "after","bar"];
		newParty.generos = [ "after","bar"]; 
		newParty.direccion: "Calle Paunero 1650, San Miguel, Buenos Aires",
		newParty.pos = {
			lat: '-34.5410156', 
			long: '-58.7140899'
		};

			esSugerida:true,
			imagenDeFondo:"/dist/img/clubs/ink.jpg",
			imagenBanner:"/dist/img/clubs/ink_BAR.jpg",
			fotos:["otras imagenes"],
			cantidadDeGente:325,
			userRates:[10,7,9,9,6],
			comentarios: [ {autor:"Daniel",comentario:"muy buen lugar!"} , 
			{autor:"Facundo",comentario:"esto esta que explota!!"} ]
		*/
	 	this.addParty({
			nombre:"Ink",			
			types:["Bar","Boliche"],
			fotos:["otras imagenes"],
			descripcion:"descripcion Ink",
			pos:{lat:-34.5865587,long:-58.4395189},

			inicio: "2015-12-18T09:30:00",
			fin:    "2015-12-19T04:30:00",
		});

		this.addParty({
			nombre: "Hiio",
			esSugerida:false,
			types:["Bar","Boliche"],

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
			esSugerida:false,
			types:["Bar","Boliche"],

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
			types:["Bar","Boliche"],
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
			types:["Bar","Boliche"],
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
			types:["After office","Bar","Boliche"],
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
			types:["Privada","Otro"],
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



	}
	
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
		
		newParty.id = ++ __store.fiesta_last_id;
		__store.fiestas.push(newParty);
		return {exito:true, id : newParty.id};
	}
	
	this.getParty = function(key){
		var nombre=null;
		var id=null;
		if(isNaN(key)){
			nombre = key;
			console.log('nombre' + nombre);
		}else{
			id = key;
			console.log('id:' + id);
		}
		
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			if( (nombre!=null && item.nombre == nombre) || (id!=null && item.id==id)){
				return __store.fiestas[i];		
			}
		}
		return null;
	}
	
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
	}
	//alert(getDD2DMS(-8.68388888888889, 'lon'));
 
}

module.exports = EncuentrosService;