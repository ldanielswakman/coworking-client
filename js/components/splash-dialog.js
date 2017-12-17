Vue.component('splash-dialog', {
  template: `
  <div class="splash-dialog" :class="{ isVisible: isVisible }" @click="isVisible = false">

      <img v-bind:src="'images/logo-' + $root.location.name + '.svg'" v-bind:alt="'Coworking ' + $root.location.displayName" style="height: 3rem;" />

      <h3 class="u-mb3 u-mt3"><blockquote v-html="message"></blockquote></h3>

      <button class="button button--theme" @click="isVisible = false">Show Spaces</button>

    </div>
  `,

  data() {
    return {
      isVisible: true
    }
  },

  computed: {
    message() {
      return "Finding a <b>coworking space</b> in " + this.$root.location.displayName + " doesn't have to be hard..."
    }
  },

  mounted() {
    var self = this;
    setTimeout(function() { self.isVisible = false; }, 3000);
  }

}); 
