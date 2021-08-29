<template>
<div class="container">
    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
                <h5 class="modal-title">Confirmation</h5>
          </div>
          <div class="modal-body" v-if="currentSelectedNote">
            Are you sure you want to delete note labelled : <b>{{ currentSelectedNote.title }}</b> ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-outline-danger" @click="deleteNoteEffective">
              Yes delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="showNoteModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div class="row w-100">
              <div class="col-lg-6">
                <h5 class="modal-title">Note</h5>
              </div>
              <div class="col-lg-6 text-end p-0">
                <button class="btn btn-sm btn-outline-secondary me-2" @click="copy">
                  <span class="fas fa-copy"></span>
                  Copy
                </button>
                <button class="btn btn-sm btn-outline-primary me-2" @click="editNote">
                  Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteNote">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div class="modal-body" v-if="currentSelectedNote">
            <h4>{{ currentSelectedNote.title }}</h4>
            <div id="noteContentDiv">
              {{ currentSelectedNote.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="newNoteModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ noteModeModalTitle }}</h5>
          </div>
          <div class="modal-body">
            <p>{{ noteModeModalDescription }}</p>
            <div>
              <input type="text" class="form-control" v-model="noteTitle" placeholder="Title"/>
              <textarea class="form-control mt-3" v-model="noteContent" rows="5"
                        placeholder="Note content goes here">
                Note content goes here</textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"
                    @click="reset">Reset
              & Close
            </button>
            <button v-if="currentMode == 1" type="button" class="btn btn-outline-primary"
            @click="createNewNote">
              Save changes
            </button>
            <button v-if="currentMode == 2" type="button" class="btn btn-outline-primary"
            @click="editNoteEffective">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <h3>List of your created notes</h3>
      </div>
      <div class="col text-end">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                data-bs-target="#newNoteModal">
          Create new note
        </button>
      </div>
    </div>
    <div class="row pt-3">
      <div :class="index > 3 ? 'col-lg-3 mt-4' : 'col-lg-3'" v-for="(note, index) in notes"
           :key="note.id">
           <note :note="note" @click="showNote(note)"></note>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import copy from 'copy-to-clipboard';
import Note from './Note.vue';

export default {
  name: 'Notes',
  components: {
    Note,
  },
  data() {
    return {
      notes: [],
      currentSelectedNote: null,
      noteTitle: '',
      noteContent: '',
      showNoteModal: null,
      showDeleteConfirmationModal: null,
      newNoteModal: null,
      noteModeModalTitle: 'New note',
      noteModeModalDescription: 'You are about to add a new note',
      currentMode: 1, // 1 for creating, 2 for editing
    };
  },
  methods: {
    navigateToNewNote() {
      this.$router.push({ path: 'newNote' });
    },
    reset() {
      this.noteTitle = '';
      this.noteContent = '';
    },
    copy() {
      copy(this.currentSelectedNote.content);
      this.showToast('Note content copied!');
    },
    showToast(label) {
      const parent = document.createElement('div');
      parent.setAttribute('style', 'text-align:center');
      const toast = document.createElement('div');
      const toastStyle = `
      background-color:#333;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      margin-left: auto;
      margin-right: auto;
      width : 200px;
      height: 50px;
      z-index: 1055;
      border-radius : 30px;
      `;
      toast.setAttribute('style', toastStyle);
      const toastContent = document.createElement('span');
      toastContent.setAttribute('style', 'color:white; line-height:50px;');
      toastContent.innerText = label;
      toast.append(toastContent);
      parent.append(toast);
      document.body.appendChild(parent);
      setTimeout(() => {
        document.body.removeChild(parent);
      }, 3000);
    },
    createNewNote() {
      axios.post('http://localhost:3000/newNote', {
        title: this.noteTitle,
        content: this.noteContent,
        createdDate: Date.now(),
        editedDate: Date.now(),
      })
        .then((response) => {
          if (response.status === 201) {
            this.showToast('New note created !');
            console.log(response.data.note);
            this.notes.push(response.data.note);
            this.noteTitle = '';
            this.noteContent = '';
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
    editNote() {
      this.showNoteModal.toggle();
      this.currentMode = 2;
      this.toggleModeTexts();
      this.newNoteModal.toggle();
      this.noteTitle = this.currentSelectedNote.title;
      this.noteContent = this.currentSelectedNote.content;
    },
    editNoteEffective() {
      axios.patch('http://localhost:3000/editNote', {
        // eslint-disable-next-line no-underscore-dangle
        _id: this.currentSelectedNote._id,
        title: this.noteTitle,
        content: this.noteContent,
        editedDate: Date.now(),
      })
        .then((response) => {
          if (response.status === 201) {
            this.showToast('Note edited !');
            this.noteTitle = '';
            this.noteContent = '';
            this.newNoteModal.toggle();
            this.currentSelectedNote.title = response.data.note.title;
            this.currentSelectedNote.content = response.data.note.content;
            this.currentSelectedNote.editedDate = response.data.note.editedDate;
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
    deleteNote() {
      this.showNoteModal.toggle();
      this.showDeleteConfirmationModal.toggle();
    },
    deleteNoteEffective() {
      axios.delete('http://localhost:3000/deleteNote', { data: this.currentSelectedNote })
        .then((response) => {
          if (response.status === 204) {
            this.showDeleteConfirmationModal.toggle();
            this.showToast('Note deleted');
            this.notes = this.notes.filter((item) => item !== this.currentSelectedNote);
            console.log(response.data);
            console.log(response.message);
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
    showNote(note) {
      this.currentSelectedNote = note;
      this.showNoteModal.toggle();
    },
    toggleModeTexts() {
      if (this.currentMode === 1) {
        this.noteModeModalTitle = 'New note';
        this.noteModeModalDescription = 'You are about to add a new note';
      } else if (this.currentMode === 2) {
        if (this.currentMode === 2) {
          this.noteModeModalTitle = 'Edit note';
          this.noteModeModalDescription = 'You are about to edit a note';
        }
      }
    },
  },
  mounted() {
    this.showNoteModal = new window.bootstrap.Modal(document.getElementById('showNoteModal'));
    this.showDeleteConfirmationModal = new window.bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    this.newNoteModal = new window.bootstrap.Modal(document.getElementById('newNoteModal'));
    axios.get('http://localhost:3000/getNotes')
      .then((response) => {
        if (response.status === 200) {
          this.notes = response.data.notes;
          console.log(response.data);
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
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
