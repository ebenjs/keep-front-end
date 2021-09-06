<template>
  <footer class="border-top mt-5">
    <div class="container">
      <div class="row">
        <div class="col py-3">
          &copy; copyrights {{ currentYear }}
          Keep.
          Note taking app. Version 0.1.0
          <p>License MIT</p>
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
