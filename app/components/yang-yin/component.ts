import Component from '@ember/component';

export default class YangYin extends Component.extend({
  tagName: '',
}) {
  // Required arguments
  order!: any;
  chaos!: any;

  // Optional arguments
  environment?: any;
  inChaos: boolean = false;

  /*

  @computed('yang', 'yin')
  get binary() {
    return {
      [Binary.Yang]: this.yang,
      [Binary.Yin]: this.yin,
    };
  }

  @computed('binary', 'time')
  get yangYin() {
    return this.binary[this.now];
  }

  @computed('binary')
  get yangYin() {
    switch(this.now) {
      case Binary.Yang:
        return this.yang;
      case Binary.Yin:
        return this.yin;
    }
  }

  @computed('yangYin', 'now')
  get foo() {
    return this.yangYin[this.now];
  }

  @computed('yin', 'yang', 'now')
  get bar() {
    return this.yangYin[this.now];
  }

  */
};
