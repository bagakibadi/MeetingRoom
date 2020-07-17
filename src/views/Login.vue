<template>
  <div class="container">
    <div class="boxlogin">
      <div>
        <i class="fa fa-arrow-left"></i>
      </div>
      <div class="judul1">
        <h1>Sign in to continue</h1>
      </div>
      <form @submit.prevent="login">
        <div class="forminp">
          <input type="email" id="email" placeholder="Email"
          v-model="email">
          <input type="password" id="password" placeholder="Password"
          v-model="password">
        </div>
        <div class="check">
          <div class="remember">
            <input type="checkbox" id="remember">
            <label for="remember">Remember me</label>
          </div>
          <div class="forgot">
            <i class="fa fa-lock"></i>
            <label for="">Forgot your password?</label>
          </div>
        </div>
        <button class="button" type="submit">Log in</button>
      </form>
      <div class="adv">
        <p>Don't have Account?</p>
        <router-link to="/signup">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result);
          this.$router.push('/');
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
