<template>
  <div v-show="!$store.state.is_login">
    <div class="center">
      <vs-dialog not-close prevent-close v-model="active">
        <template #header>
          <h4 class="not-margin">
            Login
          </h4>
        </template>

        <div class="con-form">
          <vs-input v-model="loginForm.username" placeholder="Username">
            <template #icon>
              <i class='bx bx-user'></i>
            </template>
          </vs-input>
          <vs-input type="password" v-model="loginForm.password" placeholder="Password">
            <template #icon>
              <i class='bx bxs-lock'></i>
            </template>
          </vs-input>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click.prevent="login()">
              Sign In
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',

  components: {
    HelloWorld,
  },
  data() {
    return {
      active: true,
      data:process.env.VUE_APP_BACKEND,
      loginForm: {
        username: "",
        password: "",
      },
      url: process.env.VUE_APP_API,
    };
  },
  mounted: function () {
    if (this.$store.state.is_login == false) {
      localStorage.clear();
    }
  },
  methods: {
    login() {
      this.$store.commit("doLogin", JSON.stringify(this.loginForm));
      this.$store.commit("changeDrawer", true);
      console.log(process.env.VUE_APP_BACKEND+'dd');
    },
  },
}
</script>

<style lang="stylus">
  getColor(vsColor, alpha = 1)
      unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
  getVar(var)
      unquote("var(--vs-"+var+")")
  .not-margin
    margin 0px
    font-weight normal
    padding 10px
  .con-form
    width 100%
    .flex
      display flex
      align-items center
      justify-content space-between
      a
        font-size .8rem
        opacity .7
        &:hover
          opacity 1
    .vs-checkbox-label
      font-size .8rem
    .vs-input-content
      margin 10px 0px
      width calc(100%)
      .vs-input
        width 100%
  .footer-dialog
    display flex
    align-items center
    justify-content center
    flex-direction column
    width calc(100%)
    .new
      margin 0px
      margin-top 20px
      padding: 0px
      font-size .7rem
      a
        color getColor('primary') !important
        margin-left 6px
        &:hover
          text-decoration underline
    .vs-button
      margin 0px
  </style>
