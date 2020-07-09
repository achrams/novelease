<template>
  <div id="app">
  <Navbar/>
    <vue-page-transition>
      <router-view/>
    </vue-page-transition>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body::-webkit-scrollbar {
  width: 12px;
}

div::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  border-radius: 10px;
}

div::-webkit-scrollbar-track {
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  background-color: #a8a8a8;
  outline: 2px solid darkslategrey;
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3FC4DE;
  outline: 1px solid darkslategrey;
}
</style>
