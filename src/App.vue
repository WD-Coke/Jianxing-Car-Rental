<template>
  <div id="app">
    <tap-bar></tap-bar>
    <router-view/>
  </div>
</template>

<script>
  import TapBar from "./components/tap-bar/TapBar";
  export default {
    components:{
      TapBar

    }
  }
</script>
<style>
body{
  margin: 0;
  padding: 0;
  /*font-size: 62.5%;*/
}
  a{
    text-decoration: none;
  }
  ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style-type: none;
  }

</style>
