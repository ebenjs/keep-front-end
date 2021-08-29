<template>
        <div class="card">
          <div class="card-header">
            Created on : {{ formatTimestamp(note.createdDate) }}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ note.title }}</h5>
            <p class="card-text">{{ truncate(note.content, 50) }}</p>
            <p>
              <small>Update : {{ formatTimestamp(note.editedDate) }}</small>
            </p>
          </div>
        </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Note',
  props: {
    note: Object,
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return moment(date)
        .format('YYYY-MM-DD HH:mm:ss');
    },
    truncate(text, limit) {
      if (text.length > limit) {
        return `${text.substring(0, limit - 1)}...`;
      }
      return text;
    },
  },
};
</script>

<style>
</style>
