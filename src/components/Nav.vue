<template lang="html">

  <section class="pt-3 d-flex flex-column flex-md-row justify-content-end align-items-center">
    <ul class="nav justify-content-center flex-nowrap">
      <li class="nav-item">
        <a
          @click.prevent="showAddVideoDialog()"
          class="nav-link btn btn-sm btn-outline-primary"
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          title="Add video">
          <font-awesome-icon icon="plus"/>
        </a>
      </li>
      <li class="nav-item" v-for="(link, index) in links" :key="index">
        <router-link
          :class="['nav-link btn btn-sm btn-outline-primary', { 'active': currentRoute === link.to}]"
          :to="link.to"
          data-toggle="tooltip"
          data-placement="top"
          :title="link.tooltip">
          <font-awesome-icon :icon="link.icon" />
        </router-link>
      </li>
    </ul>
  </section>

</template>

<script lang="js">
import $ from 'jquery'
import router from '../modules/router'
export default {
  name: 'src-components-nav',
  props: [],
  created () {
    this.currentRoute = router.currentRoute.path
  },
  mounted () {
    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    })
  },
  data () {
    return {
      currentRoute: null,
      links: [
        { to: '/', icon: 'home', tooltip: 'Home' },
        { to: '/tags', icon: 'tags', tooltip: 'Tags' }
      ]
    }
  },
  methods: {
    showAddVideoDialog () {
      $('#addVideoDialog').modal('show')
    }
  },
  computed: {},
  components: {},
  watch: {
    '$route' (to, from) {
      this.currentRoute = to.name === 'tag-listing'
        ? '/tags'
        : to.path
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.nav {
  .nav-link {
    color: $primary;
    padding: .25rem .5rem;
    margin-left: .5rem;
    &.active, &:hover {
      color: $white;
    }
    &.btn-outline-secondary {
      color: $secondary;
      &:hover {
        color: $white;
      }
    }
  }
}
</style>
