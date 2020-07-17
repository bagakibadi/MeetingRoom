<template>
  <div class="container">
    <div class="navbar">
      <Navbar/>
    </div>
    <div class="content">
      <div class="sidebarvid">
        <div class="siderelative">
          <div class="allicon">
            <div class="chats" @click="chats">
              <i class="fa fa-comments comments"></i>
            </div>
            <i class="fa fa-home icon"></i>
            <i class="fa fa-user icon"></i>
          </div>
        </div>
      </div>
      <div class="video">
        <div class="judulVideo">
          <h1>Avatar</h1>
        </div>
        <div class="player">
            <video-player ref="videoPlayer"
                          class="vjs-custom-skin"
                          :options="playerOptions"
                          @play="onPlayerPlay($event)"
                          @ready="onPlayerReady($event)">
            </video-player>
        </div>
      </div>
      <div class="chat">
        <div class="info">
          <div class="chatppl infopeople" @click="chat"
          v-bind:class="{active: isActive == 'chat'}">
            <p>Chat</p>
          </div>
          <div class="people infopeople" @click="people"
          v-bind:class="{active: isActive == 'people'}">
            <p>People</p>
          </div>
        </div>
        <div class="inbox" v-if="code === 1">
          <div class="profileChat" v-for="message in themessages" :key="message.id">
            <div class="imageProfile">
              <img src="@/assets/image/userProfile.png" alt="">
            </div>
            <div class="infoChat">
              <div class="infoall">
                <h1 class="name">{{message.from}}</h1>
                <h1 class="posisi">Organizer</h1>
                <p>{{message.time}}</p>
              </div>
              <div class="isiChat">
                <p>{{message.message}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ppel" v-else>
          <div class="profileinfo" v-for="itm in 9" :key="itm.id">
            <div class="imageProfile">
              <img src="@/assets/image/userProfile.png" alt="">
            </div>
            <div class="nameInfo">
              <div class="h1name">
                <h1>Ericko Lim</h1>
              </div>
              <div class="pposisi">
                <p>CEO</p>
              </div>
            </div>
          </div>
        </div>
        <div class="sendMsg" v-if="code === 1">
          <label for="camera"><i class="fa fa-camera"></i></label>
          <input type="file" id="camera">
          <input type="text" placeholder="Start typing..." id=""
          v-model="message"
          @keyup.enter="sendMsg">
          <i class="fa fa-paper-plane" @click="sendMsg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Navbar from '@/components/_module/NavbarSearch.vue';
import VideoPlayer from '@/components/_module/VideoPlayer.vue';
import db from '../firebase';

export default {
  name: 'Meeting',
  components: {
    VideoPlayer,
    Navbar,
  },
  data() {
    return {
      mydata: '',
      themessages: [],
      message: '',
      authUser: [],
      code: 1,
      isActive: 'chat',
      playerOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
      },
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    chats() {
      document.querySelector('.left2').classList.toggle('left1show');
      document.querySelector('.left1').classList.remove('left1show');
      document.querySelector('.chat').classList.add('right0');
      document.querySelector('.sidebarvid').classList.toggle('sidegeser');
    },
    chat() {
      this.code = 1;
      this.isActive = 'chat';
    },
    people() {
      this.isActive = 'people';
      this.code = 2;
    },
    onPlayerPlay(player) {
      console.log('player play!', player);
    },
    onPlayerReady(player) {
      console.log('player ready!', player);
      this.player.play();
    },
    playVideo(source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source,
      };
      this.player.reset();
      // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video);
      // this.player.load()
      this.player.play();
    },
    sendMsg() {
      const today = new Date();
      db.collection('chat').add({
        message: this.message,
        from: this.authUser[0].name,
        createdAt: new Date(),
        time: `${today.getHours()}:${today.getMinutes()} | ${today.getDay()}`,
      })
        .then(() => {
          this.autoScrollBottom();
        });
      this.message = null;
    },
    getUser() {
      db.collection('users').where('email', '==', this.mydata).onSnapshot((querySnapshot) => {
        const profileMe = [];
        querySnapshot.forEach((doc) => {
          profileMe.push(doc.data());
        });
        this.authUser = profileMe;
      });
    },
    showMessage() {
      db.collection('chat').orderBy('createdAt')
        .onSnapshot((querySnapshot) => {
          const allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });
          this.themessages = allMessages;
          setTimeout(() => {
            this.autoScrollBottom();
          }, 500);
        });
    },
    autoScrollBottom() {
      const box = document.querySelector('.inbox');
      box.scrollTop = box.scrollHeight;
    },
  },
  mounted() {
    const src = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
    this.playVideo(src);
    this.showMessage();
  },
  created() {
    if (firebase.auth().currentUser) {
      this.mydata = firebase.auth().currentUser.email;
    }
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
  .top0{
    top: 0 !important;
  }
  .barshide{
    display: none !important;
  }
  .displayflex{
    left: 0 !important;
  }
  .player {
    width: 100%;
    height: calc(100vh - 60px);
  }
  .vjs-custom-skin{
    width: 100%;
    height: 100%;
  }
  .video-js{
    width: 100%;
    height: 700px;
  }
  .chats, .peoples{
    display: none;
  }
  #camera{
    display: none;
  }
  .container{
    width: 100vw;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    .navbar{
      width: 100%;
      height: 60px;
      background: #39A1FF;
    }
    .content{
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      position: relative;
      .sidebarvid{
        position: absolute;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70px;
        // height: auto;
        transition: 1s all;
        top: -100%;
        margin-left: 5px;
        background: #39A1FF;
        .siderelative{
          position: relative;
          width: 100%;
          .allicon{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
              cursor: pointer;
              font-size: 22px;
              padding: 15px 10px;
              width: 100%;
              display: flex;
              justify-content: center;
              // border-bottom: 1px solid white;
              color: white;
            }
            .icon:hover{
              background: #054883;
            }
          }
        }
      }
      .video{
        width: 70%;
        height: 100%;
        background: #000;
      }
      .chat{
        position: relative;
        width: 30%;
        height: 100%;
        background: white;
        transition: 1s all;
        .info{
          width: 100%;
          height: 4rem;
          display: flex;
          .infopeople{
            cursor: pointer;
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .chatppl{
            background: #F1F2F6;
            border: 2px solid #ECEDF1;
          }
          .people{
            background: #F1F2F6;
            border: 2px solid #ECEDF1;
          }
          .active{
            background: white;
            border: none;
            border-top: 1px solid #ECEDF1;
          }
        }
        .inbox{
          width: 100%;
          height: calc(100% - 120px);
          background: white;
          padding: 10px;
          overflow-x: auto;
          .profileChat{
            display: flex;
            width: 100%;
            height: auto;
            background: whitesmoke;
            border-radius: 6px;
            margin-bottom: 10px;
            .imageProfile{
              display: flex;
              justify-content: center;
              padding: 10px;
              img{
                width: 45px;
                height: 45px;
                border-radius: 100%;
                object-fit: cover;
              }
            }
            .infoChat{
              display: flex;
              flex-direction: column;
              justify-content: center;
              .infoall{
                display: flex;
                padding: 5px 0;
                align-items: center;
                h1{
                  font-size: 16px;
                  margin-right: 5px;
                }
                .posisi{
                  color: blue;
                  font-size: 12px;
                }
                p{
                  color: #C4C4C4;
                  font-size: 14px;
                }
              }
              .isiChat{
                display: flex;
                width: 100%;
                p{
                  align-items: center;
                  font-size: 14px;
                  margin-bottom: 15px;
                }
              }
            }
          }
        }
        .ppel{
          height: calc(100% - 60px);
          overflow-x: auto;
          .profileinfo{
            cursor: pointer;
            width: 100%;
            height: auto;
            display: flex;
            background: white;
            border-bottom: 1px solid #C4C4C4;
            padding: 0 10px;
            .imageProfile{
              padding: 10px;
              img{
                object-fit: cover;
                width: 45px;
                height: 45px;
                border-radius: 100%;
              }
            }
            .nameInfo{
              display: flex;
              flex-direction: column;
              justify-content: center;
              .h1name{
                margin-bottom: 5px;
              }
            }
          }
          .profileinfo:hover{
            background: rgb(194, 194, 194);
          }
        }
        .sendMsg{
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          border: 1px solid #C4C4C4;
          .fa-camera{
            padding: 0 15px;
          }
          input{
            border: 1px solid #c4c4c4;
            border-radius: 40px;
            outline: none;
            width: 300px;
            padding: 10px 15px;
          }
          .fa-paper-plane{
            margin-left: 10px;
            font-size: 22px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .left{
    left: 5px !important;
  }
  .marginleft{
    margin-left: 0px !important;
  }
  .judulVideo{
    z-index: 2;
    position: absolute;
    top: 20px;
    width: 956px;
    display: flex;
    justify-content: center;
    h1{
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 600px) {
    .video{
      display: flex;
      position: absolute !important;
      width: 100% !important;
      // overflow: hidden;
      height: calc(100% - 60px) !important;
    }
    .content{
      overflow: hidden;
    }
    .chat{
      width: 100% !important;
      // display: none;
      right: -100%;
      z-index: 1;
    }
    .right0{
      right: 0 !important;
    }
    .infopeople{
      width: 50% !important;
    }
    .sendMsg{
      input{
        width: 275px !important;
      }
    }
    .fa-paper-plane{
      margin-left: 6px !important;
    }
    .postAbso{
      display: block;
    }
    .judulVideo{
      width: 100% !important;
      z-index: 1;
    }
    .sidebarleft{
      display: none;
    }
    .sidebarvid{
      top: 0 !important;
      z-index: 4;
      margin: 0px !important;
      width: 100% !important;
      height: 100% ;
      left: -100% ;
    }
    .sidegeser{
      margin-left: -100% !important;
    }
    .allicon{
      width: 100%;
      .icon{
        display: flex;
        justify-content: center;
        border-bottom: 1px solid rgb(194, 194, 194);
      }
    }
    .chats{
      display: flex;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      height: 45px;
      padding: 10px 35px;
      border-bottom: 1px solid #c2c2c2;
      border-top: 1px solid #fffefe;
      margin: 5px 0;
      .comments{
        font-size: 20px;
        color: white;
      }
    }
    .peoples:hover{
      background: rgb(194, 194, 194) !important;
    }
      .fabarshide{
    display: none !important;
  }

  }
</style>
