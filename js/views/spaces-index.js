var SpacesIndex = Vue.component('spaces-index', {
  template: `
    <div class="main">

      <app-nav
        v-bind:spaces_count="filteredSortedSpaces.length"
        v-bind:filteredSortedSpaces="filteredSortedSpaces"
        v-bind:workspaceFilter="workspaceFilter"
        @click="function(id) { setWorkspaceFilter(id) }">
      </app-nav>

      <splash-dialog></splash-dialog>

      <workspaces-prices
        v-bind:visibleWorkspaces="$root.visibleWorkspaces" 
        v-bind:filteredSortedSpaces="filteredSortedSpaces"
        v-bind:workspaceFilter="workspaceFilter"
        @click="function(id) { setWorkspaceFilter(id) }">
      </workspaces-prices>

      <spaces-map 
        v-bind:spaces="filteredSortedSpaces"
        @hoverover="function(id) { mapHovered = id }"
        @hoverout="mapHovered = ''"
        @click="function(id) { clickOnMap(id) }">
      </spaces-map>

      <div class="spaces-index">

        <div class="spaces-toolbar u-ph1 u-pv3">
          <span class="field-wrap field-wrap--select spaces-toolbar__type">
            <select class="field" v-model="workspaceFilter">
              <option v-for="ws in $root.visibleWorkspaces" :value="ws.id">{{ ws.name }}</option>
            </select>
          </span>
          <span class="field-wrap u-flex-grow1 spaces-toolbar__search">
            <input class="field u-widthfull" type="text" v-model="filterText" placeholder="Filter" />
            <button class="button button--circle button--white field-wrap__appendRight" v-if="filterText.length > 0" @click="filterText = ''"><span class="close">&times;</span></button>
          </span>
          <!--<button class="button button--outline" @click="spaceOrder = 'random'">Shuffle</button>-->
          <button class="button button--outline" v-if="spaceOrder == 'id'" @click="spaceOrder = 'title'"><i class="ti ti-exchange-vertical"></i> name</button>
          <button class="button button--outline" v-if="spaceOrder == 'title'" @click="spaceOrder = 'id'"><i class="ti ti-exchange-vertical"></i> ID</button>
        </div>

        <transition-group tag="div" class="spaces-list row" :class="{ isLoading: (spaces.length == 0) }">
          <space-item
            v-for="space in filteredSortedSpaces"
            v-bind:space="space"
            v-bind:key="space.id"
            v-bind:mapHovered="mapHovered"
            v-bind:visibleTypes="$root.visibleTypes"
            v-bind:workspaceFilter="workspaceFilter"
            class="item">
          </space-item>
        </transition-group>

        <!--<div class="u-aligncenter">
          <button class="button button--outline">Show closed spaces...</button>
        </div>-->
        
        <div id="bottomspacer" style="height: 3.5rem;"></div>

      </div>

    </div>
  `,

  data() {
    return {
      spaces: [],
      // List filter/sort defaults
      spaceOrder: 'id',
      filterText: '',
      workspaceFilter: 0,
      mapHovered: ''
    }
  },

  computed: {
    filteredSortedSpaces() {

      // Filter workspace type
      filteredSpaces = this.spaces;
      activeFilter = this.workspaceFilter;
      if(activeFilter !== 0) {
        filteredSpaces = this.spaces.filter(function(space) {
          $result = false;
          for(i in space.workspaces) {
            if (space.workspaces[i]['ws_type_id'] == activeFilter) {
              $result = true;
            }
          }
          return $result;
        });
      }

      // Filter search
      searchedSpaces = filteredSpaces;
      if(this.filterText.length > 1) {
        var filter = new RegExp(this.filterText, 'i');
        searchedSpaces = filteredSpaces.filter(function(space) {
          if(space.description && space.description.match(filter)) { return true }
          return space.title.match(filter)
        });
      }

      // Sort
      return this.sortBy(searchedSpaces, this.spaceOrder);
    },
  },

  mounted() {
    
    // request space data
    axios.get(this.$root.apiURL + 'api/' + this.$root.location).then(
      response => this.spaces = response.data.response
    );

  },

  methods: {
    sortBy(data, prop) {
      if (prop == 'random') {
        return data.sort(function() { return 0.5 - Math.random() });
      }
      return data.sort(function(a,b) {
        var propA = a[prop].toString().toUpperCase(); // ignore upper and lowercase
        var propB = b[prop].toString().toUpperCase(); // ignore upper and lowercase
        if (propA < propB) { return -1 }
        if (propA > propB) { return 1 }
        return 0;
      });
    },

    clickOnMap(id) {
      router.push({ path: '/' + this.$root.location + '/' + id })
    },

    setWorkspaceFilter(id) {
      if (this.workspaceFilter == id) {
        this.workspaceFilter = 0;
      } else {
        this.workspaceFilter = id;
      }
    }
  }
});
