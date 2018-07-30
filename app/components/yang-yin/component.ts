import Component from '@ember/component';

export default class YangYin extends Component.extend({
  tagName: '',
}) {
  // Required arguments
  yang!: any;
  yin!: any;
  environment!: any;

  // Optional arguments
  inChaos: boolean = false;
};
