// Config default
var defaultConfig = {

	'env': 'production',

	// API Base URL
	'apiURL': 'https://coworking.ldaniel.eu/',

	// Base location (map)
	'location': {
		'name': 'berlin',
		'displayName': 'Berlin',
		'lat': 52.5172462,
		'lng': 13.4193396,
		'zoom': 11
	},

	// Currency
	'currency': {
		'symbol': '€',
		'after': false,
	},

	// Google Maps API key
	'googleMapsAPIKey': 'AIzaSyBMFotJFUPtOhGds8oklETkMO9knxQvnB0',

	// Google Analytics Property ID
	'googleAnalyticsID': 'UA-9833982-34',

	// New Submission Form URL
	'submitform_url': 'https://goo.gl/forms/lMnITffrCzHZCJRJ2',
	
};

config = (typeof customConfig !== 'undefined') ? customConfig : defaultConfig;
// config = defaultConfig;

// if localhost, override API URL
if(window.location.href.indexOf('localhost') !== -1) {
	config.apiURL = 'http://localhost/coworking-api/';
}






// Vue Use Plugins
Vue.use(VueGoogleMaps, {
	load: {
		key: config.googleMapsAPIKey
	}
});
Vue.use(VueCarousel);






// Vue Router
const routes = [
	{ path: '/', component: SpacesIndex },
	{ path: '/space/:id', component: SpacesDetail, props: true },
]

const scrollBehavior = function (to, from, savedPosition) {
	if (to.hash) {
		return {
			selector: to.hash
			// , offset: { x: 0, y: 10 }
		}
	}
	if (savedPosition) {
		return savedPosition
	} else {
		return { x: 0, y: 0 }
	}
}

const router = new VueRouter({
	routes,
	scrollBehavior,
	linkActiveClass: 'isActive',
})






// Vue Mixins (global helpers)
Vue.mixin({
  methods: {

	getPrice(inputPrice) {

	  // set symbol before or after
	  prefix = (config.currency.after == true) ? '' : config.currency.symbol + ' ';
	  postfix = (config.currency.after == true) ? ' ' + config.currency.symbol : '';

	  // set price value
	  price = (inputPrice > 0) ? inputPrice : '—';

	  // output string
	  return prefix + price + postfix;
	  
	}
  }
})





// Vue Instance
var app = new Vue({
	el: '#app',
	router: router,
	data: {
		googleMapsAPIKey: config.googleMapsAPIKey,
		apiURL: config.apiURL,
		location: config.location,
		submitform_url: config.submitform_url,
		visibleTypes: [
			{ id: 0, name: 'All' },
			{ id: 1, name: 'Business Center' },
			{ id: 2, name: 'Corporate Office' },
			{ id: 3, name: 'Coworking Space' },
			{ id: 5, name: 'Startup Office' },
		],
		visibleWorkspaces: [
			{ id: 0, name: 'All' },
			{ id: 1, name: 'Hot Desk' },
			{ id: 3, name: 'Flex Desk' },
			{ id: 2, name: 'Dedicated Desk' },
			{ id: 5, name: 'Private Office' },
			// { id: 6, name: 'Conference Room' },
			// { id: 7, name: 'Meeting Room' },
		],
	},
	created: function () {

		// Google Analytics; do not run when local
		if(window.location.href.indexOf('localhost') == -1) {

			// Calling Google Tag Manager Script
			var e = document.createElement("script");
			e.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.googleAnalyticsID;
			document.getElementsByTagName("head")[0].appendChild(e);

			// Activate google tag
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', config.googleAnalyticsID);

		}

	}
});

