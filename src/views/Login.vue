<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-4">
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
            this.$router.push({ name: 'home' });
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
