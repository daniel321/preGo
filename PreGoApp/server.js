var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()


var prego = require('./pregoservices.js');
var servicios = prego.Servicios(); // no matar esta variable ni volver a llamar a Servicios porque muere todo el estado;

app.use(express.static('web'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.use(cookieParser());

app.post("/api/login", function (req, res) {
    var email = req.body.email;
    var pass = req.body.pass;

    if (servicios.Usuarios().login(email, pass)) {
        res.cookie("nickname", email);
		res.send(true);
    }else{
		res.send(false);	
	}
});

app.get("/api/logout", function (req, res) {
    res.clearCookie("nickname");
    res.send(true);
});


app.get("/api/user", function (req, res) {
    res.send(servicios.Usuarios().getUsuarios());
});

app.put("/api/user", function (req, res) {
    res.send(servicios.Usuarios().agregarUsuario(req.nombre, req.pass,req.email,req.nickname,req.avatar_url).exito);
});

var initChat = function(pers1,pers2){
    if (chats[pers1] == null)
	chats[pers1] = [];
    
    if(chats[pers1][pers2] == null)
	chats[pers1][pers2] = [];
}

var addChat = function(me,other,msg,pic){

    chats[me][other].push({
        avatar_url: pic,
        nickname: me,
        message: msg,
        time: new Date().toString("HH:mm"),
        is_you: true
    });

    chats[other][me].push({
        avatar_url: pic,
        nickname: me,
        message: msg,
        time: new Date().toString("HH:mm"),
        is_you: false
    });
}

var chats = {};
initChat("Daniel","Damian");
initChat("Damian","Daniel");

addChat("Daniel","Damian","No estoy en casa ahora, iré en un rato y a las 20 me voy","/dist/img/user1-128x128.jpg");
addChat("Damian","Daniel","Avisame cuando llegues","/dist/img/user2-160x160.jpg");
addChat("Daniel","Damian","Llego en 15","/dist/img/user1-128x128.jpg");

initChat("Facundo","Damian");
initChat("Damian","Facundo");

addChat("Damian","Facundo","Estas ahi??","/dist/img/user1-128x128.jpg");
addChat("Facundo","Damian","no :p","/dist/img/user6-128x128.jpg");
addChat("Damian","Facundo","...","/dist/img/user1-128x128.jpg");

var buscarUrl = function(email){
	var u = servicios.Usuarios().getUsuarioByEmail(email);
	if(u){
		return u.avatar_url;
	}else{
		return "/dist/img/user1-128x128.jpg";	
	}
	
}

app.get('/api/chat/:nickname', function (req, res) {
    var me = req.cookies.nickname;
    // console.log(me);

    if(me != null){
	var other = req.params.nickname;

    	initChat(me,other);
    	initChat(other,me);

    	res.send(chats[me][other]);
    }else{
	var r = [];
	res.send(r);
    }
})

app.post('/api/chat/:nickname', function (req, res) {
    var me = req.cookies.nickname;
 
    if(me != null){
	var pic = buscarUrl(me);
 
    	var other = req.params.nickname;
    	var msg = req.body.message;

    	initChat(me,other);
    	initChat(other,me);

    	// console.log(req.body);

    	addChat(me,other,msg,pic);
    }

    res.send(true);

    /*
    if (chats[req.params.nickname] == null) {
        chats[req.params.nickname] = [];
    }

    res.send(chats[req.params.nickname]);*/
})

var partys = {};

partys["Ink"] = {
		 esSugerida:true,
		 types:["Bar","Boliche"],
		 imagenDeFondo:"/dist/img/clubs/ink.jpg",
		 imagenBanner:"/dist/img/clubs/ink_BAR.jpg",
		 fotos:["otras imagenes"],
		 descripcion:"descripcion Ink",
		 pos:{lat:-34.5865587,long:-58.4395189},

		 inicio: "2015-11-26T09:30:00",
		 fin:    "2015-11-27T04:30:00",

		 cantidadDeGente:325,
		 userRates:[10,7,9,9,6],
		 comentarios: [ {autor:"Daniel",comentario:"muy buen lugar!"} , 
                   		{autor:"Facundo",comentario:"esto esta que explota!!"} ]
		};

partys["Hiio"] = {
		 esSugerida:false,
		 types:["Bar","Boliche"],

		 imagenDeFondo:"/dist/img/clubs/Hiio.jpg",
		 imagenBanner:"/dist/img/clubs/Hiio_BAR.jpg",
		 fotos:["otras imagenes"],
		 descripcion:"descripcion Hiio",
		 pos:{lat:-34.4961641,long:-58.5549297},

		 inicio: "2015-12-04T13:30:00",
		 fin:    "2015-12-04T21:30:00",

		 cantidadDeGente:202,
		 userRates:[8,9,7,9,6,4,7],
		 comentarios: [ {autor:"Damian",comentario:"festejando en este gran lugar!!"}]
		};

partys["Moscow"] = {
		 esSugerida:false,
		 types:["Bar","Boliche"],

		 imagenDeFondo:"/dist/img/clubs/Moscow.jpg",
		 imagenBanner:"/dist/img/clubs/Moscow_BAR.jpg",
		 fotos:["otras imagenes"],
		 descripcion:"descripcion Moscow",
		 pos:{lat:-34.4513129,long:-58.5561985},

		 inicio: "2015-12-06T06:30:00",
		 fin:    "2015-12-12T21:30:00",

		 cantidadDeGente:235,
		 userRates:[6,8,10,7,4],
		 comentarios: [ {autor:"Guido",comentario:"que buena fiesta !!!"}]
		};

partys["Bosque"] = {
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
		 esSugerida:true,
		 types:["Bar","Boliche"],
		 imagenDeFondo:"/dist/img/clubs/sunset.jpg",
		 imagenBanner:"/dist/img/clubs/sunset_BAR.jpg",
		 fotos:["otras imagenes"],
		 descripcion:"descripcion sunset",
		 pos:{lat:-34.5876237,long:-58.4660913},

		 inicio: "2015-12-04T03:00:00",
		 fin:    "2015-12-06T03:30:00",

		 cantidadDeGente:1632,
		 userRates:[9,10,8,10,7,9],
		 comentarios: [ {autor:"Ezequiel",comentario:"esta genial!"},
				{autor:"Guido",comentario:"festejando como loco!!"},
				{autor:"Nahuel",comentario:"fiestaaaaa!"}]
		};

partys["BsAsEnFoco"] = {
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
		 esSugerida:false,
		 types:["Privada","Otro"],
		 imagenDeFondo:"/dist/img/clubs/Pool-Party.jpg",
		 imagenBanner:"/dist/img/clubs/Pool-Party_BAR.jpg",
		 fotos:["otras imagenes"],
		 descripcion:"descripcion Pool-Party",
		 pos:{lat:-34.5739245,long:-58.3923359},

		 inicio: "2015-12-06T10:30:00",
		 fin:    "2015-12-06T21:30:00",

		 cantidadDeGente:302,
		 userRates:[8,8,8,5,7,10],
		 comentarios: [ {autor:"Nahuel",comentario:"chicas lindas x todos lados !!!"}]
		};


var getFlame = function(party){
	var rates = party.userRates;
	var people = party.cantidadDeGente;

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
}

var biggerAmountOfPeople = function(party1,party2){
	return (party2.cantidadDeGente - party1.cantidadDeGente);
}

var closest = function(party1,party2){
	return (party2.dist - party1.dist);
}

var printDate = function(date){
	console.log(date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

var comesBetween = function(party,start,end){

	var rangeStart = new Date(start.split(".")[0]);
	var rangeEnd = new Date(end.split(".")[0]);

	var partyStart = new Date(party.inicio.split(".")[0]);
	var partyEnd = new Date(party.fin.split(".")[0]);

	var res = ( ((partyStart > rangeStart)&&(partyStart < rangeEnd)) || ((rangeStart > partyStart)&&(rangeStart < partyEnd)) ); 
	return res;
}

var agregar = function(ret,name,party,dist){
	var flame = getFlame(party);

	party.nombre = name;
	party.flama = flame;
	party.dist = dist;
	
	ret.push(party);
}

var enRadianes = function(valor){
	return (Math.PI/180)*valor;
}

var getDistance = function (direccion,party) {
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
	
}

var esDeAlgunoDeLosTipos = function(types,partyTypes){

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

app.get('/api/promotedPartys', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var lat = req.query['lat'];
    var long = req.query['long'];

    var types = req.query['types'].split(",");	

    for (name in partys){
		var party = partys[name];
    	var dist = getDistance([lat,long],party);

		if(party.esSugerida && esDeAlgunoDeLosTipos(types,party.types))
			agregar(ret,name,party,dist);
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/commonPartys', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var lat = req.query['lat'];
    var long = req.query['long'];

    var types = req.query['types'].split(",");	

    for (name in partys){
	var party = partys[name];
    	var dist = getDistance([lat,long],party);

	if(!(party.esSugerida)  && esDeAlgunoDeLosTipos(types,party.types)){
		agregar(ret,name,party,dist);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/promotedPartysByDate', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var start = req.query['start'];
    var end = req.query['end'];

    var lat = req.query['lat'];
    var long = req.query['long'];
	
    for (name in partys){
	var party = partys[name];
		
    	var dist = getDistance([lat,long],party);

	if((party.esSugerida)&&(comesBetween(party,start,end))){
		agregar(ret,name,party,dist);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/commonPartysByDate', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var start = req.query['start'];
    var end = req.query['end'];

    var lat = req.query['lat'];
    var long = req.query['long'];

    for (name in partys){
	var party = partys[name];
    	var dist = getDistance([lat,long],party);

	if((!party.esSugerida)&&(comesBetween(party,start,end))){
		agregar(ret,name,party,dist);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/commonPartysCloseBy', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var lat = req.query['lat'];
    var long = req.query['long'];
    var tolerance = req.query['tol'];

    for (name in partys){
	var party = partys[name];
    	var dist = getDistance([lat,long],party);

	if((!party.esSugerida)&&(dist < tolerance)){
		agregar(ret,name,party,dist);
	}
    }

    ret.sort(closest);
    res.send(ret);
})


app.get('/api/promotedPartysCloseBy', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var lat = req.query['lat'];
    var long = req.query['long'];
    var tolerance = req.query['tol'];

    for (name in partys){
	var party = partys[name];
	var dist = getDistance([lat,long],party);

	if((party.esSugerida)&&(dist < tolerance)){
		agregar(ret,name,party,dist);
	}
    }

    ret.sort(closest);
    res.send(ret);
})

app.post('/api/partys', function (req, res) {
    var msg = req.body.message;
    partys[msg[0]] = msg[1];

    res.send(true);
})


app.get('/api/partyTypes', function (req,res) {   

	//console.log(req);  
    res.send([
		{	icon_uri: "dist/img/tipos_fiesta/afteroffice.jpg",	text: "After office",	code: "after"}
		,{	icon_uri: "dist/img/tipos_fiesta/bar.jpg",		text: "Bar",			code: "bar"}
		,{	icon_uri: "dist/img/tipos_fiesta/boliche.jpg",		text: "Boliche",		code: "disco"}
		,{	icon_uri: "dist/img/tipos_fiesta/disfraces.png",	text: "De disfraces",		code: "costume"}
		,{	icon_uri: "dist/img/tipos_fiesta/privada.jpg",		text: "Privada",		code: "private"}
		,{	icon_uri: "dist/img/tipos_fiesta/generica.jpg",		text: "Otro",			code: "other"}
	]);
});


app.get('/api/musicGenres', function (req,res) {     
    res.send([
		{	icon_uri: "dist/img/tipos_musica/dance.jpg",		text: "Dance",		code: "dance"}
		,{	icon_uri: "dist/img/tipos_musica/ochentoso.jpg",	text: "Ochentosa",	code: "ochentoso"}
		,{	icon_uri: "dist/img/tipos_musica/pop.jpg",		text: "Pop",		code: "pop"}
		,{	icon_uri: "dist/img/tipos_musica/reggae.jpg",		text: "Reggae",		code: "reggae"}
		,{	icon_uri: "dist/img/tipos_musica/rock.jpg",		text: "Rock",		code: "rock"}
		,{	icon_uri: "dist/img/tipos_musica/tropical.jpg",		text: "Tropical",	code: "tropical"}
		,{	icon_uri: "dist/img/tipos_musica/generico.jpg",		text: "Otro",		code: "otro"}
	]);
});


app.post('/api/party', function (req, res) {
	var newParty = {};
	
	newParty.nombre = req.body.name;
	newParty.descripcion = req.body.description;
	newParty.fechaHoraDesde = req.body.from;
	newParty.fechaHoraHasta = req.body.to;
	newParty.types = req.body.types;
	newParty.generos = req.body.musicGenres;
	newParty.location = {
					direccion: req.body.location.name,
					lat: req.body.location.lat, 
					long: req.body.location.long
				};
				
	newParty.userRates = [];
	newParty.comentarios = [];
	
	// console.log(newParty.nombre);
	// console.log(partys[newParty.nombre]);
	
	if(typeof(partys[newParty.nombre]) == 'undefined' ){
		partys[newParty.nombre] = newParty;
		res.send(true);
	}else{
		res.append('Error', 'Fiesta duplicada con nombre:' + newParty.name);
		res.send(false);
	}
	
	/*
	TODO:
	Cambiar los atributos de fechas y horas por separado por atributos fechaHora como fechaHoraDesde y fechaHoraHasta
	Agregar una forma de subir "imagenDeFondo" e "imagenBanner"
	*/
    
});

app.get('/api/allPartys', function (req, res) {
	res.send(partys);
})





/* #publicados */
services = 
	{
		DJ: '339',
		Bebidas: '1349',
		Salon: '819',
		Sonido: '529',
		Animacion: '3219'
	};

app.get('/api/services', function (req, res) {    
	res.send(services);
})

//app.post('/api/services', function (req, res) {
//    console.log(req.body);
//
////    if (chats[req.params.nickname] == null) {
////        chats[req.params.nickname] = [];
////    }
////    console.log(req.body);
////    chats[req.params.nickname].push({
////        avatar_url: '/dist/img/user3-128x128.jpg',
////        nickname: req.cookies.nickname,
////        message: req.body.message,
////        time: new Date().toString("HH:mm"),
////        is_you: true
////    });
//
//    res.send(true);
//    /*
//    if (chats[req.params.nickname] == null) {
//        chats[req.params.nickname] = [];
//    }
//
//    res.send(chats[req.params.nickname]);*/
//})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
