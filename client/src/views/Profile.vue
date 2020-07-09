<template>
  <div class="Profile">
  <div class="add-tag-form" v-if="isAdd" @submit.prevent="confirmAddTag">
      <form>
      <a href="#" class="cancel-add-tag" @click.prevent="cancelAdd" ><i class='material-icons'>cancel</i></a>
        <label class="field a-field a-field_a1">
          <input type="text" class="field__input a-field__input" placeholder="add interest name" v-model="tagname" />
          <span class="a-field__label-wrap">
            <span class="a-field__label">Add Interest</span>
          </span>
        </label><br/>
        <input style="margin-top: 15px;" type="submit" value="Submit" class="btn btn-outline-primary" />
      </form>
    </div>
    <div class="Profile-page">
      <div class="Profile-content" style="margin-top: 250px;" v-if="loading">
        <h1>loading....</h1>
      </div>
      <div v-if="!loading" class='Profile-content'>
        <img class="Profile-cover-image" :src="user.cover_image" :alt="user.name" />
        <div class="Profile-data">
          <div class="Profile-card-image-holder">
            <img class="Profile-card-image" :src="user.user_image" />
          </div>
          <div class="Profile-data-holder">
            <div class="Profile-card-data">
              <div class="Profile-card-name-and-tags d-flex justify-content-between align-items-center">
                <h3>{{user.name}}</h3>
                <div class="Profile-card-tags">
                  <div v-if="loggedUser.username === user.username && tags.length < 5" style="width: 50px;">
                    <a @click.prevent="openAdd" href="#" class="add-tags-button"><i class='material-icons'>add</i>
                      <p>Interest</p>
                    </a>
                  </div>
                  <div class="Profile-tags-label" style="margin-left: 5px;" >
                    <p class="Profile-card-interests" v-for="tag in tags" :key="tag.id">
                    {{tag.name}}
                    <a class="delete-tags-button" href="#" @click.prevent="deleteTag(tag.id)">
                      <i class='material-icons'>cancel</i>
                    </a>
                    </p>
                  </div>
                </div>
              </div>
              <h6>@{{user.username}}</h6>
              <div class="Profile-card-biodata">
                <p style="font-size: 12px; text-align: justify;">{{user.biodata}}</p>
              </div>
              <div class="Profile-card-follow-data">
                <div class="Profile-card-followers">
                  <p style="font-size: 14px; color: blanchedalmond">{{followers.length}}</p>
                  <p style="font-size: 14px; margin-left: 5px;">Followers</p>
                </div>
                <div class="Profile-card-following">
                  <p style="font-size: 14px; color: blanchedalmond">{{following.length}}</p>
                  <p style="font-size: 14px; margin-left: 5px;">Following</p>
                </div>
              </div>
            </div>
          </div>
          <div class="Profile-card-btn-panel" v-if="loggedUser.username === user.username">
            <div style="height: 60px; margin-top: 70px;" class="d-flex justify-content-center">
              <a href="#" class="btn-draft d-flex col align-items-center">
                <i class='material-icons card-button'>credit_card</i><br/>
                <p style="font-size: 11px;">My Payment</p>
              </a>
            </div>
            <div style="height: 60px;" class="d-flex justify-content-center">
              <a href="#" class="btn-edit d-flex col align-items-center"><i class='material-icons card-button'>edit</i><br/>
                <p style="font-size: 11px;">Edit Profile</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{user}} -->
    <!-- {{followers}} -->
  </div>
</template>
<script>
export default {
  name: 'Profile',
  data () {
    return {
      isAdd: false,
      tagname: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.profile.user
    },
    tags () {
      return this.$store.state.profile.user.Tags
    },
    loggedUser () {
      return this.$store.state.user
    },
    followers () {
      return this.$store.state.profile.followers
    },
    following () {
      return this.$store.state.profile.following
    },
    logged () {
      return this.$store.state.logged
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    openAdd () {
      this.isAdd = true
    },
    cancelAdd () {
      this.isAdd = false
    },
    confirmAddTag () {
      this.$store.dispatch('addTags', { name: this.tagname })
        .then(data => {
          this.$store.dispatch('fetchProfileData', this.$router.currentRoute.params.username)
          this.isAdd = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteTag (id) {
      this.$store.dispatch('deleteTag', id)
        .then(() => {
          this.$store.dispatch('fetchProfileData', this.$router.currentRoute.params.username)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('getLoggedData')
    this.$store.dispatch('loading', true)
    this.$store.dispatch('fetchProfileData', this.$router.currentRoute.params.username)
    this.$store.dispatch('setPath', [16, 16, 16])
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap');

.Profile-page{
  font-family: 'MuseoModerno', cursive;
  display: flex;
  flex-direction: column;
}

.Profile-content{
  display: flex;
  justify-content: center;
}

.Profile-cover-image{
  height: 700px;
  width: 100%;
  position: absolute;
  z-index: -1;
}

.Profile-data{
  display: flex;
  justify-content: flex-start;
  margin-top: 150px;
  width: 1000px;
  height: 250px;
  border-top-left-radius: 125px;
  border-bottom-left-radius: 125px;
  border-top-right-radius: 125px;
  border-bottom-right-radius: 125px;
  background: #332041;
}

.Profile-card-btn-panel{
  display: flex;
  flex-direction: column;
  height: inherit;
  width: inherit;
}

.Profile-card-image{
  height: 250px;
  width: 250px;
  border-radius: 50%;
  border: 1px black solid;
}

.Profile-card-data{
  margin-left: 20px;
  padding: 10px;
  color: whitesmoke;
  text-align: left;
}

.Profile-card-name-and-tags{
  height: 50px;
}

.Profile-card-tags{
  margin-top: 50px;
  width: 380px;
  height: 100px;
  display: flex;
  justify-content: flex-end;
}

.Profile-tags-label{
  width: max-content;
  max-width: 300px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.Profile-card-interests{
  margin-right: 5px;
  border: 1px solid whitesmoke;
  border-radius: 15px;
  padding: 5px;
  font-size: 10px;
  height: max-content;
}

.Profile-card-interests:hover .delete-tags-button{
  animation-name: show;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
}

.Profile-card-biodata{
  margin-top: 20px;
  height: 80px;
  width: 550px;
}

.Profile-card-follow-data{
  margin-top: 30px;
  height: 30px;
  width: 300px;
  display: flex;
  flex-direction: row;
}

.Profile-card-followers,
.Profile-card-following{
  display: flex;
  margin-right: 10px;
}

.btn-edit{
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  transition-duration: 200ms;
}

.btn-draft{
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  transition-duration: 200ms;
}

.btn-edit:hover,
.btn-draft:hover{
  color: darkslategrey;
  text-decoration: none;
  transition-duration: 200ms;
}

.btn-edit p,
.btn-draft p {
  opacity: 0;
  animation-name: finish;
  animation-duration: 300ms;
  position: relative;
}

.btn-edit:hover p,
.btn-draft:hover p{
  display: block;
  color: whitesmoke;
  position: relative;
  animation-name: hovering;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
}

.add-tags-button{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: whitesmoke;
  height: 50px;
}

.add-tags-button:hover i{
  color: darkslategrey;
  border: 1px solid darkslategrey;
}

.add-tags-button i {
  border: 1px solid whitesmoke;
  border-radius: 50%;
}

.add-tags-button p {
  opacity: 0;
  font-size: 12px;
  position: relative;
  animation-name: finish;
  animation-duration: 300ms;
  animation-fill-mode: forward;
}
.add-tags-button:hover p{
  position: relative;
  animation-name: hovering;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
  color: whitesmoke;
}

.card-button{
  position: absolute;
  border: 1px solid whitesmoke;
  padding: 5px;
  font-size: 20px;
  border-radius: 50%;
  width: fit-content;
}

.card-button .payment-btn {
  position: absolute;
  text-align: center;
  margin-right: 120px;
  width: 80px;
}

.card-button:hover{
  border: 1px solid darkslategrey;
}

@keyframes hovering {
  from {top: 0px; opacity: 0;}
  to {top: 10px; opacity: 1;}
}

@keyframes show{
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes finish {
  from {top: 10px; opacity: 1;}
  to {top: 0px; opacity: 0;}
}

.add-tag-form{
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
}

.add-tag-form form{
  background: rgba(0, 0, 0, 0.8);
  width: 300px;
  height: 150px;
  margin-top: 200px;
  border-radius: 25px;
}

.field {
  --fieldBorderColor: whitesmoke;
  --fieldBorderColorActive: grey;
}

.field__input{
  color: whitesmoke;
}

.add-tag-form span {
  color: rgba(245, 245, 245, 0.7);
  font-size: 12px;
}

.cancel-add-tag{
  position: absolute;
  margin-left: 225px;
  margin-top: -5px;
  text-decoration: none;
}

.delete-tags-button{
  opacity: 0;
  position: absolute;
  color: whitesmoke;
  margin-top: -10px;
  margin-left: -10px;
}

.delete-tags-button:hover{
  color: orangered;
}

.delete-tags-button i{
  font-size: 18px;
}

.cancel-add-tag i{
  font-size: 34px;
  color: olive;
}
</style>
