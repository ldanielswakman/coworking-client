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
