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
	
};

config = (typeof customConfig !== 'undefined') ? customConfig : defaultConfig;
// config = defaultConfig;

// Vue Use Plugins
Vue.use(VueGoogleMaps, {
	load: {
		key: config.googleMapsAPIKey
	}
});


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


// Mixins (global helpers)
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


var app = new Vue({
	el: '#app',
	router: router,
	data: {
		googleMapsAPIKey: config.googleMapsAPIKey,
		apiURL: config.apiURL,
		location: config.location,
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
			{ id: 2, name: 'Dedicated Desk' },
			{ id: 5, name: 'Private Office' },
			// { id: 6, name: 'Conference Room' },
			// { id: 7, name: 'Meeting Room' },
		],
	},
	created: function () {

		// Google Analytics; do not run when local
		if(window.location.href.indexOf('localhost') == -1) {

			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', config.googleMapsAPIKey, 'auto');
			ga('send', 'pageview');

		}

	}
});

