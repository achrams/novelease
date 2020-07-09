import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import MyPosts from '../views/MyPosts.vue'
import MyWorks from '../views/MyWorks.vue'
import Works from '../views/Works.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'fade-in-down' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { transition: 'fade-in-up' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { transition: 'fade-in-down' }
  },
  {
    path: '/novels',
    name: 'Posts',
    component: Posts,
    meta: { transition: 'fade-in-left' }
  },
  {
    path: '/works',
    name: 'Works',
    component: Works,
    meta: { transition: 'fade-in-right' }
  },
  {
    path: '/novels/:username',
    name: 'MyPosts',
    component: MyPosts,
    meta: { transition: 'fade-in-up' }
  },
  {
    path: '/works/:username',
    name: 'MyWorks',
    component: MyWorks,
    meta: { transition: 'fade-in-down' }
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
    meta: { transition: 'fade-in-down' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
