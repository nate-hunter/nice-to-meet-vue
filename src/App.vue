<template>
  <div id="app">
    <!-- <TheNavbar /> -->
      <!-- <header>
        <div class="header-container">
            <span class="logo">Off The Record</span>
            <span class="user-logged-in">User Name</span>
        </div>
      </header> -->

    <router-view></router-view>
  </div>
</template>

<script>
import {auth} from './firebase';

console.log('auth:', auth)

export default {
  name: 'App',

}
</script>

<style>
/* .header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:slateblue;
  height: 55px;
}

.logo {
  margin-left: 10px;
  font-size: 2rem;
  font-weight: bolder;
  color: white;
}

.user-logged-in {
  color: #f99595;
  font-weight: bolder;
  margin-right: 10px;
} */
</style>
