<template>
  <navbar></navbar>
  <div class="border-bottom bg-success text-white">
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
  </div>
  <router-view/>
  <Footer/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
</style>
