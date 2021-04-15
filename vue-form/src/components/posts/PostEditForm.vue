<template>
  <div class="contents">
    <h1 class="page-header">게시글 상세</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents:</label>
          <textarea id="contents" type="text" rows="5" v-model="contents" />
        </div>
        <button type="submit" class="btn">Edit</button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      contents: '',
      logMessage: '',
    };
  },
  created(){
    this.fetchData();
  },  
  methods: {
    fetchData(){
    const id = this.$route.params.id; 
    console.log(this.$route.params.id);
    let that = this;  //1. this 를 위의 this 로 직접 지정해주거나
         axios.get(`/board/view/${id}`)
                .then(function(response){
                    that.title = response.data.board.title;
                    that.contents = response.data.board.contents;
        })
        .catch((error) => {
            console.log(error);
          });
   },
  }
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
</style>
