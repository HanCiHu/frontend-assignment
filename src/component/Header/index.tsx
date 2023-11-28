import React from 'react';
import {useRecoilState} from 'recoil';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {modeState} from '#/atom';
import {ModeType} from '#/util/constant';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',

    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 21.79,
  },
  editButton: {
    right: 20,
    position: 'absolute',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 23,
  },
});

const Header = (): JSX.Element => {
  const [mode, setMode] = useRecoilState(modeState);

  const onPress = () => {
    setMode(mode === ModeType.DELETE ? ModeType.WAITING : ModeType.DELETE);
  };

  const text = mode === ModeType.DELETE ? 'Done' : 'Edit';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Checklists'}</Text>
      <TouchableOpacity style={styles.editButton} onPress={onPress}>
        <Text style={styles.editButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
