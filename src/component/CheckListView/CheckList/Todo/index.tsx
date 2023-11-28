import React, {Dispatch} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';

import {Task, completeTask, deleteTask} from '#/util';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {contentState, modeState} from '#/atom';
import {ModeType} from '#/util/constant';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,

    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginVertical: 10,
  },
  contentWrapper: {marginRight: 20},
  content: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexShrink: 1,
  },
});

interface Todorops {
  content: string;
  weekNumber: number;
  isCompleted: boolean;
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
}

const Todo = ({content, weekNumber, isCompleted, setTasks}: Todorops) => {
  const [mode, setMode] = useRecoilState(modeState);
  const setContent = useSetRecoilState(contentState);
  const textStyle = [
    styles.content,
    {textDecorationLine: isCompleted ? 'line-through' : 'none'},
  ] as StyleProp<TextStyle>;

  const onCheckPress = async () => {
    const newTask = await completeTask(weekNumber, content);
    setTasks(newTask);
  };

  const onDeletePress = async () => {
    const newTask = await deleteTask(weekNumber, content);
    setTasks(newTask);
  };

  const onEditPress = () => {
    setMode(ModeType.EDIT);
    setContent(content);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onCheckPress} activeOpacity={1}>
          <Image
            source={
              isCompleted
                ? require('#/assets/images/checked.png')
                : require('#/assets/images/uncheck.png')
            }
            style={styles.checkbox}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentWrapper} onPress={onEditPress}>
          <Text style={textStyle}>{content}</Text>
        </TouchableOpacity>
      </View>
      {mode === ModeType.DELETE && (
        <TouchableOpacity onPress={onDeletePress}>
          <Image
            source={require('#/assets/images/deleteButton.png')}
            style={styles.checkbox}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Todo;
