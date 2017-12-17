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
