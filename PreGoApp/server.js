var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()

app.use(express.static('web'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.use(cookieParser());

app.get("/api/login/:nickname", function (req, res) {
    res.cookie("nickname", req.params.nickname);
    res.send(true);
});

app.get("/api/user", function (req, res) {
    res.send(
        [
            {
                avatar_url: '/dist/img/user3-128x128.jpg',
                nickname: 'Damian'
            },
            {
                avatar_url: '/dist/img/user4-128x128.jpg',
                nickname: 'Daniel'
            },
            {
                avatar_url: '/dist/img/user4-128x128.jpg',
                nickname: 'Nahuel'
            },
            {
                avatar_url: '/dist/img/user4-128x128.jpg',
                nickname: 'Ezequiel'
            },
            {
                avatar_url: '/dist/img/user4-128x128.jpg',
                nickname: 'Guido'
            },
            {
                avatar_url: '/dist/img/user4-128x128.jpg',
                nickname: 'Facundo'
            }

        ]
    );
});

var chats = {};
chats["Daniel"] = [
    {
        avatar_url: '/dist/img/user3-128x128.jpg',
        nickname: 'Damian',
        message: 'No estoy en casa ahora, iré en un rato y a las 20 me voy',
        time: '3:15',
        is_you: true
    },
    {
        avatar_url: '/dist/img/user4-128x128.jpg',
        nickname: 'Daniel',
        message: 'Avisame cuando llegues',
        time: '2:15',
        is_you: false
    },
    {
        avatar_url: '/dist/img/user3-128x128.jpg',
        nickname: 'Damian',
        message: 'Llego en 15',
        time: '2:15',
        is_you: true
    }
]

app.get('/api/chat/:nickname', function (req, res) {
    if (chats[req.params.nickname] == null) {
        chats[req.params.nickname] = [];
    }

    res.send(chats[req.params.nickname]);
})

app.post('/api/chat/:nickname', function (req, res) {
    console.log(req.body);

    if (chats[req.params.nickname] == null) {
        chats[req.params.nickname] = [];
    }
    console.log(req.body);
    chats[req.params.nickname].push({
        avatar_url: '/dist/img/user3-128x128.jpg',
        nickname: req.cookies.nickname,
        message: req.body.message,
        time: new Date().toString("HH:mm"),
        is_you: true
    });

    res.send(true);
    /*
    if (chats[req.params.nickname] == null) {
        chats[req.params.nickname] = [];
    }

    res.send(chats[req.params.nickname]);*/
})

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

var partys = {};

partys["Ink"] = {

		 esSugerida:true,
		 types:["Bar","Boliche"],
		 imagenDeFondo:"/dist/img/clubs/ink.jpg",
		 imagenBanner:"/dist/img/clubs/ink_BAR.jpg",
		 fotos:["otras imagenes"],
		 descripcion:"descripcion Ink",
		 pos:{lat:-34.5865587,long:-58.4395189},
		 fecha:{dia:26,mes:11,anio:2015},
		 inicio:{hora:9,minutos:30},
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
		 fecha:{dia:4,mes:12,anio:2015},
		 inicio:{hora:13,minutos:30},
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
		 fecha:{dia:6,mes:12,anio:2015},
		 inicio:{hora:6,minutos:30},
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
		 fecha:{dia:23,mes:12,anio:2015},
		 inicio:{hora:7,minutos:30},
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
		 fecha:{dia:4,mes:12,anio:2015},
		 inicio:{hora:3,minutos:0},
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
		 fecha:{dia:2,mes:12,anio:2015},
		 inicio:{hora:9,minutos:0},
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
		 fecha:{dia:1,mes:12,anio:2015},
		 inicio:{hora:6,minutos:30},
		 cantidadDeGente:302,
		 userRates:[8,8,8,5,7,10],
		 comentarios: [ {autor:"Nahuel",comentario:"chicas lindas x todos lados !!!"}]
		};


var biggerAmountOfPeople = function(party1,party2){
	return (party2.cantidadDeGente - party1.cantidadDeGente);
}

var closest = function(party1,party2){
	return (party2.dist - party1.dist);
}

var isToday = function(party,day,month,year){
	var partyDay = party.fecha.dia;
	var partyMonth = party.fecha.mes;
	var partyYear = party.fecha.anio;

	return ((partyDay == day)&&(partyMonth == month)&&(partyYear == year));
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

app.get('/api/promotedPartysToday', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var day = req.query['day'];
    var month = req.query['month'];
    var year = req.query['year'];

    var lat = req.query['lat'];
    var long = req.query['long'];

    for (name in partys){
	var party = partys[name];
    	var dist = getDistance([lat,long],party);

	if((party.esSugerida)&&(isToday(party,day,month,year))){
		agregar(ret,name,party,dist);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/commonPartysToday', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    var day = req.query['day'];
    var month = req.query['month'];
    var year = req.query['year'];

    var lat = req.query['lat'];
    var long = req.query['long'];

    for (name in partys){
	var party = partys[name];
    	var dist = getDistance([lat,long],party);
	if((!party.esSugerida)&&(isToday(party,day,month,year))){
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
    res.send([
		{	icon_uri: "dist/img/tipos_fiesta/afteroffice.jpg",	text: "After office",	code: "after"}
		,{	icon_uri: "dist/img/tipos_fiesta/bar.jpg",			text: "Bar",			code: "bar"}
		,{	icon_uri: "dist/img/tipos_fiesta/boliche.jpg",		text: "Boliche",		code: "disco"}
		,{	icon_uri: "dist/img/tipos_fiesta/disfraces.png",	text: "De disfraces",		code: "costume"}
		,{	icon_uri: "dist/img/tipos_fiesta/privada.jpg",		text: "Privada",		code: "private"}
		,{	icon_uri: "dist/img/tipos_fiesta/generica.jpg",		text: "Otro",			code: "other"}
	]);
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
