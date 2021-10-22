<template>
    <main class="section">
        <h3>Welcome to ChatRoom: <span class="chatroom-name">{{ chatId }}</span></h3>

        <p>Enter a text message or record an audio message below.</p>

        <User>
            <template v-slot:user="{ user }">
                <div v-if='user'>
                    <ul>
                        <li v-for="message of messages" :key="message.id">
                            <ChatMessage 
                                :message="message"
                                :owner="user.uid === message.sender"
                            />
                        </li>
                    </ul>

                    <input v-model="newMessageText" class="input" placeholder="Enter Msg Text...">

                    <!-- <h5>Recorded Audio</h5> -->
                    <br />
                    <br />
                    <button v-if="!recorder" @click="record()" class="button is-info">Record Voice</button>
                    <button v-else @click="stop()" class="button is-danger">Stop</button>
                    <br />
                    <audio v-if="newAudio" :src="newAudioURL" controls></audio>
                    <br />

                    <button 
                        class="button is-success"
                        type="text"
                        :disabled="!newMessageText || loading"
                        @click="addMessage(user.uid)"
                    >
                        Send
                    </button>
                </div>
                <Login v-else />
            </template>
        </User>
        <br />
        <router-link to="/">Back</router-link>
    </main>
</template>

<script>
import { db, storage } from '../firebase';
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
            newAudio: null,
            recorder: null,
        }
    },
    computed: {
        chatId() {
            return this.$route.params.id;
        },
        messagesCollection() {
            return db.doc(`chats/${this.chatId}`).collection('messages');
        },
        newAudioURL() {
            return URL.createObjectURL(this.newAudio);
        }
    },
    firestore() {
        return {
            messages: this.messagesCollection.orderBy('createdAt').limitToLast(10)
        };
    },
    methods: {
        async addMessage(uid) {
            this.loading = true;

            let audioURL = null;

            const { id: messageId } = this.messagesCollection.doc();

            if (this.newAudio) {
                const storageRef = storage
                    .ref('chats')
                    .child(this.chatId)
                    .child(`${messageId}.wav`);
                
                await storageRef.put(this.newAudio);
                audioURL = await storageRef.getDownloadURL();

            }

            await this.messagesCollection.doc(messageId).set({
                text: this.newMessageText,
                sender: uid,
                createdAt: Date.now(),
                audioURL
            });

            this.loading = false;
            this.newMessageText = '';
            this.newAudio = null;
        },
        async record() {
            this.newAdio = null;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            
            const options = { mimeType: "audio/webm" };
            const recordedChunks = [];
            this.recorder = new MediaRecorder(stream, options);

            this.recorder.addEventListener("dataavailable", e => {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            });

            this.recorder.addEventListener("stop", () => {
                this.newAudio = new Blob(recordedChunks);
                console.log(this.newAudio);
            });

            this.recorder.start();
        },
        async stop() {
            this.recorder.stop();
            this.recorder = null;
        }
    },
}
</script>

<style scoped>
.chatroom-name {
    color: slateblue;
}

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
