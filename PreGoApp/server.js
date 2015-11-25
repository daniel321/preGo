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

var partys = {};

/*esSugerida, fondo, barra, [imagen], descripcion, direccion, fecha, #gente, [rate], [[autor,comentario]] */
partys["Ink"] = [
		 true,
		 "/dist/img/clubs/ink.jpg",
		 "/dist/img/clubs/ink_BAR.jpg",
		 [["otras imagenes"]],
		 "descripcion Ink",
		 "direccion Ink",
		 "fecha Ink",
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
		 "direccion Hiio",
		 "fecha Hiio",
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
		 "direccion Moscow",
		 "fecha Moscow",
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
		 "direccion bosque",
		 "fecha bosque",
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
		 "direccion sunset",
		 "fecha sunset",
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
		 "direccion Buenos-Aires-En-Foco",
		 "fecha Buenos-Aires-En-Foco",
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
		 "direccion Pool-Party",
		 "fecha Pool-Party",
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
		var flame = getFlame(party[8],party[7]);
		ret.push([name,party,flame]);
	}
    }

    res.send(ret);
})

app.get('/api/commonPartys', function (req,res) {
    var ret = [];
    var size = Object.keys(partys).length;

    for (name in partys){
	var party = partys[name];
	if(party[0] == false){
		var flame = getFlame(party[8],party[7]);
		ret.push([name,party,flame]);
	}
    }

    res.send(ret);
})

app.get('/api/promotedPartysCloseBy', function (req,res) {
    var ret = [];
  
    // TODO

    res.send(ret);
})

app.get('/api/commonPartysCloseBy', function (req,res) {
    var ret = [];
  
    // TODO

    res.send(ret);

})

app.get('/api/promotedPartysToday', function (req,res) {
    var ret = [];
  
    // TODO

    res.send(ret);
})

app.get('/api/commonPartysToday', function (req,res) {
    var ret = [];
  
    // TODO

    res.send(ret);
})

app.post('/api/partys', function (req, res) {
    var msg = req.body.message;
    partys[msg[0]] = msg[1];

    res.send(true);
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
