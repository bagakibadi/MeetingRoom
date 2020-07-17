<template>
  <div class="container">
    <div class="boxlogin">
      <div>
        <router-link to="/login">
          <i class="fa fa-arrow-left"></i>
        </router-link>
      </div>
      <div class="judul1">
        <h1>Create an Account</h1>
      </div>
      <form @submit.prevent="register">
        <div class="forminp">
          <input type="email" id="email" placeholder="Email"
          v-model="email">
          <input type="fullname" id="name" placeholder="Full Name"
          v-model="fullname">
          <input type="password" id="password" placeholder="Password"
          v-model="password">
        </div>
        <div class="check">
          <div class="remember">
            <input type="checkbox" id="remember">
            <label for="remember">I accept Terms and Conditions</label>
          </div>
        </div>
        <button class="button" type="submit">Sign Up</button>
      </form>
      <div class="adv">
        <p>Already have Account?</p>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      fullname: '',
    };
  },
  methods: {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result);
          firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid)
            .set({
              email: this.email,
              fullname: this.fullname,
              status: true,
              photo: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            });
          // eslint-disable-next-line no-alert
          // alert('Register Success!');
        })
        .catch((err) => {
          console.log(err);
          // eslint-disable-next-line no-alert
          // alert(`Oops ${err.message}`);
        });
    },
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result);
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
              email: this.email,
              name: this.fullname,
              status: true,
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100vh;
    background: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: center;
    .boxlogin{
      padding: 30px;
      width: 500px;
      height: auto;
      background: white;
      .fa-arrow-left{
        font-size: 20px;
        cursor: pointer;
      }
      .judul1{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        background: white;
        margin: 10px 0 20px 0;
        h1{
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
    .forminp{
      display: flex;
      flex-direction: column;
      input{
        padding: 10px 15px;
        border: 1px solid rgb(194,194,194);
        border-radius: 5px;
        outline: none;
        color: #444444;
        margin: 13px 0;
      }
    }
    .check{
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .remember{
        display: flex;
        input{
          position: relative;
          margin: 5px;
        }
        label{
          color: #444444;
        }
      }
      .forgot{
        color: #444444;
        cursor: pointer;
        i{
          margin-right: 5px;
        }
      }
    }
    .button{
      width: 100%;
      height: 45px;
      border: none;
      background: #3051d3;
      color: white;
      font-size: 18px;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      margin: 10px 0;
    }
    .adv{
      display: flex;
      margin: 5px 0;
      p{
        color: #444444;
        font-size: 14px;
      }
      a{
        position: relative;
        left: 1px;
        color: #3051d3;
        text-decoration: none;
      }
    }
  }
</style>
