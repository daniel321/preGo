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

var getFlame = function(rates,people){
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
	return (party2[1][8] - party1[1][8]);
}

var partys = {};

/*esSugerida, fondo, barra, [imagen], descripcion, [latitud,longitud], [dia,mes,año], [hora,min], #gente, [rate], [[autor,comentario]] */
partys["Ink"] = [
		 true,
		 "/dist/img/clubs/ink.jpg",
		 "/dist/img/clubs/ink_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion Ink",
		 [-34.5865587,-58.4395189],
		 [26,11,2015],
		 [9,30],
		 325,
		 [10,7,9,9,6],
		 [ ["Daniel","muy buen lugar!"] , 
                   ["Facundo","esto esta que explota!!"] ]
		];

partys["Hiio"] = [
		 false,
		 "/dist/img/clubs/Hiio.jpg",
		 "/dist/img/clubs/Hiio_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion Hiio",
		 [-34.4961641,-58.5549297],
		 [26,11,2015],
		 [13,30],
		 202,
		 [8,9,7,9,6,4,7],
		 [ ["Damian","festejando en este gran lugar!!"]]
		];

partys["Moscow"] = [
		 false,
		 "/dist/img/clubs/Moscow.jpg",
		 "/dist/img/clubs/Moscow_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion Moscow",
		 [-34.4513129,-58.5561985],
		 [28,11,2015],
		 [6,30],
		 235,
		 [6,8,10,7,4],
		 [ ["Guido","que buena fiesta !!!"] ]
		];

partys["Bosque"] = [
		 false,
		 "/dist/img/clubs/bosque.jpg",
		 "/dist/img/clubs/bosque_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion bosque",
		 [-34.8304372,-58.5712683],
		 [23,11,2015],
		 [7,30],
		 135,
		 [8,10,7],
		 [ ["Ezequiel","aca hay de todo !!!"] ]
		];

partys["Sunset"] = [
		 true,
		 "/dist/img/clubs/sunset.jpg",
		 "/dist/img/clubs/sunset_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion sunset",
		 [-34.5876237,-58.4660913],
		 [26,11,2015],
		 [4,30],
		 632,
		 [9,10,8,10,7,9],
		 [ ["Ezequiel","esta genial!"],
		   ["Guido","festejando como loco!!"],
		   ["Nahuel","fiestaaaaa!"]
		 ]
		];

partys["BsAsEnFoco"] = [
		 false,
		 "/dist/img/clubs/Buenos-Aires-En-Foco.jpg",
		 "/dist/img/clubs/Buenos-Aires-En-Foco_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion Buenos-Aires-En-Foco",
		 [-34.6324812,-58.4184982],
		 [2,12,2015],
		 [9,00],
		 35,
		 [6],
		 [ ["Facundo","muy bueno, pero no hay nadie..."] ]
		];

partys["PoolParty"] = [
		 false,
		 "/dist/img/clubs/Pool-Party.jpg",
		 "/dist/img/clubs/Pool-Party_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion Pool-Party",
		 [-34.5739245,-58.3923359],
		 [1,12,2015],
		 [15,30],
		 302,
		 [8,8,8,5,7,10],
		 [ ["Nahuel","chicas lindas x todos lados !!!"] ]
		];


app.get('/api/promotedPartys', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    for (name in partys){
	var party = partys[name];
	if(party[0] == true){
		var flame = getFlame(party[9],party[8]);
		ret.push([name,party,flame]);
	}
    }

 //   ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/promotedPartysToday', function (req,res) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    var ret = [];
    var size = Object.keys(partys).length;

    for (name in partys){
	var party = partys[name];
	var partyDate = party[6];

	if((party[0] == true) && (partyDate[0] == day) && (partyDate[1] == month) && (partyDate[2] == year)){
		var flame = getFlame(party[9],party[8]);
		ret.push([name,party,flame]);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})


app.get('/api/commonPartys', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    for (name in partys){
	var party = partys[name];
	if(party[0] == false){
		var flame = getFlame(party[9],party[8]);
		ret.push([name,party,flame]);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.get('/api/commonPartysToday', function (req,res) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    var ret = [];
    var size = Object.keys(partys).length;

    for (name in partys){
	var party = partys[name];
	var partyDate = party[6];
	if((party[0] == false)&&(partyDate[0] == day)&&(partyDate[1] == month)&&(partyDate[2] == year)){
		var flame = getFlame(party[9],party[8]);
		ret.push([name,party,flame]);
	}
    }

    ret.sort(biggerAmountOfPeople);
    res.send(ret);
})

app.post('/api/partys', function (req, res) {
    var msg = req.body.message;
    partys[msg[0]] = msg[1];

    res.send(true);
})

//var services = {};

/* #publicados */
services = 
	{
		DJ: '339',
		Bebidas: '1349',
		Salon: '819',
		Sonido: '529',
		Animacion: '3219'
	};
//services["Bebidas"] = [ 1349 ];
//services["Salon"] = [ 819 ];
//services["Sonido"] = [ 529 ];
//services["Animacion"] = [ 3219 ];

app.get('/api/services', function (req, res) {    
//	res.send(services);
//	res.send("Sarlanga");
	
	res.send(services);
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
