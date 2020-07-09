<template>
  <div class="Posts">
    <div class="Posts-page">
      <h1 class="Post-page-title">Novels</h1>
      <div class="Posts-content">
        <div class="Post-card" v-for="post in posts" :key="post.id">
          <a class="Post-card-image" :href="/post/ + post.id"><img class="Post-card-image" :src="post.image_url" /></a>
          <div class="Post-card-content">
            <div class="Post-card-content-wrapper">
              <div class="Post-card-display-panel d-flex flex-row justify-content-between">
                <a :href="/post/ + post.id" class="Post-card-display-title">{{post.title}}</a>
                <div>
                 <a class="like-button" href="#"><span class="material-icons">favorite_border</span></a>
                 <a class="like-button" href="#"><span class="material-icons">attach_money</span></a>
                 <a class="like-button" href="#"><span class="material-icons">more_vert</span></a>
                </div>
              </div>
              <a :href="/profile/ + post.User.username" @click.prevent="visitProfile(post.User.username)"
              class="Post-card-display-username">@{{post.User.username}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Posts',
  computed: {
    posts () {
      return this.$store.state.posts
    }
  },
  methods: {
    visitProfile (username) {
      this.$router.push('/profile/' + username)
    }
  },
  created () {
    this.$store.dispatch('fetchAllPostsData')
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap');

::-webkit-scrollbar {
  display: none;
}

.Posts-page{
  margin-top: 100px;
  font-family: 'MuseoModerno', cursive;
}

.Post-page-title{
  color: white;
}

.Posts-content{
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: max-content;
}

.Post-card{
  height: 470px;
  width: 375px;
  background: #57A7C9;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 50px;
  border-radius: 25px;
}

.Post-card-content{
  margin-top: -70px;
  position: absolute;
  width: inherit;
  z-index: 2;
  display: flex;
  justify-content: center;
  height: 70px;
}

.Post-card-content-wrapper{
  width: 375px;
  padding-top: 5px;
  padding-right: 10px;
  padding-left: 15px;
  color: white;
  background: rgba(70, 88, 123, 0.8);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  transition-duration: 200ms;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.Post-card-display-panel{
  width: 350px;
}

.Post-card-image{
  height: inherit;
  width: inherit;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.Post-card-display-title{
  font-size: 16px;
  color: white;
  text-decoration: none;
}

.Post-card-display-title:hover,
.Post-card-display-username:hover{
  color: orangered;
}

.Post-card-display-username{
  font-size: 12px;
  color: white;
  text-decoration: none;
}

.like-button{
  color: white;
  margin-left: 2px;
  margin-right: 2px;
}

.like-button:hover{
  color: orangered;
}
</style>
