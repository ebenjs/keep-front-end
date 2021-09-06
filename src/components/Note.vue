<template>
        <div class="card shadow-sm">
          <div class="card-header">
            Created on : {{ formatTimestamp(note.createdDate) }}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ note.title }}</h5>
            <p class="card-text" v-html="formatMarkdown"></p>
            <p>
              <small>Update : {{ formatTimestamp(note.editedDate) }}</small>
            </p>
          </div>
        </div>
</template>

<script>
import moment from 'moment';
import MarkdownIt from 'markdown-it';

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
  computed: {
    formatMarkdown() {
      const md = new MarkdownIt();
      return this.truncate(md.render(this.note.content), 50);
    },
  },
};
</script>

<style>
.card{
  border-radius: 20px;
}
</style>
