app.controller('partyCreateController', function ($scope ) {
	
	/*$scope.modernBrowsers  = [
		{	icon: "<img src='dist/img/tipos_fiesta/afteroffice.jpg'></img>",	name: "After Office",	maker: "",	ticked: true	}
		,{	icon: "<img src='dist/img/tipos_fiesta/bar.jpg'></img>",	name: "Bar",	maker: "",	ticked: true	}
		,{	icon: "<img src='dist/img/tipos_fiesta/boliche.jpg'></img>",	name: "Boliche",	maker: "",	ticked: true	}
		,{	icon: "<img src='dist/img/tipos_fiesta/disfraces.png'></img>",	name: "Disfraces",	maker: "",	ticked: true	}
		,{	icon: "<img src='dist/img/tipos_fiesta/privada.jpg'></img>",	name: "Privada",	maker: "",	ticked: true	}
		,{	icon: "<img src='dist/img/tipos_fiesta/generica.jpg'></img>",	name: "Otro",	maker: "",	ticked: true	}
		
		{ icon: "<img src=[..]/opera.png.. />",               name: "Opera",              maker: "(Opera Software)",        ticked: true  },
		{ icon: "<img src=[..]/internet_explorer.png.. />",   name: "Internet Explorer",  maker: "(Microsoft)",             ticked: false },
		{ icon: "<img src=[..]/firefox-icon.png.. />",        name: "Firefox",            maker: "(Mozilla Foundation)",    ticked: true  },
		{ icon: "<img src=[..]/safari_browser.png.. />",      name: "Safari",             maker: "(Apple)",                 ticked: false },
		{ icon: "<img src=[..]/chrome.png.. />",              name: "Chrome",             maker: "(Google)",                ticked: true  }
	];
	*/
	
	
	$scope.partyTypes = [
		{	icon_uri: "dist/img/tipos_fiesta/afteroffice.jpg",	name: "After office",	code: "after",		selected: false, hover:false	}
		,{	icon_uri: "dist/img/tipos_fiesta/bar.jpg",			name: "Bar",			code: "bar",		selected: false, hover:false	}
		,{	icon_uri: "dist/img/tipos_fiesta/boliche.jpg",		name: "Boliche",		code: "disco",		selected: true,  hover:false	}
		,{	icon_uri: "dist/img/tipos_fiesta/disfraces.png",	name: "Disfraces",		code: "costume",	selected: false, hover:false	}
		,{	icon_uri: "dist/img/tipos_fiesta/privada.jpg",		name: "Privada",		code: "private",	selected: true,  hover:false	}
		,{	icon_uri: "dist/img/tipos_fiesta/generica.jpg",		name: "Otro",			code: "other",		selected: false, hover:false	}
	];
	
	
	
});
