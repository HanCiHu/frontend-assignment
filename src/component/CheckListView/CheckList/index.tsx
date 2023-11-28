import React, {Dispatch} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {Task} from '#/util';
import Todo from './Todo';

interface CheckListProps {
  tasks: Task[];
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CheckList = ({tasks, setTasks}: CheckListProps) => {
  const renderTodo = ({item}: {item: Task}) => (
    <Todo
      weekNumber={item.weekNumber}
      content={item.content}
      isCompleted={item.isCompleted}
      setTasks={setTasks}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTodo}
        keyExtractor={item => `${item.weekNumber}-${item.content}`}
      />
    </View>
  );
};

export default CheckList;
