import { helper } from '@ember/component/helper';

export function shuffled([array]: [any[]]) {
  return array.map(() => array[
    Math.floor(Math.random() * array.length)
  ]);
}

export default helper(shuffled);
