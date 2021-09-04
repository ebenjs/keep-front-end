<template>
  <div class="container">
    <div class="row mt-4">
      <div
        class="col-lg-6 lg-offset-1 text-center d-flex flex-column
        justify-content-center text-center">
        <h1>Welcome on keep</h1>
        <h2>The free and opensource note keeping app.</h2>
        <p class="lead">
          If you are new here, begins by creating a new account and start saving notes now.
        </p>
        <p>
          <button class="btn btn-lg btn-primary">Create account</button>
        </p>
        <!-- <img src="@/assets/img/notes.png" alt="note_picture" class="w-50" /> -->
      </div>
      <div class="col-lg-5">
        <div class="card">
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">Login</h5>
            <p class="card-text">
              Login to your account to start taking notes or
              <router-link to="/">create a new account</router-link>
              if you don't already have one.
            </p>
            <form>
              <div :class="'alert alert-' + errorType" role="alert" v-if="errorMessage">
                {{ errorMessage }}
              </div>

              <div class="mb-4">
                <p class="mt-5">Enter your account username</p>
                <input type="text" v-model="username" class="form-control" placeholder="Username" />
              </div>
              <div class="mb-4">
                <p class="">Enter your password</p>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
            </form>
            <a href="#" class="btn btn-primary" @click="login">Go to dashboard</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      errorType: 'danger',
      token: '',
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
          token: this.$store.state.token,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit('setToken', response.data.token);
            this.$store.commit('setUser', response.data.user);
            this.errorType = 'success';
            this.errorMessage = response.data.message;
          }
        })
        .catch((error) => {
          if (error.response) {
            this.errorType = 'danger';
            this.errorMessage = error.response.data.message;
          } else {
            throw error;
          }
        });
    },
  },
};
</script>

<style></style>
