var SpacesDetail = Vue.component('spaces-detail', {
  props: ['id'],
  template: `
    <div class="main">

      <app-nav :indexPage="false"></app-nav>

      <div class="space-detail">

        <space-gallery :spaceGallery="spaceGallery" :spaceName="space.name"></space-gallery>

        <div class="card card--comfy">
          <div class="card__panel card-zigzag--left u-relative u-z2">

            <router-link
              :to="{ hash: 'reviews' }"
              v-if="googlePlace.rating"
              class="pill u-floatright u-mt2">

              <blockquote class="c-greylight">
                <i class="ti ti-star u-mr1"></i>
                <span class="c-themeblue" style="font-size: 1.5rem;">{{ googlePlace.rating }}</span>/5.0
              </blockquote>
            </router-link>

            <h1 class="u-mv2">{{ space.title }}</h1>

            <a :href="mapURL" target="_blank">
              <i class="ti ti-map-alt ti-15x u-mr1"></i> {{ space.address }}<span v-if="space.address2">, </span>{{ space.address2 }}<span v-if="space.neighborhood">, </span>{{ space.neighborhood }}<span v-if="space.city">, </span>{{ space.city }}
            </a>

            <p class="u-mr4">{{ space.description }}</p>

            <space-openinghours :googlePlace="googlePlace"></space-openinghours>

            <p v-if="space.free_trial_day && space.free_trial_day == '1'" class="u-mr4 u-mt2 u-opacity50">Has free trial day</p>            

            <div class="card__actions u-mt4 u-mb2 u-aligncenter">
              <router-link
                :to="{ hash: 'reviews' }"
                v-if="googleReviewURL && googleReviewURL.length > 0"
                class="button button--outline">
                <i class="ti ti-comment"></i> Reviews
              </router-link>
              <a :href="linkify(space.website)" class="button button--outline" target="_blank">Website <i class="ti ti-share"></i></a>
              <a :href="linkify(space.book_url)" button class="button button--dark" target="_blank">Book a Space</a>
            </div>

          </div>

          <space-workspaces :space="space"></space-workspaces>

          <div class="card__panel card-zigzag--left u-relative u-z2 u-pb0">

            <h4 class="u-mb2">Amenities</h4>

            <div class="row row--nopadding">
              <div v-for="item in spaceAmenities" class="col-xs-6 col-sm-4 col-lg-3 u-mb4 u-lineheight2">
                {{ item.amenity }}
                <p class="u-lineheight2 u-pr2">
                  <small v-if="item.type =='paid'">Paid</small><span v-if="item.type =='paid' && item.description">, </span><small v-if="item.description">{{ item.description }}</small>
                </p>
              </div>
            </div>

          </div>

          <space-reviews :googlePlace="googlePlace" :googleReviewURL="googleReviewURL"></space-reviews>

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
        gallery.push(space.image);
      }

      return gallery;
    },

    googleReviewURL() {
      if(this.googlePlaceID && this.googlePlaceID.length > 0) {
        return 'https://search.google.com/local/writereview?placeid=' + this.googlePlaceID;
      }
    },

    mapURL() {
      mapurl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(space.address);
      if(this.googlePlaceID) {
        mapurl = 'http://maps.google.com/maps/place?cid=' + this.googlePlaceID;
      }
      return mapurl;
    },
  },

  mounted() {

    // request space data
    axios.get(this.$root.apiURL + 'api/' + this.$root.location.name + '/' + this.id + '.json').then(
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

      axios.get('https://cors-anywhere.herokuapp.com/' + PlaceDetailsURL).then(
        place_response => this.googlePlace = place_response.data.result
      );

    },

  },
});
