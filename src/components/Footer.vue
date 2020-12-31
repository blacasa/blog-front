<template>
    <div class="bg-info">
      ©2020-2021
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
</style>
