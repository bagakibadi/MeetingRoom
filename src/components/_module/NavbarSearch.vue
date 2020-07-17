<template>
  <nav>
      <div class="sidebarleft">
        <div class="buttonside" @click="show">
          <i class="fa fa-bars"></i>
        </div>
      </div>
    <div class="logoNav">
      <router-link to="/"><img src="@/assets/image/Exhibition.png" alt=""></router-link>
    </div>
    <div class="search">
      <input type="text" placeholder="Search" class="searchinp" id="search">
      <label for="search" @click="search">
        <i class="fa fa-search"></i>
        <i class="fa fa-close"></i>
      </label>
    </div>
    <div class="buttonNav">
      <div class="navul">
        <ul>
          <li><router-link to="#">Event</router-link></li>
          <li>
            <router-link to="#">Help</router-link>
            <div class="navul1">
              <ul>
                <li>
                  <router-link to="#">Test</router-link>
                </li>
                <li>
                  <router-link to="#">Test</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="imgprofile">
        <img src="@/assets/image/demo.png" class="profile"
        @click="showname">
        <div class="mydata">
          <ul>
            <li>
              <router-link to="#">{{mydata[0].email}}</router-link>
            </li>
            <li>
              <router-link to="#">{{mydata[0].name}}</router-link>
            </li>
            <li @click="logout"><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>
      <i class="fa fa-bars burgerrespo" @click="burger"></i>
      <i class="fa fa-arrow-left left1" @click="back"></i>
      <i class="fa fa-arrow-left left2" @click="back2"></i>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase';
import db from '../../firebase';

export default {
  name: 'Navbar',
  data() {
    return {
      profileMe: [],
      mydata: [],
    };
  },
  methods: {
    show() {
      console.log(document.querySelector('.sidebarvid').classList.toggle('top0'));
    },
    showname() {
      console.log(document.querySelector('.mydata'));
      document.querySelector('.mydata').classList.toggle('topp0');
    },
    back2() {
      document.querySelector('.sidebarvid').classList.remove('sidegeser');
      document.querySelector('.left2').classList.remove('left1show');
      document.querySelector('.chat').classList.remove('right0');
      document.querySelector('.left1').classList.toggle('left1show');
    },
    back() {
      document.querySelector('.left1').classList.remove('left1show');
      document.querySelector('.sidebarvid').classList.toggle('displayflex');
      document.querySelector('.burgerrespo').classList.remove('fabarshide');
    },
    burger() {
      document.querySelector('.left1').classList.toggle('left1show');
      document.querySelector('.sidebarvid').classList.toggle('displayflex');
      document.querySelector('.burgerrespo').classList.toggle('fabarshide');
    },
    search() {
      document.querySelector('.fa-search').classList.toggle('forhide');
      document.querySelector('.fa-close').classList.toggle('forshow');
      document.querySelector('.logoNav').classList.toggle('forhide');
      document.querySelector('.searchinp').classList.toggle('forshow');
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login');
      });
    },
    getUser() {
      db.collection('users').where('email', '==', this.mydata).onSnapshot((querySnapshot) => {
        const profileMe = [];
        querySnapshot.forEach((doc) => {
          profileMe.push(doc.data());
        });
        this.mydata = profileMe;
      });
    },
  },
  created() {
    if (firebase.auth().currentUser) {
      this.mydata = firebase.auth().currentUser.email;
    }
    // console.log(firebase.auth().currentUser);
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
  .topp0{
    top: 60px !important;
  }
  .sidebarleft{
    left: 5px;
    position: absolute;
    width: 70px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    .buttonside{
      background: #39A1FF;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 40px;
      cursor: pointer;
      position: absolute;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
      border: 0.5px solid #3387d1;
      .fa-bars{
        font-size: 24px;
        color: white;
      }
    }
  }
  .fabarshide{
    display: none !important;
    opacity: 0;
  }
  .fa-close{
    display: none;
  }
  .fa-arrow-left{
    display: none;
    font-size: 24px;
    color: white;
  }
  nav{
    width: 100%;
    height: 60px;
    background: #39A1FF;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 5;
    .logoNav{
      width: 274px;
      height: 100%;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 130px;
        height: 25px;
      }
    }
    .search{
      z-index: 1;
      input{
        width: 330px;
        border-radius: 40px;
        border: none;
        outline: none;
        color: #C4C4C4;
        font-size: 14px;
        padding: 5px 25px;
      }
      label{
        position: relative;
        right: 30px;
        i{
          color: #C4C4C4;
        }
      }
    }
    .buttonNav{
      position: absolute;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding-right: 50px;
      .navul{
        ul{
          margin: 0;
          padding: 0;
          display: flex;
          li{
            list-style: none;
            width: 75px;
            a{
              display: block;
              margin: 10px 0;
              padding: 10px 20px;
              text-decoration: none;
              color: white;
            }
          }
          li:hover {
            background: #054883;
          }
          li:hover .navul1{
            display: block;
            background: #39A1FF;
          }
          li:hover .navul1 ul{
            display: block;
          }
          li:hover .navul1 ul li{
            width: 100px;
            text-align: left;
          }
          li:hover .navul1 ul li a{
            padding-left: 20px;
            margin: 0;
          }
        }
      }
      .imgprofile{
        width: 45px;
        height: 45px;
        border-radius: 100%;
        .mydata{
          transition: .3s all;
          top: -300%;
          position: absolute;
          background: #39A1FF;
        }
        ul{
          margin-top: 5px;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          li{
            // margin-top: 5px;
            margin-left: -120px;
            list-style: none;
            width: auto;
            background: #39A1FF;
            a{
              display: block;
              margin: 10px 0;
              padding: 10px 20px;
              text-decoration: none;
              color: white;
            }
          }
          li:hover{
            background: #054883;
          }
        }
        img{
          width: 45px;
          height: 45px;
          border-radius: 100%;
          object-fit: cover;
          cursor: pointer;
        }
      }
      .fa-bars{
        font-size: 30px;
        color: white;
        position: relative;
        display: none;
      }
    }
  }
  .navul1{
    display: none;
    position: absolute;
    background: #39A1FF;
    ul{
      li{
        width: 75px;
      }
      li:hover{
        background: #054883;
      }
    }
  }
  .searchshow{
    display: none;
  }
  @media only screen and (max-width: 600px) {
    .logoNav{
      width: 200px !important;
      display: flex !important;
    }
    .navLogin{
      display: none;
    }
    .navSignup{
      display: none;
    }
    .buttonNav{
      padding-right: 20px !important;
      .imgprofile{
        position: relative;
      }
    }
    .burgerrespo{
      z-index: 2;
      display: block !important;
      margin: 0 !important;
    }
    .search{
      display: flex;
      justify-content: center;
      align-items: center;
      input{
        margin-left: 20px;
        border-radius: 10px !important;
        height: 35px !important;
        width: 260px !important;
        display: none;
      }
      label{
        z-index: 2;
        i{
          font-size: 20px;
          color: whitesmoke !important;
        }
        .fa-search{
          margin-left: 110px;
          transition: 1s all;
        }
        .fa-close{
          margin-left: 35px;
        }
      }
    }
    .imgprofile{
      display: none;
    }
    .navul{
      display: none;
    }
    .forhide{
      display: none !important;
    }
    .forshow{
      display: block !important;
    }
    .sidebarleft{
      display: none;
    }
    .left1show{
    display: block !important;
    }
  }
</style>
