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
  updateDefinitions(definitions: Set<SentenceRecord>) {
    const { being, environment } = this;
    const newBeing = being.set('definitions', definitions);

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
};
