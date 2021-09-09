<template>
  <div id="chat">
    <div class="phone">
      <div class="inner">
        <div class="head">
          <h4>Syk</h4>
          <button @click="logout" class="out-btn">Logout</button>
        </div>
        <div class="main">
            <div v-for="(msg, index) in messages" v-bind:key="'index-'+index" :class="['message', sentOrReceived(msg.userUID)]">
                <img :src="msg.photoURL" :alt="msg.displayName">
                <p>{{ msg.text}}</p>
            </div>
            <div ref="scrollable"></div>
        </div>
        <form v-on:submit.prevent="sendMessage">
            <div class="form-group">
            <input v-model="message" type="text" placeholder="Type message">
            <button :disabled="!message" type="submit" class="send"><font-awesome-icon icon="paper-plane" /></button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  mounted() {
    this.db.collection('messages').orderBy('createdAt')
        .onSnapshot(querySnap => {
          this.messages = querySnap.docs.map(doc => doc.data())
        })
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: '',
      messages: [],
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
    },
    async sendMessage() {
      const messageInfo = {
        'userUID': this.user.uid,
        'displayName': this.user.displayName,
        'photoURL': this.user.photoURL,
        'text': this.message,
        'createdAt': Date.now(),
      }
      await this.db.collection('messages').add(messageInfo)
      this.message = ''
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

#chat{
    background: $china-rose;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.phone{
    width: 340px;
    height: 90vh;
    background: #fff;
    border: 1px solid $mint-green;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inner{
    height: 87vh;
    width: 320px;
    background: $glossy-grape;
    border-radius: 28px;
    position: relative;
}
.head{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    background: $cordovan;
    color: #fff;
    align-items: center;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    padding: 0 18px;

    & h4{
        font-weight: 800;
        font-size: 28px;
    }

    & .out-btn{
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
    }
}
.main{
    overflow-y: scroll;
    max-height: 65vh;

    & .message{
        display: flex;
        margin: 20px 10px;

        &.received{
             p{
                background: #fff;
                color: $cordovan;
                padding: 10px;
                border-top-right-radius: 12px;
                border-bottom-right-radius: 12px;
                border-top-left-radius: 12px;
            }
        }

        &.sent{
            flex-direction: row-reverse;

            img{
                margin-right: 0;
                margin-left: 10px;
            }
            
            p{
                background: $cordovan;
                color: #fff;
                padding: 10px;
                border-top-right-radius: 12px;
                border-bottom-left-radius: 12px;
                border-top-left-radius: 12px;
            }
        }


        & img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            margin-top: auto;
        }
    }
}
form{
    position: absolute;
    bottom: 20px;
    left: 10px;
    width: 94%;
    & .form-group{
        display: flex;
        
        & input{
            width: 100%;
            height: 40px;
            padding: 0 10px;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            border: none;

            &:focus{
                outline: none;
            }
        }

        & .send{
            background: $cordovan;
            border: none;
            color: #fff;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            padding: 10px;
        }
    }
}
</style>