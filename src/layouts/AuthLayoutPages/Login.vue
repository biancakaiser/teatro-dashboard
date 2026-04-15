<template>
  <div class="md-layout text-center">
    <!-- <div class="md-layout-item md-size-100">
      <img id="login-logo" src="/img/logo-name.png" style="margin-bottom: 0">
    </div> -->
    <div class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="">
        <!-- <h4 slot="title" class="title">Log in</h4> -->
        <!-- <md-button slot="buttons" to="#facebook" class="md-just-icon md-simple md-white">
          <i class="fab fa-facebook-square"></i>
        </md-button>
        <md-button slot="buttons" to="#twitter" class="md-just-icon md-simple md-white">
          <i class="fab fa-twitter"></i>
        </md-button>
        <md-button slot="buttons" to="#google" class="md-just-icon md-simple md-white">
          <i class="fab fa-google-plus-g"></i>
        </md-button> -->
        <p slot="description" class="description" id="loginTitle">Login</p>
        <!-- <md-field class="md-form-group" slot="inputs">
          <md-icon>face</md-icon>
          <label>First Name...</label>
          <md-input v-model="firstname"></md-input>
        </md-field> -->

        <!-- <form @submit.prevent="executeLogin"> -->
          <md-field class="md-form-group" slot="inputs">
            <md-icon>email</md-icon>
            <label>Email</label>
            <md-input @keydown.enter="executeLogin" @keydown="tooltipActive = false" v-model="email" type="email"></md-input>
          </md-field>
          <md-field class="md-form-group" slot="inputs">
            <md-icon>lock_outline</md-icon>
            <label>Senha</label>
            <md-input @keydown.enter="executeLogin" @keydown="tooltipActive = false" type="password" v-model="password"></md-input>
          </md-field>

          <md-button @click="executeLogin" slot="footer" class="md-accent md-lg" type='submit'>
            Entrar
          </md-button>
        <!-- </form> -->
      </login-card>
    </div>
  </div>
</template>
<script>
import User from "@/api/User.vue";
import session from "@/api/session.vue";
import swal from "sweetalert2";

import { LoginCard } from "@/components";
export default {
  components: {
    LoginCard
  },
  methods: {
    executeLogin: function() {
      if (
        !this.email ||
        !this.password ||
        this.password.length < 1 ||
        this.email.length < 1
      )
        return this.showFailSwal("Preencha os campos de login.");

      return User.login({ email: this.email, password: this.password })
        .then(response => {
          if (response.success) this.$router.push("/visao-geral");
        })
        .catch(error => {
          if (error.message === "API_FORBIDDEN") {
            this.showFailSwal("Email ou senha incorretos.");
          } else {
            this.showFailSwal();
					}
        })
    },
    showFailSwal(message = "Houve uma falha no servidor.") {
      swal({
        title: "Erro",
        text: message,
        type: "error",
        confirmButtonClass: "md-button md-danger",
        buttonsStyling: false,
        animation: false
      });
    }
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  created() {
    if (session.isActive()) {
      this.$router.push("/visao-geral");
    }
  }
};
</script>

<style>
#loginTitle {
  font-size: 24px;
  color: black;
  margin-bottom: 40px;
  margin-top: -15px;
}

#login-logo {
  height: auto;

  margin: 0 auto 50px;
  width: 200px;
  display: block;
}

@media (max-width: 768px) {
  .login-page.page-header > .container {
    padding-top: 0;
  }
}
</style>

