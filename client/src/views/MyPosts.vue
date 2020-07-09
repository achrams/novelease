<template>
  <div class="Posts">
    <div class="Posts-page">
      <h1 style="color: whitesmoke;">My Novels</h1>
      <div class='Posts-content'>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyPosts',
  data () {
    return {
      username: ''
    }
  },
  created () {
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap');

.Posts-page{
  margin-top: 100px;
  font-family: 'MuseoModerno', cursive;
}

.Posts-content{
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
