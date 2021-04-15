<template>
    <div class="contents">
       <div class="form-wrapper form-wrapper-sm">
       <form @submit.prevent="submitForm" class="form">
        <label for="memId">memId</label>
        <input type="text" name="memId" id="memId" v-model="member.memId" />
        <label for="memPass">비밀번호</label>
        <input type="text" name="memPass" id="memPass" v-model="member.memPass" />
        <button type="submit" class="btn-primary text-center" >로그인</button>
        </form>
      </div>  
    </div>
</template>

<script>
// 토큰 및 사용자 정보를 저장하기 위해서 세션 스토리지를 사용한다.
import store from '@/store/index.js';
import { deleteCookie } from '@/utils/cookies';


export default {
  data() {
    return {
      member : {
          memId: "",
          memPass: "",
      },  
      message: "로그인해주세요.",
      status: "",
      token: "",
      info: ""
    };
  },
  methods: {
    setInfo(status, token, info) {
      this.status = status;
      this.token = token;
      this.info = info;
    },
    logoutUser() {
    this.$store.commit('clearUsername');
    this.$store.commit('clearToken');
    deleteCookie('auth');
    deleteCookie('member');
    this.$router.go(this.$router.currentRoute);
  },
    async submitForm() {
    try {
      // 비즈니스 로직
      const memData = this.member;
      await store.dispatch('LOGIN', memData);
      this.$router.push('/list');
    } catch (error) {
      // 에러 핸들링할 코드
      console.log(error);
      this.logMessage = error;
    } 
  },
  },
};
</script>

<style>

</style>