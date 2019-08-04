Vue.component('space-gallery', {
  props: ['spaceGallery', 'spaceName'],
  components: {
    'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide
  },
  // template: `
  //   <div class="gallery row row--nopadding card-zigzag--right">

  //     <router-link to="/" exact class="space-detail__close">&times;</router-link>

  //     <!-- col-xs-6 col-sm-4 -->
  //     <carousel class="carousel" :perPage="1">
  //       <slide v-for="image, key, index in spaceGallery" :key="index">
  //         <img v-if="image.large" v-bind:src="image.large" v-bind:alt="spaceName + ' - ' + index" />
  //         <img v-if="!image.large" v-bind:src="image.medium" v-bind:alt="spaceName + ' - ' + index" />
  //       </slide>
  //     </carousel>

  //   </div>
  // `
  template: `
    <div class="gallery row row--nopadding card-zigzag--right">

      <router-link to="/" exact class="space-detail__close">&times;</router-link>

      <div class="images" style="display: flex; height: 20rem; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <figure v-for="image, key, index in spaceGallery" :key="index" style="height: 100%; width: auto; flex: 0 0 auto;">
          <img v-if="image.large" v-bind:src="image.large" v-bind:alt="spaceName + ' - ' + index" style="height: 100%; width: auto;" />
          <img v-if="!image.large" v-bind:src="image.medium" v-bind:alt="spaceName + ' - ' + index" style="height: 100%; width: auto;" />
        </figure>
      </div>

    </div>
  `
});
