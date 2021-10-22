<template>
    <div class="section">

        <TheNavbar />

        <h2>Off The Record</h2>
        <img src="https://cdn.fedweb.org/fed-28/2/Linda-Richman-562px.jpg" alt="snl" style="height: 200px">
        <p>"Talk amongst yourselves..."</p>
        <User>
            <template v-slot:user="{ user }">
                <div v-if="user">
                    Welcome <span class="username">{{ user.email }}</span>!
                    <br /><br />
                    <UserProfile :user="user" />
                    <ChatList :uid="user.uid" />
                </div>
                <Login v-else />
            </template>
        </User>

       
    </div>
</template>

<script>
import TheNavbar from './TheNavbar.vue';
import Login from './Login.vue';
import User from './User.vue';
import UserProfile from './UserProfile.vue';
import ChatList from './ChatList.vue';

export default {
    components: {
        TheNavbar,
        Login,
        User,
        UserProfile,
        ChatList
    }
}
</script>

<style> 
.username {
    color: slateblue;
}
</style>
