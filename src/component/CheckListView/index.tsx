import React, {Dispatch} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Task} from '#/util';
import ProgressBar from './ProgressBar';
import CheckList from './CheckList';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flex: 1,
  },
  noCheckList: {
    height: 221,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 100,
  },
  InfoText: {
    fontSize: 20,
    lineHeight: 27.24,
    color: '#84858F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailInfoText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#999999',
  },
});

interface CheckListViewProps {
  tasks: Task[];
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
}

const CheckListView = ({tasks, setTasks}: CheckListViewProps) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.noCheckList}>
        <Image
          source={require('#/assets/images/emptyChecklist.png')}
          width={190}
          height={140}
        />
        <Text style={styles.InfoText}>{'No Checklists'}</Text>
        <Text style={styles.detailInfoText}>
          {'Add checklists that should be checked weekly.'}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ProgressBar tasks={tasks} />
      <CheckList tasks={tasks} setTasks={setTasks} />
    </View>
  );
};

export default CheckListView;
