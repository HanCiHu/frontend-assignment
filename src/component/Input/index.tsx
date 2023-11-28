import {addTask, updateTask} from '#/util';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  Dimensions,
  Image,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Task} from '#/util';
import {contentState, currentWeekState, modeState} from '#/atom';
import {ModeType} from '#/util/constant';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    height: 66,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,

    backgroundColor: '#FAFAFA',
    borderColor: '#EAE9ED',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  inputText: {
    maxWidth: screenWidth - 70,
    height: 21,
    paddingHorizontal: 16,
    color: '#333333',
  },
  button: {
    position: 'absolute',
    width: 32,
    height: 32,

    right: 10,
  },
});

interface InputProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const Input = ({setTasks}: InputProps) => {
  const [content, setContent] = useRecoilState(contentState);
  const weekNumber = useRecoilValue(currentWeekState);
  const [text, setText] = useState(content);
  const [mode, setMode] = useRecoilState(modeState);
  const textInputRef = useRef<TextInput>(null);

  const canUploadText = text !== '';

  const onUploadButtonPress = async () => {
    if (canUploadText) {
      const newTasks =
        mode === ModeType.EDIT
          ? await updateTask(weekNumber, content, text)
          : await addTask(weekNumber, text);
      setText('');
      setTasks(newTasks);
    } else {
      setText(content);
    }
    setMode(ModeType.WAITING);
    setContent('');
    Keyboard.dismiss();
  };

  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };

  useEffect(() => {
    if (!textInputRef.current) {
      return;
    }
    if (mode === ModeType.ADD || mode === ModeType.EDIT) {
      textInputRef.current.focus();
    }
    setText(content);
  }, [content, mode, textInputRef]);

  if (mode !== ModeType.ADD && mode !== ModeType.EDIT) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          ref={textInputRef}
          style={styles.inputText}
          value={text}
          placeholder="Add a checklist..."
          onChange={onChangeText}
          onSubmitEditing={onUploadButtonPress}
        />
        <TouchableWithoutFeedback onPress={onUploadButtonPress}>
          <Image
            style={styles.button}
            source={
              canUploadText
                ? require('#/assets/images/ableUpload.png')
                : require('#/assets/images/enableUpload.png')
            }
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Input;
