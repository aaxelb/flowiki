import { action } from '@ember-decorators/object';
import Component from '@ember/component';
import { OrderedSet } from 'immutable';

import { SentenceRecord, WordEnvironment, WordRecord } from '../component';

export default class FlowTextEditXChaos extends Component.extend({
  // anything which *must* be merged to prototype here
}) {
  static positionalParams = ['environment'];
  being!: WordRecord;
  environment!: WordEnvironment;

  @action
  updateBeing(newBeing: WordRecord) {
    const { being, environment } = this;

    let siblings: OrderedSet<WordRecord>;
    if (environment.parentSentence) {
      siblings = environment.parentSentence
        .get('words')
        .delete(being)
        .add(newBeing);
    } else {
      siblings = OrderedSet(newBeing);
    }

    environment.updateSiblings(siblings);
  }

  newDefinition() {
    const { being } = this;
    const newDefinition = new SentenceRecord();
    this.updateBeing(
      being.set('definitions',
        being.get('definitions').add(newDefinition)
      ),
    );
    // TODO focus to new definition
  }

  newWord() {
    const { environment } = this;
    if (environment.parentSentence) {
      const newWord = new WordRecord();
      environment.updateSiblings(
        environment.parentSentence
          .get('words')
          .add(newWord)
      );
      // TODO focus to new word
    }
  }

  renameWord(event: KeyboardEvent) {
    const { being } = this;
    this.updateBeing(
      being.set('name', `${being.get('name')}${event.key}`),
    );
    return false;
  }

  keyPress(event: KeyboardEvent) {
    // TODO modal commands
    if (event.key === 'Enter') {
      this.newWord();
      return false;
    } else if (event.key === '/') {
      this.newDefinition();
      return false;
    } else if (event.key === 'Tab') {
      // TODO handle in x-sentence, focus next word?
    } else if (event.key && event.key.length === 1) {
      return this.renameWord(event);
    }
    return true;
  }
};
