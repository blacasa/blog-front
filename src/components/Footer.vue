<template>
    <div class="bg-info">
      <b-row>
        <b-col cols="8" class="copyright">
          <span>©2020-2021</span>
        </b-col>
        <b-col cols="1" class="follow">
        </b-col>
        <b-col cols="3" class="contact">
          <span><a href="https://twitter.com/13jeuxsolo?ref_src=twsrc%5Etfw" class="link"><b-icon icon="twitter" aria-hidden="true"></b-icon></a></span>
          <span><a href="mailto:contact@13jeuxsolo.fr" class="link"><b-icon icon="envelope" aria-hidden="true"></b-icon></a></span>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import router from '../router/index'

export default {
  name: 'Footer',
  components: {
  },
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    adminMode: Boolean
  },
  methods: {
    logout: function () {
      console.log('logout')
      localStorage.removeItem('user-token')
      this.$emit('update-menu')
      if (this.$route.name !== 'Home') {
        router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style scoped>
.bg-info {
  background-color: #6C028F !important;
  color: rgb(240, 235, 235);
  height: 25px;
  width: 100%;
}
.contact {
  color: rgb(240, 235, 235);
}
.copyright {
  padding-left: 25px;
  text-align: left;
}
.follow {
  color: rgb(240, 235, 235);
}
.link {
  color: rgb(240, 235, 235);
  padding-left: 5px;
  padding-right: 5px;
}
</style>
