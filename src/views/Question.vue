<template>
  <div>
    <Navbar/>
    <div class="question container">
      <div class="col s12 m7">
      <div class="card horizontal">
        <div class="card-image">
            <i class="material-icons" @click="upvoteQuestion(questionDetail._id)">arrow_drop_up</i><a></a>
            <p>{{ questionDetail.upvote.length - questionDetail.downvote.length }}</p>   
            <i class="material-icons" @click="downvoteQuestion(questionDetail._id)">arrow_drop_down</i><a></a>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <span class="card-title">{{ questionDetail.title }}</span><br>
            <p><span v-html="questionDetail.description"></span></p><br>
          </div>
          <div class="card-action">
            <p>by: {{ questionDetail.user.name }}</p>
            <p><span>posted: {{ question.createdAt | moment("dddd, MMMM Do YYYY") }}</span></p>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="answers container" v-for="(answer, index) in arrayAnswer" :key="index">
      <div class="col s12 m7">
      <div class="card horizontal">
        <div class="card-image">
            <i class="material-icons" @click="upvoteAnswer(answer._id)">arrow_drop_up</i><a></a>
            <p>{{ answer.upvote.length - answer.downvote.length }}</p>   
            <i class="material-icons" @click="downvoteAnswer(answer._id)">arrow_drop_down</i><a></a>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><span v-html="answer.answer"></span></p>
            <br>
          </div>
          <div class="card-action">
            <p><span>posted: {{ answer.createdAt | moment("dddd, MMMM Do YYYY") }}</span></p>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="jawaban container">
      <div class="input-field col s12">
        <editor v-model="jawaban"></editor><br>
        <button class="btn black" @click="addAnswer(question._id)">Answer</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { mapState, mapActions } from 'vuex'
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'question',
  data () {
    return {
      jawaban: '',
      arrayAnswer: '',
      questionDetail: {
        upvote: [],
        downvote: [],
        user: {
          name: ''
        }
      }
    }
  },
  components: {
    Navbar,
    Footer,
    'editor': Editor
  },
  created () {
    this.getQuestions()
    this.getAnswer()
  },
  computed: {
    ...mapState([
      'question'
    ])
  },
  methods: {
    ...mapActions([
      'newquestion',
      'getQuestions'
    ]),
    addAnswer: function (id) {
      let answer = {
        answer: this.jawaban,
        upvote: [],
        downvote: []
      }
      axios.post(`https://hacktiv-overflow-server.okywiliarso.me/answers/create/${id}`, answer, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.getAnswer()
        this.jawaban = ''
        swal(
          'Good job!',
          'Add Article Success!',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Sign In First!'
        })
      })
    },
    upvoteQuestion: function (id) {
      axios.put(`https://hacktiv-overflow-server.okywiliarso.me/questions/upvote/${id}`, {
        user: localStorage.getItem('id')
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal(
          'Good job!',
          'Upvote Success!',
          'success'
        )
        this.getAnswer()
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot Upvote!'
        })
      })
    },
    downvoteQuestion: function (id) {
      axios.put(`https://hacktiv-overflow-server.okywiliarso.me/questions/downvote/${id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.getAnswer()
        swal(
          'Good job!',
          'Downvote Success!',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot Downvote!'
        })
      })
    },
    upvoteAnswer: function (id) {
      axios.put(`https://hacktiv-overflow-server.okywiliarso.me/answers/upvote/${id}`, {
        user: localStorage.getItem('id')
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.getAnswer()
        swal(
          'Good job!',
          'Upvote Success!',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot Upvote!'
        })
      })
    },
    downvoteAnswer: function (id) {
      axios.put(`https://hacktiv-overflow-server.okywiliarso.me/answers/downvote/${id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.getAnswer()
        swal(
          'Good job!',
          'Upvote Success!',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Cannot Downvote!'
        })
      })
    },
    getAnswer: function () {
      let self = this
      axios.get(`https://hacktiv-overflow-server.okywiliarso.me/questions/${this.question._id}`)
      .then(response => {
        self.questionDetail = response.data.response
        self.arrayAnswer = response.data.response.answers
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .question {
    margin-top: 40px;
  }
  .card-title {
    font-size: 3em;
    font-family: 'Alfa Slab One', cursive;
  }
  i {
    font-size: 40px;
  }
  .card-image p {
    font-size: 20px;
    margin-left: 13px;   
  }
  i:hover {
    background-color: rgb(32, 218, 209);
    cursor: pointer;
  }
</style>
