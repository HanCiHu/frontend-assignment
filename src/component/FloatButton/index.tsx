import {modeState} from '#/atom';
import {ModeType} from '#/util/constant';
import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useSetRecoilState} from 'recoil';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 50,

    bottom: 40,
    right: 20,
  },
});

const FloatButton = () => {
  const setMode = useSetRecoilState(modeState);
  const onPress = () => {
    setMode(ModeType.ADD);
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        style={styles.container}
        source={require('#/assets/images/addTask.png')}
      />
    </TouchableWithoutFeedback>
  );
};

export default FloatButton;
