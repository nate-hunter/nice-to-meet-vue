<template>
    <div class="section">
        <h2>Off The Record</h2>
        <p>Talk amongst yourselves...</p>

        <User>
            <template v-slot:user="{ user }">
                <div v-if="user">
                    <UserProfile :user="user" />
                    <ChatList :uid="user.uid" />
                </div>
                <Login v-else />
            </template>
        </User>

       
    </div>
</template>

<script>
import Login from './Login.vue';
import User from './User.vue';
import UserProfile from './UserProfile.vue';
import ChatList from './ChatList.vue';

export default {
    components: {
        Login,
        User,
        UserProfile,
        ChatList
    }
}
</script>
