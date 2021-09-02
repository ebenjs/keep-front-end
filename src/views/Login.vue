<template>
  <div class="container">
    <div class="row mt-4">
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
              <div class="mb-4">
                <p class="mt-5">Enter your account username</p>
                <input type="text" class="form-control" placeholder="Username">
              </div>
              <div class="mb-4">
                <p class="">Enter your password</p>
                <input type="password" class="form-control" placeholder="Password">
              </div>
            </form>
            <a href="#" class="btn btn-primary" @click="login">Go to dashboard</a>
          </div>
        </div>
      </div>
      <div class="col-lg-7 text-center">
        <img src="@/assets/img/notes.png" alt="note_picture" class="w-50" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
    },
  },
};
</script>

<style></style>
