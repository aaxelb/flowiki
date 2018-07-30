import { computed } from '@ember-decorators/object';
import Component from '@ember/component';

export default class FlexTextXSentence extends Component.extend({
  localClassNames: 'FlexSentence',
  tagName: 'span',
}) {
  sentence!: string;

  @computed('sentence')
  get words() {
    return this.sentence
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
}
