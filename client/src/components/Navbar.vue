<template>
<nav class="navbar navbar-expand-sm justify-content-center fixed-top" data-animations="fadeInRight">
  <div class="website-brand">
    <a href="/" @click.prevent="home" class="navbar-brand">Novelease</a>
    <p class="navbar-brand cursor">.</p>
  </div>
  <div class='nav-content d-flex justify-content-center'>
    <a class="nav-link" v-bind:style="{ fontSize: path[0] + 'px' }" href="/novels" @click.prevent="posts">NOVELS</a>
    <a class="nav-link" v-bind:style="{ fontSize: path[1] + 'px' }" href="/" @click.prevent="home">HOME</a>
    <a class="nav-link" v-bind:style="{ fontSize: path[2] + 'px' }" href="/works" @click.prevent="works">WORKS</a>
  </div>
  <div class="droplist">
    <div class="dropdown">
      <a href="#" class="user-icon-handler"><i class='user-icon fas fa-user'></i>USER</a>
      <div class="dropdown-menu dropdown-menu-right">
        <h6 class="dropdown-header" v-if="logged">User Panel</h6>
        <h6 class="dropdown-header" v-if="!logged">User Guide</h6>
        <a class="dropdown-item" v-if="logged" :href="'/profile/' + user.username" @click.prevent="profile">Profile</a>
        <a class="dropdown-item" v-if="logged" :href="'/novels/'+ user.username" @click.prevent="userposts">My Novels</a>
        <a class="dropdown-item" v-if="logged" :href="'/works/'+ user.username" @click.prevent="userworks">My Works</a>
        <a class="dropdown-item" v-if="logged" href="#" @click.prevent="logout"><span class="material-icons">toggle_off</span> Logout</a>
        <a class="dropdown-item" v-if="!logged" href="#">About Novelease</a>
        <a class="dropdown-item" v-if="!logged" href="#">About Us</a>
        <a class="dropdown-item" v-if="!logged" href="/register" @click.prevent="register">Register</a>
        <a class="dropdown-item" v-if="!logged" href="/login" @click.prevent="login"><span class="material-icons">toggle_on</span> Login</a>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    path () {
      return this.$store.state.path
    },
    logged () {
      return this.$store.state.logged
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    posts () {
      if (this.$router.currentRoute.path !== '/novels') {
        this.$router.push('/novels')
        this.$store.dispatch('setPath', [18, 16, 16])
      }
    },
    home () {
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
        this.$store.dispatch('setPath', [16, 18, 16])
      }
    },
    works () {
      if (this.$router.currentRoute.path !== '/works') {
        this.$router.push('/works')
        this.$store.dispatch('setPath', [16, 16, 18])
      }
    },
    profile () {
      if (this.$router.currentRoute.path !== '/profile/' + this.user.username) {
        this.$router.push({ name: 'Profile', params: { username: this.user.username } })
        this.$store.dispatch('setPath', [16, 16, 16])
      }
    },
    userposts () {
      if (this.$router.currentRoute.path !== '/novels/' + this.username) {
        this.$router.push({ name: 'MyPosts', params: { username: this.user.username } })
        this.$store.dispatch('setPath', [16, 16, 16])
      }
    },
    userworks () {
      if (this.$router.currentRoute.path !== '/works/' + this.username) {
        this.$router.push({ name: 'MyWorks', params: { username: this.user.username } })
        this.$store.dispatch('setPath', [16, 16, 16])
      }
    },
    login () {
      if (this.$router.currentRoute.path !== '/login') {
        this.$router.push('/login')
      }
    },
    register () {
      if (this.$router.currentRoute.path !== '/register') {
        this.$router.push('/register')
      }
    },
    logout () {
      this.$store.dispatch('logged', false)
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('logged', true)
      this.$store.dispatch('getLoggedData')
      console.log(this.user)
    }
    if (this.$router.currentRoute.path === '/novels') {
      this.$store.dispatch('setPath', [18, 16, 16])
    }
    if (this.$router.currentRoute.path === '/') {
      this.$store.dispatch('setPath', [16, 18, 16])
    }
    if (this.$router.currentRoute.path === '/works') {
      this.$store.dispatch('setPath', [16, 16, 18])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap');

@keyframes hovering {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes blinks {
  from {opacity: 0;}
  to {opacity: 1;}
}

.navbar{
  height: 60px;
}

.website-brand{
  position: absolute;
  width: 95%;
  display: flex;
  justify-content: flex-start;
  z-index: 2;
}
.navbar-brand{
  margin: 0;
  color: whitesmoke;
}

.cursor{
  opacity: 0;
  animation-iteration-count: infinite;
  animation-name: blinks;
  animation-fill-mode: both;
  animation-duration: 2000ms;
}

.navbar a {
  color: #D3D3D3;
  font-family: 'MuseoModerno', cursive;
}

.nav-content{
  z-index: 3;
}

.nav-link{
  transition-duration: 200ms;
}

.nav-link:hover{
  color: darkslategrey;
  transform: scale(1.2);
  transition-duration: 200ms;
}

.droplist{
  position: absolute;
  width: 95%;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
}

.dropdown{
  margin-top: 10px;
  width: 90px;
  height: 40px;
}

.dropdown:hover .dropdown-menu {
  animation-name: hovering;
  display: block;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
}

.dropdown-menu{
  /* margin-right: -300px; */
  width: 200px;
  display: none;
  opacity: 0;
  margin-top: -10px;
}

.dropdown-header{
  font-family: 'MuseoModerno', cursive;
}

.dropdown-item{
  display: flex;
  align-items: center;
}

.dropdown-item:hover{
  background: #4B88A2;
}

.user-icon{
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
}

.user-icon-handler:hover{
  color: darkslategrey;
  text-decoration: none;
}

.user-icon:hover{
  text-decoration: none;
}
</style>
