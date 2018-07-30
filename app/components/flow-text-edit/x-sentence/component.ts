import { action } from '@ember-decorators/object';
import Component from '@ember/component';
import { OrderedSet, Set } from 'immutable';

import { SentenceEnvironment, SentenceRecord, WordRecord } from '../component';

export default class FlowTextEditXOrder extends Component.extend({
  // anything which *must* be merged to prototype here
}) {
  static positionalParams = ['environment'];
  being!: SentenceRecord;
  environment!: SentenceEnvironment;

  @action
  updateWords(words: OrderedSet<WordRecord>) {
    const { being, environment } = this;
    const newBeing = being.set('words', words);

    let siblings: Set<SentenceRecord>;
    if (environment.parentWord) {
      siblings = environment.parentWord
        .get('definitions')
        .delete(being)
        .add(newBeing);
    } else {
      siblings = Set(newBeing);
    }

    environment.updateSiblings(siblings);
  }
};
