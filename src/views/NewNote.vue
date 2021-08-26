<template>
  <div>
    <input type="text" v-model="noteTitle">
    <p>{{ noteTitle }}</p>
    <input type="text" v-model="noteContent">
    <p>{{ noteContent }}</p>
    <button @click="createNewNote">Save note</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewNote',
  data() {
    return {
      noteTitle: '',
      noteContent: '',
    };
  },
  methods: {
    createNewNote() {
      axios.post('http://localhost:3000/newNote', {
        title: this.noteTitle,
        content: this.noteContent,
        createdDate: Date.now(),
        editedDate: Date.now(),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log(`New store value : ${response}`);
            console.log(`New store value : ${response.status}`);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.message);
          } else {
            throw error;
          }
        });
    },
  },
};
</script>

<style scoped>

</style>
