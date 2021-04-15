<template>
  <header>
    <div>
       <router-link :to="logoLink" class="logo">
         VueTest
       </router-link>
    </div>
    <div class="navigations">
        <span v-if="isUserLogin">{{ $store.state.memId }} 로 로그인중</span>
       <template v-if="isUserLogin">
        <a href="javascript:;" @click="logoutUser" class="logout-button">
          Logout
        </a>
     </template> 
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <!-- <router-link to="/signup">회원가입</router-link> -->
      </template>
    </div>
  </header>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
import store from '@/store/index';

export default {
  computed: {
    isUserLogin() {
      return store.getters.isLogin;
    },
    logoLink() {
      return '/list';
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      deleteCookie('auth');
      deleteCookie('member');
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style scoped>
.username {
  color: white;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #927dfc;
  z-index: 2;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}
a {
  color: #dedede;
  font-size: 18px;
}
a.logo {
  font-size: 30px;
  font-weight: 900;
  color: white;
}
.logo > span {
  font-size: 14px;
  font-weight: normal;
}
.navigations a {
  margin-left: 10px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.logout-button {
  font-size: 14px;
}
a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
</style>
