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
        "lat": 41.06,
        "lng": 29.0193357,
        "zoom": 10
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
