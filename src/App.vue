<template>
  <div id="app">
    <header>
      <h2>Off The Record</h2>
        <p>Talk amongst yourselves...</p>

        <img src="https://cdn.fedweb.org/fed-28/2/Linda-Richman-562px.jpg" alt="snl" style="height: 200px">
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import {auth} from './firebase';


console.log('auth:', auth)

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

</style>
