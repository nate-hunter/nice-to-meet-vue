<template>
    <div class="header-container">
        <span class="logo">Off The Record</span>
        <span class="user-logged-in">User Name/Avatar To Go Here</span>
    </div>
</template>

<style scoped>
.header-container {
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
}
</style>