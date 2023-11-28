import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Task} from '#/util';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 36,
  },
  infoText: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',

    justifyContent: 'space-between',
    marginBottom: 18,
  },
  completedText: {
    fontSize: 16,
    lineHeight: 21.79,
    fontWeight: 'bold',
  },
  percentageText: {
    fontSize: 14,
    lineHeight: 19.07,
    fontWeight: 'bold',
  },
  bar: {
    position: 'relative',
    width: '100%',
    height: 6,
    backgroundColor: '#F6F5F8',

    borderRadius: 10,
  },
  progress: {
    width: 0,
    height: 6,
    position: 'absolute',
    backgroundColor: '#44CEC6',
    borderRadius: 10,
  },
});

interface ProgressBarProps {
  tasks: Task[];
}

const ProgressBar = ({tasks}: ProgressBarProps) => {
  if (tasks.length === 0) {
    return null;
  }

  const completedTasks = tasks.filter(task => task.isCompleted);

  const barStyle = [
    styles.progress,
    {width: `${(completedTasks.length / tasks.length) * 100}%`},
  ] as StyleProp<ViewStyle>;

  return (
    <View style={styles.container}>
      <View style={styles.infoText}>
        <Text
          style={
            styles.completedText
          }>{`${completedTasks.length} of ${tasks.length} completed`}</Text>
        <Text style={styles.percentageText}>{`${Math.round(
          (completedTasks.length / tasks.length) * 100,
        )} %`}</Text>
      </View>
      <View style={styles.bar}>
        <View style={barStyle} />
      </View>
    </View>
  );
};

export default ProgressBar;
