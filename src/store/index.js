import { createStore } from 'vuex';
import MarkdownIt from 'markdown-it';

export default createStore({
  state: {
    md: new MarkdownIt(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
