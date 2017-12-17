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
