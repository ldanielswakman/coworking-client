Vue.component('space-gallery', {
  props: ['spaceGallery', 'spaceName'],
  components: {
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide
  },
  template: `
    <div class="gallery row row--nopadding card-zigzag--right">

      <router-link to="/" exact class="space-detail__close">&times;</router-link>

      <!-- col-xs-6 col-sm-4 -->
      <carousel>
        <slide v-for="image, key, index in spaceGallery">
          <figure>
            <img v-if="image.large" v-bind:src="image.large" v-bind:alt="spaceName + ' - ' + index" />
            <img v-if="!image.large" v-bind:src="image.medium" v-bind:alt="spaceName + ' - ' + index" />
          </figure>
        </slide>
      </carousel>

    </div>
  `
});
