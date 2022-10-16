<template>
  <div class="card shadow-sm" :style="{ 'background-color': note.color }">
    <div class="card-header">Created on : {{ formatTimestamp(note.createdDate) }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ note.title }}</h5>
      <p class="card-text" v-html="formatMarkdown"></p>
    </div>
    <div class="card-footer">
        <small>Update : {{ formatTimestamp(note.editedDate) }}</small>
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
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    truncate(text, limit) {
      if (text.length > limit) {
        return `${text.substring(0, limit - 1)}...`;
      }
      return text;
    },
    setColor() {
      return `background-color : ${this.note.color}`;
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

<style scoped>
.card {
  border-radius: 20px;
  height: 200px;
  overflow: hidden;
}
.card-body{
  padding-bottom: 0;
}
.card-footer{
  border: 0;
  margin: 0;
  background-color: rgba(0,0,0,0);
}
</style>
