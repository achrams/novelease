<template>
  <div class="Works">
    <div class="Works-page">
      <h1>My Works</h1>
      <div class='Works-content'>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyWorks',
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

.Works-page{
  margin-top: 100px;
  font-family: 'MuseoModerno', cursive;
}

.Works-content{
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
