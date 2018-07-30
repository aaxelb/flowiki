import { computed } from '@ember-decorators/object';
import Component from '@ember/component';

export default class FlexTextXWord extends Component.extend({
  localClassNames: 'FlexWord',
  tagName: 'span',
}) {
  word!: string;

  @computed('sentence')
  get synonyms() {
    return this.word
      .split('/')
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

}
