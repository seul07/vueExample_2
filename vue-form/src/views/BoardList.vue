<template>
  <div class="container pt-5 text-center">
   <div id="app">
     <table class="table">
       <thead>
         <tr>
           <th>번호</th>
           <th>제목</th>
           <th>내용</th>
         </tr>
       </thead>
        <tbody v-if="items">
          <tr v-for="(item,index) in items" :key="index" @click="goView(item.boardSeq)">
            <td>{{item.boardSeq}}</td>
            <td>{{item.title}}</td>
            <td>{{item.contents}}</td>
          </tr> 
        </tbody>
      <tbody v-else> 
        <tr>
          <td>게시글 정보가 없음.</td>
        </tr>
      </tbody>
    </table>
   </div>
   <div class="ml-5 pl-5">
     <ul class='pagination'>

      <li v-if="pagingVO.startPage<pagingVO.blockSize" class='page-item disabled'><span class='page-link'>Previous</span></li>
      <li v-else class='page-item'><a class='page-link' href='#' @click="searchPage(pagingVO.startPage-pagingVO.blockSize)" v-bind:data-page='pagingVO.startPage-pagingVO.blockSize'>Previous</a></li>
      <span v-if="pagingVO.endPage>pagingVO.totalPage">

      </span>
      <span v-for="(pages,index) in (pagingVO.endPage>pagingVO.totalPage ? pagingVO.totalPage : pagingVO.endPage)" :key="index">
        <li v-if="index+1 == pagingVO.currentPage" class='page-item active' aria-current='page'>
          <span class='page-link'>{{index+1}}</span>
        </li>
        <li v-else class='page-item '>
          <a class='page-link' @click="searchPage(index+1)" href='#' v-bind:data-page="index+1">{{index+1}}</a>
        </li>
      </span>
      <li v-if="pagingVO.endPage>=pagingVO.totalPage" class='page-item disabled'><span class='page-link'>Next</span></li>
      <li v-else class='page-item'><a class='page-link' @click="searchPage(pagingVO.endPage+1)" href='#' v-bind:data-page='pagingVO.endPage+1'>Next</a></li>
     </ul>
   </div>
    <div>
     <router-link to="/add" class="create-button">
      +
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
            pagingVO : '',
            items : '',
            page : 1,   // page default 값 지정
          }
    },
  computed : {
      rows(){
          return this.items.length;
      }
  }, 
  created(){
    this.fetchData(this.page);
  },  
  methods: {
    fetchData(page){
      page
      let that = this;  //this 를 읽지 못할때 위의 this 로 직접 지정
          axios.get('/board/list',{params:{page : that.page}})
                  .then(function(response){
                      console.log(response);
                      that.items = response.data.pagingVO.dataList;
                      that.pagingVO =response.data.pagingVO;
          })
          .catch((error) => {
              console.log(error);
            });
    },
    searchPage(page){  // 페이지 클릭 했을때 번호 넘기기
      this.page = page;
      this.fetchData(this.page);
    },       
    goView(boardSeq){
      this.boardSeq = boardSeq;
      this.$router.push(`/board/view/${boardSeq}`); 
    } 
  }
}
</script>

<style>
  
</style>