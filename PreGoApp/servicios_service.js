function ServiciosService(store) {
    var __store = store;
    if (typeof (__store.servicios) === 'undefined') {
        __store.servicios = [];
    }
    
    if (typeof (__store.contrataciones) === 'undefined') {
        __store.contrataciones = [];
    }
    
    if (typeof (__store.serviciosPorUsuario) === 'undefined') {
        __store.serviciosPorUsuario = [];
    }

	this.rellenarDemo = function () {
	}
	
	this.agregarServicio = function (groupCode, s_name, s_type, s_icon_uri, s_price, s_description, s_detail, s_publisher) {
		var group = null;
		var arr = __store.servicios;
		var groupIndex = null;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].code == groupCode) {
				group = arr[i];
				groupIndex = i;
			}
		}
		if (!group) {
			group = { code: groupCode, highlighted: [], regular: [] };
			if (s_type == 'highlighted') {
				group.highlighted.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
			} else if (s_type == 'regular') {
				group.regular.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
			}
			arr.push(group);
			this.addServicioPorUsuario(s_name, s_publisher);
			return { exito: true };
		} else {
			if (!__getServiceByName(s_name)) {
				if (s_type == 'highlighted') {
					group.highlighted.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
					
				} else if (s_type == 'regular') {
					group.regular.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
				}
				arr[groupIndex] = group;
				this.addServicioPorUsuario(s_name, s_publisher);
				return { exito: true };
			}
		}
		return { exito: false };
    }

	this.getServiciosByTypes = function (types) {
		var res = [];
		var aux = __store.servicios;
		var arr = [];
		for(i = 0; i < aux.length; i++) {
			for(j = 0; j < types.length; j++) {
				if(aux[i].code == types[j]) {
					arr.push(aux[i]);
				}
			}
		}
		
		for (var i = 0; i < arr.length; i++) {
			var highlighted = arr[i].highlighted;
			var h = [];
			for (var j = 0; j < highlighted.length; j++) {
				h.push(__copyService(highlighted[j]));
			}
			var regular = arr[i].regular;
			var r = [];
			for (var k = 0; k < regular.length; k++) {
				r.push(__copyService(regular[k]));
			}
			res.push({
				code: arr[i].code,
				text: getTextByCode(arr[i].code),
				highlighted: h,
				regular: r
			});
		}
		return res;
	}
	
    this.getServicios = function () {
		var res = [];
		var arr = __store.servicios;
		for (var i = 0; i < arr.length; i++) {
			var highlighted = arr[i].highlighted;
			var h = [];
			for (var j = 0; j < highlighted.length; j++) {
				h.push(__copyService(highlighted[j]));
			}
			var regular = arr[i].regular;
			var r = [];
			for (var k = 0; k < regular.length; k++) {
				r.push(__copyService(regular[k]));
			}
			res.push({
				code: arr[i].code,
				text: getTextByCode(code),
				highlighted: h,
				regular: r
			});
		}
		return res;
    }
    
    var getTextByCode = function (code) {
    	if(code == 'dj')
    		return 'DJ';
    	if(code == 'bebidas')
    		return 'Bebidas';
    	if(code == 'salon')
    		return 'Salon';
    	if(code == 'sonido')
    		return 'Sonido';
    	if(code == 'animacion')
    		return 'Animacion';
    }

    var __getServiceByName = function (name) {
		var arr = __store.servicios;
		for (var i = 0; i < arr.length; i++) {
			var highlighted = arr[i].highlighted;
			for (var j = 0; j < highlighted.length; j++) {
				if (highlighted[j].name == name) {
					return highlighted[j];
				}
			}
			var regular = arr[i].regular;
			for (var k = 0; k < regular.length; k++) {
				if (regular[k].name == name) {
					return regular[k];
				}
			}	
		}
		return null;
    }

    var __copyService = function (service) {
		return {
			name: service.name,
			icon_uri: service.icon_uri,
			price: service.price,
			description: service.description,
			detail: service.detail
		}
    }

    this.getServiceByName = function (name) {
		var s = __getServiceByName(name);
		if (s) {
			return __copyService(s);
		}
		return null;
    }
    
    this.getServiciosContratadosByUser = function (user) {
		var res = [];
		var contrataciones = __store.contrataciones;
		var arr = [];
		for(i = 0; i < contrataciones.length; i++) {
			if(contrataciones[i].publisher == user) {
				res = contrataciones[i].services;
			}
		}
		return res;
	}

    this.rellenar = function () {
		var relleno =
			[ {
				code : "dj",
				highlighted : [
						{
							name : "DJ Candela",
							publisher : "ezequiel@prego.com",
							icon_uri : "dist/img/tipos_servicio/dj/dj_candela.jpg",
							price : "$700/hora",
							description : "Claro que si, soy yo. El que dijo: \"¿Y la moto? ¿Y Candela?\"",
							detail : "Soy DJ Candela, después de pegarme un palo con la moto y quedar torulo, trato de ganar un mango pasando música!!"
						},
						{
							name : "DJ Tiesto",
							publisher : "damian@prego.com",
							icon_uri : "dist/img/tipos_servicio/dj/dj_tiesto.jpg",
							price : "$1500/hora",
							description : "I'm DJ Tiesto. You want a DJ? You want Tiesto.",
							detail : "No need to explain. You wanna party hard, you wanna lose your mind, " +
									"you wanna hear the music, you wanna feel the magic, you wanna waste your money. " +
									"You want me: Tiesto!"
						}

				],
				regular : [ {
					name : "DJ Piloto",
					publisher : "nahuel@prego.com",
					icon_uri : "dist/img/tipos_servicio/dj/dj_piloto.jpg",
					price : "$150/hora",
					description : "El DJ morfeta que estaba en lo de Tinelli.",
					detail : "DJ PILOTO!! Soy un chabón que no juna nadie, aparecía en el programa de Tinelli. Ahora laburo para fiestas!! Contratame por favor!!"
				} ]
			}
			,{
				code : "bebidas",
				highlighted : [],
				regular : [ {
					name : "Barman & Robin Drinks",
					publisher : "damian@prego.com",
					icon_uri : "dist/img/tipos_servicio/bebidas/bebidas_barman&robin.jpg",
					price : "$400/persona",
					description : "Bebidas de calidad regular.",
					detail : "Servicio de Barman: \"BARMAN Y ROBIN DRINKS\". Te ofrecemos bebidas toda la noche y no tanto dolor de cabeza al otro día."
				},
				{
					name : "Bebidas Morfetti",
					publisher : "facundo@prego.com",
					icon_uri : "dist/img/tipos_servicio/bebidas/bebidas_morfetti.jpg",
					price : "$700/persona",
					description : "Las mejores bebidas servidas por la familia Morfetti.",
					detail : "La familia Morfetti, de larga tradición en el servicio de bebidas, deleitó con sus brebajes" +
							"a grandes personajes de la historia como Napoleón, Beethoven y Mirtha Legrand. Hoy es tu oportunidad de probarlos."
				} ]
			}
			];
		var arr = relleno;
		for (var i = 0; i < arr.length; i++) {
			var group = arr[i];
			var highlighted = group.highlighted;
			var regular = group.regular;
			
			for (var j = 0; j < highlighted.length; j++) {
				var s = highlighted[j];
				this.agregarServicio(group.code, s.name, 'highlighted', s.icon_uri, s.price, s.description, s.detail, s.publisher);	
			}
			
			for (var j = 0; j < regular.length; j++) {
				var s = regular[j];
				this.agregarServicio(group.code, s.name, 'regular', s.icon_uri, s.price, s.description, s.detail, s.publisher);	
			}
		};
		
		this.rellenarContrataciones();		
		return true;
    }
    
    this.findPublisherByServiceName = function (s_serviceName) {
    	var entry = null;
		var arr = __store.serviciosPorUsuario
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].serviceName == s_serviceName) {
				entry = arr[i];
			}
		}
		if(!entry) {
			return [];
		}
		return entry.publisher;
    }
    
    this.addContratacion = function (s_serviceName, buyer) {
    	var s_publisher = this.findPublisherByServiceName(s_serviceName);
		var group = null;
		var arr = __store.contrataciones;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].publisher == s_publisher) {
				group = arr[i];
			}
		}
		if (!group) {
			group = { publisher: s_publisher, services: [] };
			arr.push(group);
		}
		
		/* Quizas al pedo, pero no se si el push hace otra copia distinta */
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].publisher == s_publisher) {
				group = arr[i];
			}
		}
		
		var servicio = null;
		var serviciosOfrecidos = group.services;
		for (var j = 0; j < serviciosOfrecidos.length; j++) {
			if(serviciosOfrecidos[j].serviceName == s_serviceName) {
				servicio = serviciosOfrecidos[j];
			}
		}
		
		if (!servicio) {
			servicio = { serviceName: s_serviceName, buyers: [] };
			serviciosOfrecidos.push(servicio);
		}
		
		/* Quizas al pedo, pero no se si el push hace otra copia distinta */
		for (var i = 0; i < serviciosOfrecidos.length; i++) {
			if(serviciosOfrecidos[i].serviceName == s_serviceName) {
				servicio = serviciosOfrecidos[i];
			}
		}
		
		var comprador = null;
		var compradores = servicio.buyers;
		for (var k = 0; k < compradores.length; k++) {
			if(compradores[k].id == buyer) {
				comprador = compradores[k];
			}
		}
		
		if (!comprador) {
			comprador = { id: buyer };
			compradores.push(comprador);
		}
    }
    
    this.addServicioPorUsuario = function(s_serviceName, s_publisher) {
    	var entry = null;
		var arr = __store.serviciosPorUsuario
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].serviceName == s_serviceName) {
				entry = arr[i];
			}
		}
		if (!entry) {
			entry = { serviceName: s_serviceName, publisher: s_publisher };
			arr.push(entry);
		}
    }
    
    this.rellenarContrataciones = function () {
		var contrataciones = [
		    {
			    publisher : 'damian@prego.com',
			    serviceName : 'Barman & Robin Drinks',
			    buyer : 'nahuel@prego.com'
		    },
		    {
			    publisher : 'damian@prego.com',
			    serviceName : 'DJ Tiesto',
			    buyer : 'daniel@prego.com'
		    },
		    {
			    publisher : 'damian@prego.com',
			    serviceName : 'Barman & Robin Drinks',
			    buyer : 'facundo@prego.com'
		    },
		    {
			    publisher : 'ezequiel@prego.com',
			    serviceName : 'DJ Candela',
			    buyer : 'damian@prego.com'
		    }
		    
		    ];
		
		for (var i = 0; i < contrataciones.length; i++) {
			this.addContratacion(
					contrataciones[i].serviceName,
					contrataciones[i].buyer
					);
		};
		return true;
	}
}

module.exports = ServiciosService;
