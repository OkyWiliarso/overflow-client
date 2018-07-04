<template>
  <div>
  <Navbar/>

  <div class="post container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="black-text">Post.</h2>
        <form @submit.prevent="postQuestion">
          <div class="row">
            <div class="input-field col s12">
              <input v-model="title" type="text">
              <label>Title</label>
            </div>
          </div>
          <div class="row">
            <p>Description :</p>
            <div class="input-field col s12">
              <editor v-model="description"></editor>
            </div>
          </div>
          <button class="btn black">Post</button>
        </form>
      </div>
    </div>
  </div>

  <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import swal from 'sweetalert2'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'post',
  components: {
    Navbar,
    'editor': Editor,
    Footer
  },
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    postQuestion: function () {
      let newQuestion = {
        title: this.title,
        description: this.description,
        answers: [],
        upvote: [],
        downvote: []
      }

      axios.post('https://hacktiv-overflow-server.okywiliarso.me/questions/create', newQuestion, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal(
          'Good job!',
          'Add Article Success!',
          'success'
        )
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .post{
    max-width: 1000px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .post h2{
    font-size: 3em;
    font-family: 'Alfa Slab One', cursive;
  }
</style>
