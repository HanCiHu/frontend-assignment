import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {ModeType} from '#/util/constant';
import {modeState, contentState} from '#/atom';
import {useRecoilState, useSetRecoilState} from 'recoil';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    opacity: 0.4,
    zIndex: 1,
  },
});

const ModalBackground = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const setContent = useSetRecoilState(contentState);

  if (mode !== ModeType.EDIT && mode !== ModeType.ADD) {
    return null;
  }

  const onPress = () => {
    Keyboard.dismiss();
    setMode(ModeType.WAITING);
    setContent('');
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} accessible={false}>
      <View style={styles.container} />
    </TouchableWithoutFeedback>
  );
};

export default ModalBackground;
