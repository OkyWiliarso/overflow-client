<template>
  <div class="home">
   <Navbar/>
    <br>
    <h3>Questions.</h3>
      <ul class="collection">
        <div v-for="(question, index) in questions" :key="index">
          <li class="collection-item avatar">
            <img src="paper.png" class="circle">
            <router-link to="question">
            <span class="title" @click="questionDetail(question)">{{question.title}}</span>
            </router-link>
            <p>By: {{ question.user.name }}</p>
            <a v-if="loginStatus" class="secondary-content" @click="deleteArticle(question._id)" href="#"><i class="material-icons">delete</i></a>
          </li>
        </div>
      </ul>
   
   <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { mapState, mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    Navbar,
    Footer    
  },
  computed: {
    ...mapState([
      'questions',
      'loginStatus'
    ])
  },
  created () {
    this.getQuestions()
  },
  methods: {
    ...mapActions([
      'getQuestions'
    ]),
    questionDetail: function (question) {
      this.$store.dispatch('newquestion', question)
    }
  }
}
</script>

<style scoped>
  h3 {
    margin-left: 10px;
    font-family: 'Alfa Slab One', cursive;
  }
</style>

