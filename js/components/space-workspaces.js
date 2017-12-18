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

              <span class="u-text-15x c-themeblue">{{ getPrice(ws.price_month) }}</span>
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
    }

  },
  
}); 
