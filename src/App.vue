<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark shadow-sm bg-success">
  <div class="container">
    <router-link class="navbar-brand" to="/">{{ appName }}</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
    aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isAuthenticated()">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Signup</a>
        </li>
      </ul>
      <form class="d-flex" v-if="isAuthenticated()">
        <input class="form-control me-2" type="search" placeholder="Search for note"
        aria-label="Search">
        <button class="btn btn-outline-light" type="submit">Search</button>
      </form>
      <div v-else>
        <a class="github-button" href="https://github.com/ebenezer10/keep-front-end" data-size="large" aria-label="Star ebenezer10/keep-front-end on GitHub">Star</a>
        <span class="ps-3">
          <a class="github-button" href="https://github.com/sponsors/ebenezer10" data-icon="octicon-heart" data-size="large" aria-label="Sponsor @ebenezer10 on GitHub">Sponsor</a>
        </span>
      </div>
    </div>
  </div>
</nav>
  <nav class="border-bottom bg-success text-white">
    <div class="container">
      <div class="row py-4">
        <div class="col">
          <h1>
            Note keeper
          </h1>
          <p>Your open source note synchronization solution.</p>
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>

export default {
  components: {
  },
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
  },
};
</script>

<style>
</style>
