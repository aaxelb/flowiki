import { computed } from '@ember-decorators/object';
import Component from '@ember/component';

export default class FlexText extends Component.extend({
  localClassNames: 'FlexText',
  tagName: 'span',
}) {
  inputText?: string;

  @computed('inputText')
  get sentences() {
    return (this.inputText || '')
      .split(/\n{2,}/)
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
};
