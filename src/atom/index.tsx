import {atom} from 'recoil';

export const modeState = atom({
  key: 'modeState',
  default: 'Edit',
});

export const currentWeekState = atom({
  key: 'currentWeekState',
  default: 1,
});

export const contentState = atom({
  key: 'contentState',
  default: '',
});
