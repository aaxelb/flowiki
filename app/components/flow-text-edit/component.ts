import { action } from '@ember-decorators/object';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { Record, OrderedSet, Set } from 'immutable';

const localStorageKey = 'flowiki-text-edit-state';

export interface WordEnvironment {
  parentSentence: SentenceRecord | null;
  updateSiblings(siblings: OrderedSet<WordRecord>): void;
}

export interface SentenceEnvironment {
  parentWord: WordRecord | null;
  updateSiblings(siblings: Set<SentenceRecord>): void;
}

interface FlowSentence {
  words: OrderedSet<WordRecord>;
  focused: boolean;
}

const sentenceDefaults: FlowSentence = {
  words: OrderedSet(),
  focused: false,
};

interface FlowWord {
  name: string | null;
  definitions: Set<SentenceRecord>;
  focused: boolean;
}

const wordDefaults: FlowWord = {
  name: null,
  definitions: Set(),
  focused: false,
};

export class SentenceRecord extends Record(sentenceDefaults) {
  constructor(params: Partial<FlowSentence> = {}) {
    super(params);
  }

  get<T extends keyof FlowSentence>(key: T): FlowSentence[T] {
    return super.get(key);
  }
}

export class WordRecord extends Record(wordDefaults) {
  constructor(params: Partial<FlowWord> = {}) {
    super(params);
  }

  get<T extends keyof FlowWord>(key: T): FlowWord[T] {
    return super.get(key);
  }
}

export default class FlexTextEdit extends Component.extend({
  localClassNames: 'FlexTextEdit',

  saveDraftTask: task(function *(this: FlexTextEdit) {
    yield timeout(1000);

    window.localStorage.setItem(localStorageKey, JSON.stringify(this.oneSentence));
  }).restartable(),
}) {
  oneSentence: SentenceRecord = new SentenceRecord();

  @action
  updateSentence(sentence: SentenceRecord) {
    this.set('oneSentence', sentence);
  }
};
