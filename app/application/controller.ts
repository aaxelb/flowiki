import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

const localStorageKey = 'flowiki-draft-text';

export default class ApplicationController extends Controller.extend({
  saveDraftTask: task(function *(this: ApplicationController) {
    yield timeout(1000);

    if (this.inputText) {
      window.localStorage.setItem(localStorageKey, this.inputText);
    } else {
      window.localStorage.removeItem(localStorageKey);
    }
  }).observes('inputText').restartable(),
}) {
  inputText?: string;

  setup() {
    const savedText = window.localStorage.getItem(localStorageKey);
    if (savedText) {
      this.set('inputText', savedText);
    }
  }
}
