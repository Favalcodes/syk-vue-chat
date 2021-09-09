<template>
  <div id="login">
      <img src="../assets/Chat.png" alt="" class="chat-img">
      <button @click="loginSubmit" class="log-btn">Login with Google</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
 name: 'Login',
 methods: {
     loginSubmit() {
         const provider = new firebase.auth.GoogleAuthProvider()

         firebase.auth().signInWithRedirect(provider)
         .catch((error) => console.log(error))
     }
 }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

#login{
    background: $china-rose;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 100vh;
}
.chat-img{
    width: 400px;
    height: 400px;
}
.log-btn{
    padding: 8px 20px;
    background: #fff;
    border: none;
    border-radius: 8px;
    color: $china-rose;
    font-size: 18px;
    font-weight: 700;
}
</style>