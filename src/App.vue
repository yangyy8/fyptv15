<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
   provide () {
    return {
      reload: this.reload,
     
    }
  },
  data(){
    return{
        isRouterAlive: true,
        Base64: require('js-base64').Base64,
    }
  },
  methods:{
      reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },

}
</script>

<style>
@import "assets/css/common.css";
@import "assets/css/yangyy.css";
@import "assets/font/fonts.css";
</style>
