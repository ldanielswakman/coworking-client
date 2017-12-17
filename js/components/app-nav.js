var AppNav = Vue.component('app-nav', {
  props: ['spaces_count', 'indexPage', 'filteredSortedSpaces', 'workspaceFilter'],

  template: `
    <nav>

      <div class="nav__left">

        <router-link to="/" exact class="logo">

          <i v-if="indexPage == false" class="ti ti-angle-left"></i>
          <img src="images/logo.svg" alt="Coworking İstanbul" />

        </router-link>

        <div class="u-relative">
          <object class="button-wrapper" :class="{ isExpanded: btnWrapperExpanded }" @click="btnWrapperExpanded = !btnWrapperExpanded">
            <ul>
              <li><a href="https://goo.gl/forms/x7rcWj1R1OKMKyQF2" target="_blank" class="button button--small button--theme u-mr1">Submit new space</a></li>
            </ul>
            <button class="button button--circle button--lightest" data-role="close">+</button>
          </object>
        </div>

        <a href="javascript:void(0)" v-if="indexPage !== false" class="nav__toggle">
          <i v-if="isExpanded" class="ti ti-arrow-circle-down ti-2x"></i>
          <i v-if="!isExpanded" class="ti ti-arrow-circle-up ti-2x"></i>
        </a>

      </div>

      <h1 v-if="false" class="c-greylight"><span class="badge badge--large bg-themeblue c-white u-mr1">{{ spaces_count }}</span> Spaces</h1>

      <div class="nav__right">
        <small class="c-greylight"><a href="http://www.ldaniel.eu/" target="_blank">{{ colophon }}</a></small>
      </div>
    </nav>
  `,

  data() {
    return {
      colophon: "by ldaniel.eu",
      isExpanded: true,
      btnWrapperExpanded: false
    }
  }
});