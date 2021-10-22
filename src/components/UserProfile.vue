<template>
    <div>
        Logged in as <span class="username">'{{ user.uid }}'</span><br/><br />
        <button @click="auth.signOut()" class="button" >Sign Out</button>
    </div>
</template>

<script>
import { auth } from '../firebase';

export default {
    data() {
        return {
            auth,
        }
    },
    props: ['user']  
    // How is it able to use 'user' as a prop? 
    // Is there a parent passing it down? 
    // What's the role of the comp. api in delivering it here?
}
</script>
