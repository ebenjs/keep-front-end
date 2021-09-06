<template>
  <div class="container" v-if="isAuthenticated">
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
            <div id="noteContentDiv" v-html="formatMarkdown"></div>
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
              <label for="exampleColorInput" class="form-label">Choose note color</label>
              <input
                type="color"
                class="form-control form-control-color"
                title="Choose your color"
                v-model="choosedColor"
              />
              <br/>
              <input type="text" class="form-control" v-model="noteTitle" placeholder="Title" />
              <textarea
                class="form-control mt-3"
                v-model="noteContent"
                rows="5"
                placeholder="Note content goes here"
              >
                Note content goes here</textarea
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click="reset"
            >
              Reset & Close
            </button>
            <button
              v-if="currentMode == 1"
              type="button"
              class="btn btn-outline-primary"
              @click="createNewNote"
            >
              Save changes
            </button>
            <button
              v-if="currentMode == 2"
              type="button"
              class="btn btn-outline-primary"
              @click="editNoteEffective"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-lg-6 offset-lg-3">
        <form class="d-inline">
          <input
            class="form-control form-control-lg w-100 me-3 d-inline"
            type="search"
            placeholder="Search for note"
            aria-label="Search"
            v-model="searchQueryString"
          />
        </form>
      </div>
    </div>
    <div class="row pt-4">
      <div
        :class="index > 3 ? 'col-lg-3 mt-4' : 'col-lg-3'"
        v-for="(note, index) in notes"
        :key="note.id"
      >
        <note :note="note" @click="showNote(note)"></note>
      </div>
    </div>
    <button
      id="newNoteButton"
      type="button"
      class="btn btn-success shadow"
      data-bs-toggle="modal"
      data-bs-target="#newNoteModal"
    >
      <span class="fas fa-plus"></span>
    </button>
  </div>
  <div v-else>
    <div class="container">
      <div class="row">
        <div class="col d-flex flex-column justify-content-center text-center">
          <p class="mt-5">
            <img src="@/assets/img/empty_note.png" class="w-25" />
          </p>
          <h2>Empty notes</h2>
          <p class="lead">
            Your notes list is empty. Maybe you are not logged into your account !
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import copy from 'copy-to-clipboard';
import MarkdownIt from 'markdown-it';
import Note from './Note.vue';

export default {
  name: 'Notes',
  components: {
    Note,
  },
  data() {
    return {
      notes: [],
      savedNotes: [],
      currentSelectedNote: null,
      choosedColor: null,
      noteTitle: '',
      noteContent: '',
      searchQueryString: null,
      showNoteModal: null,
      showDeleteConfirmationModal: null,
      newNoteModal: null,
      noteModeModalTitle: 'New note',
      noteModeModalDescription: 'You are about to add a new note',
      currentMode: 1, // 1 for creating, 2 for editing
      headers: '',
    };
  },
  watch: {
    searchQueryString(val) {
      // eslint-disable-next-line max-len
      this.notes = this.savedNotes.filter((note) => note.title.toLowerCase().includes(val.toLowerCase()));
    },
  },
  methods: {
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
      axios
        .post('http://localhost:3000/newNote', {
          title: this.noteTitle,
          content: this.noteContent,
          color: this.choosedColor,
          createdDate: Date.now(),
          editedDate: Date.now(),
        }, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            this.showToast('New note created !');
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
      this.choosedColor = this.currentSelectedNote.color;
    },
    editNoteEffective() {
      axios
        .patch('http://localhost:3000/editNote', {
          // eslint-disable-next-line no-underscore-dangle
          _id: this.currentSelectedNote._id,
          title: this.noteTitle,
          color: this.choosedColor,
          content: this.noteContent,
          editedDate: Date.now(),
        }, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
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
            this.currentSelectedNote.color = response.data.note.color;
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
      axios
        .delete('http://localhost:3000/deleteNote', {
          data: this.currentSelectedNote,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            this.showDeleteConfirmationModal.toggle();
            this.showToast('Note deleted');
            this.notes = this.notes.filter((item) => item !== this.currentSelectedNote);
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
  computed: {
    formatMarkdown() {
      const md = new MarkdownIt();
      return md.render(this.currentSelectedNote.content);
    },
    isAuthenticated() {
      if (this.$store.state.token) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.showNoteModal = new window.bootstrap.Modal(document.getElementById('showNoteModal'));
      this.showDeleteConfirmationModal = new window.bootstrap.Modal(
        document.getElementById('deleteConfirmationModal'),
      );
      this.newNoteModal = new window.bootstrap.Modal(document.getElementById('newNoteModal'));
      this.headers = { Authorization: `Bearer ${this.$store.state.token}` };
    });
    axios
      .get('http://localhost:3000/getNotes', {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.notes = response.data.notes;
          this.savedNotes = response.data.notes;
          console.log(this.notes.length);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
        } else {
          throw error;
        }
      });
  },
};
</script>

<style scoped>
input[type='search'] {
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background-color: rgba(100, 100, 100, 0.05);
  padding-left: 30px;
}
.card {
  cursor: pointer;
}
#newNoteButton {
  border: solid 1px rgba(0, 0, 0, 0);
  position: fixed;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  bottom: 3%;
  right: 3%;
}
</style>
