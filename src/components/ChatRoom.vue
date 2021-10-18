<template>
    <main class="section">
        <h3>Welcome to ChatRoom: {{ chatId }}</h3>

        <User #user='{ user }'>
            <div v-if='user'>
                <ul>
                    <li v-for="message of messages" :key="message.id">
                        <ChatMessage 
                            :message="message"
                            :owner="user.uid === message.sender"
                        />
                    </li>
                </ul>

                <input v-model="newMessageText" class="input">

                <button 
                    class="button is-success"
                    type="text"
                    :disabled="!newMessageText || loading"
                    @click="addMessage(user.uid)"
                >
                    Send
                </button>
            </div>
            <login v-else />
        </User>

        <router-link to="/">Back</router-link>
    </main>
</template>

<script>
import { db } from '../firebase';
import User from './User.vue';
import Login from './Login.vue';
import ChatMessage from './ChatMessage.vue';

export default {
    components: {
        User,
        Login,
        ChatMessage
    },
    data() {
        return {
            newMessageText: '',
            loading: false,
            messages: [],
        }
    },
    computed: {
        chatId() {
            return this.$route.params.id;
        },
        messagesCollection() {
            return db.doc(`chats/${this.chatId}`).collection('messages');
        },
    },
    firestore() {
        return {
            messages: this.messagesCollection.orderBy('createdAt').limitToLast(10)
        };
    },
    methods: {
        async addMessage(uid) {
            this.loading = true;

            const { id: messageId } = this.messagesCollection.doc();
            console.log('message id?', messageId)

            await this.messagesCollection.doc(messageId).set({
                text: this.newMessageText,
                sender: uid,
                createdAt: Date.now(),
            });
        }
    },
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-width: 500px;
    background: whitesmoke;
    padding: 10px;
    border-radius: 0;
}

li {
    display: flex;
}
</style>
