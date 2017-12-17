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
    axios.get(this.$root.apiURL + 'api/spaces/' + this.id).then(
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
