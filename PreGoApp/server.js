var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()

var PregoServices = require('./prego_services.js');
var pregoServices = new PregoServices();
pregoServices.rellenar();
pregoServices.rellenarDemo();

var usuariosService = pregoServices.getUsuariosService();
var encuentrosService = pregoServices.getEncuentrosService();
var serviciosService = pregoServices.getServiciosService();
var fiestasService =  pregoServices.getFiestasService();


app.use(express.static('web'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())
   
app.use(cookieParser());

app.post("/api/login", function (req, res) {
    var email = req.body.email;
    var pass = req.body.pass;

    if (usuariosService.login(email, pass)) {
        res.cookie("email", email);

	var user = usuariosService.getUsuarioByEmail(email);

        res.cookie("nickname", user.nickname);
        res.cookie("avatar_url", user.avatar_url);

		res.send(true);
    }else{
		res.send(false);	
	}
}); 

app.get("/api/logout", function (req, res) {
    res.clearCookie("email");
    res.clearCookie("nickname");
    res.clearCookie("avatar_url");
    res.send(true);
});


app.get("/api/user", function (req, res) {
    res.send(usuariosService.getUsuarios());
});

app.put("/api/user", function (req, res) {
    res.send(usuariosService.agregarUsuario(req.body.email, req.body.pass, req.body.nickname, req.body.avatar_url).exito);
});


app.get('/api/chat/:email', function (req, res) {
    var myUser = usuariosService.getUsuarioByEmail(req.cookies.email);
    if (myUser != null){ 
	    var msgs = encuentrosService.getChat(myUser.email,req.params.email);
		// console.log(msgs);
	    for(key in msgs){
			var msg = msgs[key];
			if(msg.email == myUser.email){
				msg.is_you = true;
			}else{
				msg.is_you = false;
			}
	    }

		res.send(msgs);
   }else{
		console.log('usuario no encontrado:' + res.cookies.email);
		res.send([]);
   }
})

app.post('/api/chat/:email', function (req, res) {
    var myUser = usuariosService.getUsuarioByEmail(req.cookies.email);
    if (myUser != null){
    	var msgs = encuentrosService.addChat(myUser.email,req.params.email,req.body.message);
    }
    res.send(true);
})

app.get('/api/matches', function (req, res) {
	var matches = encuentrosService.getMatches(req.cookies.email);
	// console.log(matches);
	res.send(matches);
})

app.get('/api/promotedPartys', function (req,res) {
	var lat = req.query['lat'];
    var long = req.query['long'];
    var types = req.query['types'].split(",");	
	
	var ret = fiestasService.getPartysByType(true, lat, long, types);
	res.send(ret);
})

app.get('/api/commonPartys', function (req,res) {
	var lat = req.query['lat'];
    var long = req.query['long'];
    var types = req.query['types'].split(",");	
	
	var ret = fiestasService.getPartysByType(false, lat, long, types);
	res.send(ret);
	
})

app.get('/api/promotedPartysByDate', function (req,res) {
    var start = req.query['start'];
    var end = req.query['end'];

    var lat = req.query['lat'];
    var long = req.query['long']; 
	
	var ret = fiestasService.getPartysByDate(true, lat, long, start,end);
	res.send(ret);
})

app.get('/api/commonPartysByDate', function (req,res) {
    var start = req.query['start'];
    var end = req.query['end'];

    var lat = req.query['lat'];
    var long = req.query['long']; 
	
	var ret = fiestasService.getPartysByDate(false, lat, long, start,end);
	res.send(ret);
})

app.get('/api/commonPartysCloseBy', function (req,res) {
	
	var lat = req.query['lat'];
    var long = req.query['long'];
    var tolerance = req.query['tol'];
	
	
	var ret = fiestasService.getPartysCloseBy(false,lat, long, tolerance)
    res.send(ret);
})


app.get('/api/promotedPartysCloseBy', function (req,res) {
    
    var lat = req.query['lat'];
    var long = req.query['long'];
    var tolerance = req.query['tol'];
    var ret = fiestasService.getPartysCloseBy(true,lat, long, tolerance);

    // console.log(ret);

    res.send(ret);
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
		//,{	icon_uri: "dist/img/tipos_musica/pop.jpg",		text: "Pop",		code: "pop"}
		,{	icon_uri: "dist/img/tipos_musica/reggae.jpg",		text: "Reggae",		code: "reggae"}
		,{	icon_uri: "dist/img/tipos_musica/rock.jpg",		text: "Rock",		code: "rock"}
		,{	icon_uri: "dist/img/tipos_musica/tropical.jpg",		text: "Tropical",	code: "tropical"}
		,{	icon_uri: "dist/img/tipos_musica/generico.jpg",		text: "Otro",		code: "other"}
	]);
});


app.post('/api/party', function (req, res) {
	var newParty = {};
//	console.log(req.body.from);
//	console.log(req.body.to);
	newParty.nombre = req.body.name;
	newParty.descripcion = req.body.description;
	newParty.inicio = req.body.from;
	newParty.fin = req.body.to;
	newParty.types = req.body.types;
	newParty.musicGenres = req.body.musicGenres;
	newParty.direccion = req.body.location.name;
	newParty.pos = {
					lat: req.body.location.lat, 
					long: req.body.location.long
				};
				
	newParty.userRates = [];
	newParty.comentarios = [];
	newParty.esSugerida = req.body.esSugerida;
	var addPartyResult = fiestasService.addParty(newParty);
	res.send(addPartyResult);
    
});


app.put('/api/partyParticipation', function (req, res) {
	if(req.body.partyId && req.cookies.email){
		var partyParticipationResult = fiestasService.participar(req.body.partyId,req.cookies.email);
		res.send(partyParticipationResult);    	
	}else{
		res.send({exito:false, error:'problema con los parametros o desconexion'});
	}
	
});

app.get('/api/party/:id', function (req, res) {
	var resultado = fiestasService.getParty(req.params.id, req.cookies.email);
	if(resultado){
		res.send(resultado);	
	}else{
		res.send({nombre:'No se encontró'});	
	}
})

app.get('/api/partyDistance/:id', function (req, res) {
    var party = fiestasService.getParty(req.params.id);
    if (party) {
        var pos = [parseFloat(req.query.lat), parseFloat(req.query.long)];
        //console.log(pos);
        var distance = fiestasService.getDistance(pos, party);
        res.send("" + distance);
    } else {
        res.send({ nombre: 'No se encontró' });
    }

})


// SERVICIOS

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

app.get('/api/serviceGenres', function (req,res) {     
    res.send([
		 {	icon_uri: "dist/img/tipos_servicio/dj.png",			text: "DJ",			code: "dj"}
		,{	icon_uri: "dist/img/tipos_servicio/drinks.png",		text: "Bebidas",	code: "bebidas"}
		,{	icon_uri: "dist/img/tipos_servicio/salon.png",		text: "Salon",		code: "salon"}
		,{	icon_uri: "dist/img/tipos_servicio/sound.png",		text: "Sonido",		code: "sonido"}
		,{	icon_uri: "dist/img/tipos_servicio/animacion.png",	text: "Animacion",	code: "animacion"}
	]);
})

app.get('/api/serviceSearch', function(req, res) {
	var types = req.query['types'];	
	if (typeof (types) == 'undefined') {
		res.send({
			exito : false,
			error : 'revisar parametros'
		});
	} else {
		serviceList = serviciosService.getServiciosByTypes(types);
		res.send(serviceList);
	}
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})


//ENCUENTROS

app.get("/api/meetingSuggests", function (req, res) {
	//var email = req.body.email || req.query['email'];
    res.send(encuentrosService.sugerir(  req.cookies.email ));
});


app.post("/api/meetingQualify", function (req, res) {
	var userQualifiedEmail = req.body.email;
	
	var like = req.body.like;
	if(typeof(userQualifiedEmail)=='undefined' || typeof(like)=='undefined'){
		//console.log(like);
		res.send({exito:false, error:'revisar parametros'});
	}else{
		if(typeof(req.cookies.email)=='undefined'){
			res.send({exito:false, error:'revisar cookies'});	
		}else{
			res.send(encuentrosService.calificar( req.cookies.email, userQualifiedEmail, like ));		
		}		
	}
    
});

