<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark shadow-sm bg-success">
    <div class="container">
      <router-link class="navbar-brand" to="/">{{ appName }}</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isAuthenticated()">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Help</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contribute</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Donate</a>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
          <li class="nav-item">
            <router-link class="nav-link active" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/register">Signup</router-link>
          </li>
        </ul>
        <div v-if="!isAuthenticated()">
          <a
            class="github-button"
            href="https://github.com/ebenezer10/keep-front-end"
            data-size="large"
            aria-label="Star ebenezer10/keep-front-end on GitHub"
            >Star</a
          >
          <span class="ps-3">
            <a
              class="github-button"
              href="https://github.com/sponsors/ebenezer10"
              data-icon="octicon-heart"
              data-size="large"
              aria-label="Sponsor @ebenezer10 on GitHub"
              >Sponsor</a
            >
          </span>
        </div>
        <div v-else>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">

              <img src="https://picsum.photos/200" class="rounded-circle d-inline" width="30" />
              <router-link
                class="nav-link dropdown-toggle active d-inline"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="/"
                >{{ getUserName }}</router-link>

              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      appName: 'Keep',
    };
  },
  methods: {
    isAuthenticated() {
      if (this.$store.state.token) {
        return true;
      }
      return false;
    },
    logout() {
      this.$store.commit('setToken', null);
      this.$store.commit('setUser', null);
      this.$router.push({ name: 'login' });
    },
  },
  computed: {
    getUserName() {
      return this.$store.state.user.username;
    },
  },
};
</script>
