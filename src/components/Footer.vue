<template>
  <footer class="border-top">
    <div class="container">
      <div class="row">
        <div class="col py-3 lead">
          &copy; copyrights {{ currentYear }}
          Keep.
          Note taking app. Version 0.1.0
          <p class="lead">License MIT</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(), // 2020
    };
  },
};
</script>
