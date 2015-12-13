function ServiciosService(store) {
    var __store = store;
    if (typeof (__store.servicios) === 'undefined') {
        __store.servicios = [];
    }

	this.agregarServicio = function (groupCode, groupText, s_name, s_type, s_icon_uri, s_price, s_description, s_detail) {
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
			group = { code: groupCode, text: groupText, highlighted: [], regular: [] };
			if (s_type == 'highlighted') {
				group.highlighted.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
			} else if (s_type == 'regular') {
				group.regular.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
			}
			arr.push(group);
			return { exito: true };
		} else {
			if (!__getServiceByName(s_name)) {
				if (s_type == 'highlighted') {
					group.highlighted.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
					
				} else if (s_type == 'regular') {
					group.regular.push({ name: s_name, icon_uri: s_icon_uri, price: s_price, description: s_description, detail: s_detail });
				}
				arr[groupIndex] = group;
				return { exito: true };
			}
		}
		return { exito: false };
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
				text: arr[i].text,
				highlighted: h,
				regular: r
			});
		}
		return res;
    }

    var __getServiceByName = function (name) {
		var arr = __store.servicios;
		for (var i = 0; i < arr.length; i++) {
			var highlighted = arr[i].highlighted;
			for (var j = 0; j < highlighted.length; j++) {
				if (highlighted[i].name == name) {
					return highlighted[i];
				}
			}
			var regular = arr[i].regular;
			for (var k = 0; k < regular.length; k++) {
				if (regular[i].name == name) {
					return regular[i];
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

    this.rellenar = function () {
		var relleno =
			[ {
				code : "dj",
				text : "DJ",
				highlighted : [
						{
							name : "DJ Candela",
							icon_uri : "dist/img/tipos_servicio/dj/dj_candela.jpg",
							price : "$700/hora",
							description : "Claro que si, soy yo. El que dijo: \"¿Y la moto? ¿Y Candela?\"",
							detail : "Soy DJ Candela, después de pegarme un palo con la moto y quedar torulo, trato de ganar un mango pasando música!!"
						},
						{
							name : "DJ Tiesto",
							icon_uri : "dist/img/tipos_servicio/dj/dj_tiesto.jpg",
							price : "$1500/hora",
							description : "I'm DJ Tiesto. You want a DJ? You want Tiesto.",
							detail : "No need to explain. You wanna party, you want me: Tiesto!"
						}

				],
				regular : [ {
					name : "DJ Piloto",
					icon_uri : "dist/img/tipos_servicio/dj/dj_piloto.jpg",
					price : "$150/hora",
					description : "El DJ morfeta que estaba en lo de Tinelli.",
					detail : "DJ PILOTO!! Soy un chabón que no juna nadie, aparecía en el programa de Tinelli. Ahora laburo para fiestas!! Contratame por favor!!"
				} ]
			}
			,{
				code : "bebidas",
				text : "Bebidas",
				highlighted : [],
				regular : [ {
					name : "Barman & Robin Drinks",
					icon_uri : "dist/img/tipos_servicio/bebidas/bebidas_barman&robin.jpg",
					price : "$400/persona",
					description : "Bebidas de calidad regular.",
					detail : "Servicio de Barman: \"BARMAN Y ROBIN DRINKS\". Te ofrecemos bebidas toda la noche y no tanto dolor de cabeza al otro día."
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
				this.agregarServicio(group.code, group.text, s.name, 'highlighted', s.icon_uri, s.price, s.description, s.detail);	
			}
			
			for (var j = 0; j < regular.length; j++) {
				var s = regular[j];
				this.agregarServicio(group.code, group.text, s.name, 'regular', s.icon_uri, s.price, s.description, s.detail);	
			}
		};
		return true;
    }
}

module.exports = ServiciosService;
