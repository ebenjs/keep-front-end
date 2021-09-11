<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-4">
        <div class="card">
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">Registration</h5>
            <p class="card-text">
              Register to start taking notes or
              <router-link to="/login">sign in</router-link>
              to your account if you already have one.
            </p>
            <form>
              <div class="mb-4">
                <p class="mt-5">Enter your account informations</p>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      v-model="firstName"
                      class="form-control"
                      placeholder="Firstname"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      v-model="lastName"
                      class="form-control"
                      placeholder="Lastname"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <p>Enter your email address</p>
                <input type="text" v-model="email" class="form-control" placeholder="Username" />
                <small>*This email will be used as your username</small>
              </div>
              <div class="mb-4">
                <p>Choose a strong password</p>
                <div class="row">
                  <div class="col">
                    <input
                      type="password"
                      v-model="firstPassword"
                      class="form-control"
                      placeholder="Password"
                    />
                    <small>*8 minimum carachters</small>
                  </div>
                  <div class="col">
                    <input
                      type="password"
                      v-model="secondPassword"
                      class="form-control"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </div>
            </form>
            <a href="#" class="btn btn-primary w-100" @click="register">Register</a>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div :class="'alert alert-' + errorType" role="alert" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div :class="'alert alert-' + errorType" role="alert" v-if="errorsList.length > 0">
          <ul>
            <li v-for="error in errorsList" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      firstPassword: '',
      secondPassword: '',
      errorMessage: null,
      errorsList: [],
      errorType: 'danger',
    };
  },
  methods: {
    register() {
      axios
        .post('http://localhost:3000/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.email,
          email: this.email,
          password: { first: this.firstPassword, second: this.secondPassword },
        })
        .then((response) => {
          if (response.status === 200) {
            this.$store.commit('setToken', response.data.token);
            this.$store.commit('setUser', response.data.user);
            this.errorType = 'success';
            this.errorMessage = response.data.message;
            this.$router.push({ name: 'login', params: { newlyCreated: true } });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log('error', error);
            console.log('error', error.response);
            console.log('error', error.response.data);
            console.log('error', error.response.data.message);
            this.errorType = 'danger';
            this.errorMessage = error.response.data.message;
            if (error.response.data.errors) this.errorsList = error.response.data.errors;
            else this.errorsList = [];
          } else {
            throw error;
          }
        });
    },
  },
};
</script>

<style></style>
