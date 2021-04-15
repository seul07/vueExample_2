<template>
   <div id="app" class="w-50 mt-5 pt-2 pl-5 ml-5">
      <div> 
         <h1 class="text-left">새 게시글</h1>
        <form v-on:submit.prevent="insertData">
            제목 : <input type="text" class="form-control" v-model="board.title">
                  <p v-if="!isTitleValid" class="validation-text warning isContentTooLong">
                    형식에 맞게 입력하세요</p>
            내용 : <input type="text" class="form-control" v-model="board.contents">
                  <p v-if="!isContentsValid" class="validation-text warning isContentTooLong">
                    형식에 맞게 입력하세요</p>
        <button class="btn btn-primary mt-2" type="submit">등록</button>
        </form>
      </div>
       <div>
        <router-link to="/list" class="create-button">
         목록
        </router-link>
      </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
data : function() {
      return {
        board : {
          title : '',
          contents : '',
        },
      };
  },
computed: {
    isTitleValid() {
      return this.board.title.length < 30 || this.board.title.length >= 30!=0 ;
    },
    isContentsValid() {
      return this.board.contents.length <= 200 || this.board.contents.length !=0;
    },
},  
methods: {
  insertData:function(){
        axios.post('/board/save',this.board)
          .then((res)=>{
              console.log(res.data.message)
            // this.fetchData();
            this.$router.push('/list');
          })
          .catch((err)=>{
            console.log(err)
          })

  }
}
};
</script>

<style>

</style>