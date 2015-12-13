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
		
		partys["Ink"] = {
			nombre:"Ink",
			esSugerida:true,
			types:["Bar","Boliche"],
			imagenDeFondo:"/dist/img/clubs/ink.jpg",
			imagenBanner:"/dist/img/clubs/ink_BAR.jpg",
			fotos:["otras imagenes"],
			descripcion:"descripcion Ink",
			pos:{lat:-34.5865587,long:-58.4395189},

			inicio: "2015-12-18T09:30:00",
			fin:    "2015-12-19T04:30:00",

			cantidadDeGente:325,
			userRates:[10,7,9,9,6],
			comentarios: [ {autor:"Daniel",comentario:"muy buen lugar!"} , 
						{autor:"Facundo",comentario:"esto esta que explota!!"} ]
		};

		partys["Hiio"] = {
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
		};

		partys["Moscow"] = {
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
		};

		partys["Bosque"] = {
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
		};

		partys["Sunset"] = {
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
		};

		partys["BsAsEnFoco"] = {
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
		};

		partys["PoolParty"] = {
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
		};



	}
	
	this.addParty = function(newParty){
		
		if(newParty.nombre==null || newParty.nombre=='' || newParty.nombre.trim() == ''){
			return {exito:false, error:'Fiesta sin nombre'};
		}
		
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			if(item.nombre==newParty.nombre 
				&& item.inicio.getFullYear()==newParty.inicio.getFullYear()
				&& item.inicio.getMonth()==newParty.inicio.getMonth()
				&& item.inicio.getDate()==newParty.inicio.getDate()
				){
				return {exito:false,error:'Ya existe una fiesta con el mismo nombre'};		
			}
		}
		newParty.id = ++ __store.fiesta_last_id;
		__store.fiestas.push(newParty);
		return {exito:true, id : newParty.id};
	}
	this.getParty = function(id){
		for(var i=0;i<__store.fiestas.length;i++){
			var item = __store.fiestas[i];
			if(item.id==id){
				return __store.fiestas[i];		
			}
		}
		return null;
	}
 
}

module.exports = EncuentrosService;