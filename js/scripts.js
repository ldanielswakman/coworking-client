var AppNav = Vue.component('app-nav', {
  props: ['spaces_count', 'indexPage', 'filteredSortedSpaces', 'workspaceFilter'],

  template: `
    <nav>

      <div class="nav__left">

        <router-link to="/" exact class="logo">

          <i v-if="indexPage == false" class="ti ti-angle-left"></i>
          <img v-bind:src="'images/logo-' + $root.location.name + '.svg'" alt="Coworking İstanbul" />

        </router-link>

        <div class="u-relative">
          <object class="button-wrapper" :class="{ isExpanded: btnWrapperExpanded }" @click="btnWrapperExpanded = !btnWrapperExpanded">
            <ul>
              <li><a href="https://goo.gl/forms/x7rcWj1R1OKMKyQF2" target="_blank" class="button button--small button--theme u-mr1">Submit new space</a></li>
            </ul>
            <button class="button button--circle button--lightest" data-role="close">+</button>
          </object>
        </div>

        <a href="javascript:void(0)" v-if="indexPage !== false" class="nav__toggle">
          <i v-if="isExpanded" class="ti ti-arrow-circle-down ti-2x"></i>
          <i v-if="!isExpanded" class="ti ti-arrow-circle-up ti-2x"></i>
        </a>

      </div>

      <h1 v-if="false" class="c-greylight"><span class="badge badge--large bg-themeblue c-white u-mr1">{{ spaces_count }}</span> Spaces</h1>

      <div class="nav__right">
        <small class="c-greylight"><a href="http://www.ldaniel.eu/" target="_blank">{{ colophon }}</a></small>
      </div>
    </nav>
  `,

  data() {
    return {
      colophon: "by ldaniel.eu",
      isExpanded: true,
      btnWrapperExpanded: false
    }
  }
});

Vue.component('space-item', {
  props: ['space', 'mapHovered', 'visibleTypes', 'workspaceFilter'],
  template: `
    <div class="item col-xs-12 col-sm-6 col-lg-4 u-mb2">

      <router-link :to="{ path: '/space/' + space.id }" exact>

        <div class="card card--list" v-bind:class="{ isHovered: hoverState }">

          <div class="card__image u-mr2" v-bind:style="{ backgroundImage: 'url(' + space.image.medium + ')' }"></div>

          <div class="card__panel">

            <div class="card__overlay">
              {{ getType(space.type) }}
            </div>

            <h3>{{ space.title }}</h3>

            <p v-if="space.description">
              {{ space.description }}
            </p>

            <div class="u-flex">
              <span class="hasTooltip" v-for="ws in space.workspaces">
                <div class="badge badge--small u-mr1" :class="getBadgeClass(ws.ws_type_id)">
                  <img :src="'images/type_' + ws.ws_type_id + '.svg'" alt="" style="width: 1.5rem; margin-top: 0.25rem;" />
                </div>
                <div class="tooltip">
                  <small class="u-opacity70">{{ ws.type }}</small><br>
                  <small><b>{{ getPrice(ws.price_month) }}</b> per month</small>
                </div>
              </span>
            </div>
          
          </div>

        </div>

      </router-link>

    </div>
  `,

  computed: {
    hoverState: function() {
      return this.mapHovered == this.space.id
    }
  },

  methods: {
    getType(id) {

      output = '';
      for(i in this.visibleTypes) {
        if (this.visibleTypes[i]['id'] == id) {
          output = this.visibleTypes[i]['name'].toUpperCase();
        }
      }
      return output;

    },

    getPrice(price_month) {
      return (price_month > 0) ? price_month + '₺' : '— ₺'
    },

    getBadgeClass(id) {
      return {
        isInactive: (this.workspaceFilter !== 0 && this.workspaceFilter !== parseInt(id))
      }
    }

  }
}); 

Vue.component('space-reviews', {
  props: ['googlePlace', 'googleReviewURL'],
  template: `
    <div id="reviews" class="card__panel card-zigzag--right u-relative u-z1 u-pt10 u-pb6 bg-greylightest" style="margin-top: -2rem;">

      <h4 class="u-mb2">Reviews</h4>

      <div class="row row--nopadding">
        <div v-for="review in googlePlace.reviews" class="col-xs-12 col-sm-6 col-lg-4">

          <div class="u-pr3 u-mb4">

            <i v-for="n in review.rating" class="ti ti-star"></i><i v-for="n in (5 - review.rating)" class="ti ti-star u-opacity30"></i>

            <p>"{{ review.text }}"</p>

            <p class="c-themeblue">{{ review.author_name }}</p>

            <small class="c-greylight">{{ review.relative_time_description }}</small>

          </div>

        </div>
      </div>

      <div class="u-aligncenter">
        <a :href="googleReviewURL"
          v-if="googleReviewURL && googleReviewURL.length > 0"
          class="button button--outline"
          target="_blank">
          <i class="ti ti-comment"></i> Add a review
        </a>
      </div>

    </div>
  `,
  
});

Vue.component('space-workspaces', {
  props: ['space'],
  template: `
    <div class="card__panel card-zigzag--right u-relative u-z1 u-pt10 u-pb6 bg-greylightest" style="margin-top: -2rem;">

      <div class="row">
        <div v-for="ws in space.workspaces" v-if="inArray(ws.ws_type_id, $root.visibleWorkspaces, 'idlkj')" class="col-xs-12 col-sm u-mr2 u-aligncenter">

          <div class="row">
            <div class="col-xs-3 col-sm-12 u-mb4">
              <div class="badge badge--xlarge bg-white">
                <img :src="'images/type_' + ws.ws_type_id + '.svg'" alt="" style="width: 2.5rem; margin-top: 0.25rem;" />
              </div>
            </div>

            <div class="col-xs-9 col-sm-12 u-mb4">
              <h4>{{ ws.type }}</h4>

              <span class="u-text-15x c-themeblue">{{ showPrice(ws.price_month) }}</span>
              <p class="u-mv0 u-opacity50"><small>per month</small></p>
            </div>
          </div>

        </div>
      </div>

    </div>
  `,

  methods: {

    inArray(needle, haystack, prop) {
      for(var i=0; i < haystack.length; i++) {

        value = haystack[i].id;
        if(prop && prop.length > 0) { value = haystack[i][prop] }

        if(haystack[i].id == needle) {
          return true;
        }
      }
      return false;
    },

    showPrice(data) {
      output = '—';
      if(data > 0) {
        output = Math.round(data) + ' ₺';
      }
      return output;
    }

  },
  
}); 

// Custom Google Map Style
// https://mapstyle.withgoogle.com/
var mapStyles = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"},{"saturation":35},{"lightness":40}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"},{"lightness":15},{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"lightness":15},{"weight":1}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#30376b"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#eeeeee"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"},{"lightness":20}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"lightness":19}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#ced1e0"},{"lightness":15}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];


Vue.component('spaces-map', {
  props: ['spaces'],
  template: `
    <div class="spaces-map">
      <gmap-map :center="{lat: defaultLocation.lat, lng: defaultLocation.lng}" :zoom="defaultLocation.zoom" v-bind:options="options">

        <gmap-marker
          v-if="space.location"
          v-for="(space, index) in spaces"
          :key="index"
          :position="{lat:space.location.lat, lng:space.location.lng}"
          :clickable="true"
          @click="$emit('click', space.id)"
          @mouseover="$emit('hoverover', space.id)"
          @mouseout="$emit('hoverout')"
          :icon="{url:'images/location-pin.svg'}"
        ></gmap-marker>

      </gmap-map>
    </div>
  `,

  data() {
    return {
      defaultLocation: {
        "lat": this.$root.location.lat,
        "lng": this.$root.location.lng,
        "zoom": this.$root.location.zoom
      },
      options: {
        styles: mapStyles,
        // individual map control toggle
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
      },
    }
  }
});

Vue.component('splash-dialog', {
  template: `
  <div class="splash-dialog" :class="{ isVisible: isVisible }" @click="isVisible = false">

      <img src="images/logo.svg" alt="Coworking İstanbul" style="height: 3rem;" />

      <h3 class="u-mb3 u-mt3"><blockquote v-html="message"></blockquote></h3>

      <button class="button button--theme" @click="isVisible = false">Show Spaces</button>

    </div>
  `,

  data() {
    return {
      isVisible: true,
      message: "Finding a <b>coworking space</b> in <b>İstanbul</b> doesn't have to be hard...",
    }
  },

  mounted() {
    var self = this;
    setTimeout(function() { self.isVisible = false; }, 3000);
  }

}); 

Vue.component('workspaces-prices', {

  props: ['visibleWorkspaces', 'filteredSortedSpaces', 'workspaceFilter'],

  template: `
    <div class="price-box" v-bind:class="{ isExpanded: isExpanded }">
      <ul>
        <li
          v-for="ws in workspacesWithTotals"
          v-if="ws.name !== 'All'"
          class="u-relative"
          v-bind:class="{ isActive: isActiveWs(ws.id) }"
          @click="$emit('click', ws.id)">

          <img :src="'images/type_' + ws.id + '.svg'" alt="" class="icon" />

          <span class="name" v-html="ws.name"></span>

          <small v-html="ws.averagePrice" class="price-label"></small>
          
        </li>
      </ul>
    </div>
  `,

  data() {
    return {
      isExpanded: true
    }
  },

  computed: {

    workspacesWithTotals() {

      spaces = this.filteredSortedSpaces;
      visibleWorkspaces = this.visibleWorkspaces;

      for(i in visibleWorkspaces) {

        id = visibleWorkspaces[i]['id'];
        time = (id == 1) ? 'day' : 'month';
        visibleWorkspaces[i]['averagePrice'] = this.getAvgPrice(spaces, id, time);
      }

      return visibleWorkspaces;

    },
  },

  methods: {

    isActiveWs(id) {
      if(this.workspaceFilter == 0) { return true }
      return id == this.workspaceFilter
    },

    getAvgPrice(data, ws_type_id, time) {

      n_counted = 0;
      ws_total = 0;
      prefix = '<b>'; // <small class="u-opacity50">Average:</small><br>
      suffix = '</b> ₺<br><span>per ' + time + '</span>';

      // Find where 
      for(i in data) {
        for(j in data[i].workspaces) {

          id = data[i].workspaces[j].ws_type_id;
          price = parseFloat(data[i].workspaces[j]['price_' + time]);

          if(id == ws_type_id &&  price > 0) {
            ws_total += price;
            n_counted++;
          } 

        }
      }

      ws_avg = (n_counted > 0) ? (ws_total/n_counted).toFixed(0) : '—';
      return prefix + ws_avg + suffix;

    }
  },

}); 

var SpacesDetail = Vue.component('spaces-detail', {
  props: ['id'],
  template: `
    <div class="main">

      <app-nav v-bind:indexPage="false"></app-nav>

      <div class="space-detail">

        <div class="gallery row row--nopadding">

          <router-link to="/" exact class="space-detail__close">&times;</router-link>

          <!-- col-xs-6 col-sm-4 -->
          <div v-for="image, key, index in spaceGallery" v-bind:space="space" v-if="key < 1">
            <figure>
              <img v-if="image.URL.large" v-bind:src="image.URL.large" v-bind:alt="space.name + ' - ' + index" />
              <img v-if="!image.URL.large" v-bind:src="image.URL.medium" v-bind:alt="space.name + ' - ' + index" />
            </figure>
          </div>

        </div>

        <div class="card card--comfy">
          <div class="card__panel card-zigzag--left u-relative u-z2">

            <a :href="googlePlace.url" v-if="googlePlace.rating" class="u-floatright u-mt2 u-ph1 bg-greylightest" style="border-radius: 0.5rem;" target="_blank">
              <blockquote class="c-greylight"><i class="ti ti-star u-mr1"></i><span class="c-themeblue" style="font-size: 1.5rem;">{{ googlePlace.rating }}</span>/5.0</blockquote>
            </a>

            <h1 class="u-mv2">{{ space.title }}</h1>

            <i class="ti ti-map-alt ti-15x u-mr1"></i> {{ space.address }}<span v-if="space.address">, </span>{{ space.address2 }}<span v-if="space.address2">, </span>{{ space.neighborhood }}<span v-if="space.neighborhood">, </span>{{ space.city }}

            <p>{{ space.ws_type_id }}</p>

            <p class="u-mr4">{{ space.description }}</p>

            <div class="card__actions u-mt4 u-mb2 u-aligncenter">
              <router-link
                :to="{ hash: 'reviews' }"
                v-if="googleReviewURL && googleReviewURL.length > 0"
                class="button button--outline">
                <i class="ti ti-comment"></i> Reviews
              </router-link>
              <a :href="linkify(space.website)" class="button button--outline" target="_blank">Website <i class="ti ti-share"></i></a>
              <a :href="space.URL" button class="button button--dark" target="_blank">Book a Space</a>
            </div>

          </div>

          <space-workspaces v-bind:space="space"></space-workspaces>

          <div class="card__panel card-zigzag--left u-relative u-z2 u-pb0">

            <h4 class="u-mb2">Amenities</h4>

            <div class="row row--nopadding">
              <div v-for="item in spaceAmenities" class="col-xs-6 col-sm-4 col-lg-3 u-mb4 u-lineheight2">
                {{ item.amenity }}
                <p v-if="item.description" class="u-lineheight2 u-pr2"><small>{{ item.description }}</small></p>
              </div>
            </div>

          </div>

          <space-reviews v-bind:googlePlace="googlePlace" v-bind:googleReviewURL="googleReviewURL"></space-reviews>

        </div>

        <div id="bottomspacer" style="height: 3.5rem;"></div>

      </div>

    </div>
  `,

  data() {
    return {
      space: [],
      googlePlaceID: '',
      googlePlace: '',
    }
  },

  computed: {

    spaceAmenities() {
      var amenities = [];
      space = this.space;
      if(space.amenities && space.amenities.free) {
        amenities = space.amenities.free;
      } else if(space.amenities) {
        amenities = space.amenities;
      }
      return amenities;
    },

    spaceGallery() {
      var gallery = [];
      space = this.space;

      if(space.gallery) {
        gallery = space.gallery;
      } else if(space.image) {
        gallery.push({
          "URL": space.image
        });
      }

      return gallery;
    },

    googleReviewURL() {
      if(this.googlePlaceID && this.googlePlaceID.length > 0) {
        return 'https://search.google.com/local/writereview?placeid=' + this.googlePlaceID;
      }
    }
  },

  mounted() {

    // request space data
    axios.get(this.$root.apiURL + 'api/' + this.$root.location + '/' + this.id).then(
      response => {
        this.space = response.data.response;
        this.googlePlaceID = response.data.response.google_place_id;
        if(this.googlePlaceID && this.googlePlaceID.length > 0) this.getGoogleInfo()
      }
    );

  },

  methods: { 

    linkify(link) {
      if (link && link.indexOf('http') === -1) {
        link = 'http://' + link;
      }
      return link;
    },

    getGoogleInfo() {

      // Google Place details
      baseURL = 'https://maps.googleapis.com/maps/api/place/details/json';
      placeID = this.googlePlaceID;
      APIKey = this.$root.googleMapsAPIKey;
      PlaceDetailsURL = baseURL + '?placeid=' + placeID + '&key=' + APIKey;

      axios.get(this.$root.apiURL + 'api/cors/?url=' + encodeURIComponent(PlaceDetailsURL)).then(
        place_response => this.googlePlace = place_response.data.response.result
      );

    }

  },
});

var SpacesIndex = Vue.component('spaces-index', {
  template: `
    <div class="main">

      <app-nav
        v-bind:spaces_count="filteredSortedSpaces.length"
        v-bind:filteredSortedSpaces="filteredSortedSpaces"
        v-bind:workspaceFilter="workspaceFilter"
        @click="function(id) { setWorkspaceFilter(id) }">
      </app-nav>

      <splash-dialog></splash-dialog>

      <workspaces-prices
        v-bind:visibleWorkspaces="$root.visibleWorkspaces" 
        v-bind:filteredSortedSpaces="filteredSortedSpaces"
        v-bind:workspaceFilter="workspaceFilter"
        @click="function(id) { setWorkspaceFilter(id) }">
      </workspaces-prices>

      <spaces-map 
        v-bind:spaces="filteredSortedSpaces"
        @hoverover="function(id) { mapHovered = id }"
        @hoverout="mapHovered = ''"
        @click="function(id) { clickOnMap(id) }">
      </spaces-map>

      <div class="spaces-index">

        <div class="spaces-toolbar u-ph1 u-pv3">
          <span class="field-wrap field-wrap--select spaces-toolbar__type">
            <select class="field" v-model="workspaceFilter">
              <option v-for="ws in $root.visibleWorkspaces" :value="ws.id">{{ ws.name }}</option>
            </select>
          </span>
          <span class="field-wrap u-flex-grow1 spaces-toolbar__search">
            <input class="field u-widthfull" type="text" v-model="filterText" placeholder="Filter" />
            <button class="button button--circle button--white field-wrap__appendRight" v-if="filterText.length > 0" @click="filterText = ''"><span class="close">&times;</span></button>
          </span>
          <!--<button class="button button--outline" @click="spaceOrder = 'random'">Shuffle</button>-->
          <button class="button button--outline" v-if="spaceOrder == 'id'" @click="spaceOrder = 'title'"><i class="ti ti-exchange-vertical"></i> name</button>
          <button class="button button--outline" v-if="spaceOrder == 'title'" @click="spaceOrder = 'id'"><i class="ti ti-exchange-vertical"></i> ID</button>
        </div>

        <transition-group tag="div" class="spaces-list row" :class="{ isLoading: (spaces.length == 0) }">
          <space-item
            v-for="space in filteredSortedSpaces"
            v-bind:space="space"
            v-bind:key="space.id"
            v-bind:mapHovered="mapHovered"
            v-bind:visibleTypes="$root.visibleTypes"
            v-bind:workspaceFilter="workspaceFilter"
            class="item">
          </space-item>
        </transition-group>

        <!--<div class="u-aligncenter">
          <button class="button button--outline">Show closed spaces...</button>
        </div>-->
        
        <div id="bottomspacer" style="height: 3.5rem;"></div>

      </div>

    </div>
  `,

  data() {
    return {
      spaces: [],
      // List filter/sort defaults
      spaceOrder: 'id',
      filterText: '',
      workspaceFilter: 0,
      mapHovered: ''
    }
  },

  computed: {
    filteredSortedSpaces() {

      // Filter workspace type
      filteredSpaces = this.spaces;
      activeFilter = this.workspaceFilter;
      if(activeFilter !== 0) {
        filteredSpaces = this.spaces.filter(function(space) {
          $result = false;
          for(i in space.workspaces) {
            if (space.workspaces[i]['ws_type_id'] == activeFilter) {
              $result = true;
            }
          }
          return $result;
        });
      }

      // Filter search
      searchedSpaces = filteredSpaces;
      if(this.filterText.length > 1) {
        var filter = new RegExp(this.filterText, 'i');
        searchedSpaces = filteredSpaces.filter(function(space) {
          if(space.description && space.description.match(filter)) { return true }
          return space.title.match(filter)
        });
      }

      // Sort
      return this.sortBy(searchedSpaces, this.spaceOrder);
    },
  },

  mounted() {
    
    // request space data
    axios.get(this.$root.apiURL + 'api/' + this.$root.location.name).then(
      response => this.spaces = response.data.response
    );

  },

  methods: {
    sortBy(data, prop) {
      if (prop == 'random') {
        return data.sort(function() { return 0.5 - Math.random() });
      }
      return data.sort(function(a,b) {
        var propA = a[prop].toString().toUpperCase(); // ignore upper and lowercase
        var propB = b[prop].toString().toUpperCase(); // ignore upper and lowercase
        if (propA < propB) { return -1 }
        if (propA > propB) { return 1 }
        return 0;
      });
    },

    clickOnMap(id) {
      router.push({ path: '/' + this.$root.location.name + '/' + id })
    },

    setWorkspaceFilter(id) {
      if (this.workspaceFilter == id) {
        this.workspaceFilter = 0;
      } else {
        this.workspaceFilter = id;
      }
    }
  }
});

// Config default
var defaultConfig = {

	'env': 'production',

	'apiURL': 'https://coworking.ldaniel.eu/',

	'location': {
		name: 'berlin',
		lat: 52.5172462,
		lng: 13.4193396,
		zoom: 11
	},

	'googleMapsAPIKey': 'AIzaSyBMFotJFUPtOhGds8oklETkMO9knxQvnB0',
	
};

config = (typeof customConfig !== 'undefined') ? customConfig : defaultConfig;
config = defaultConfig;

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
});

