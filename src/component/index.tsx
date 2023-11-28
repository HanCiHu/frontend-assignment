import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useRecoilValue} from 'recoil';

import Header from '#/component/Header';
import WeekList from '#/component/WeekList';
import CheckListView from '#/component/CheckListView';
import FloatButton from '#/component/FloatButton';
import ModalBackground from '#/component/ModalBackground';
import Input from '#/component/Input';
import {currentWeekState} from '#/atom';
import {getWeekData, Task} from '#/util';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    position: 'relative',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  checkList: {
    flex: 1,
  },
  input: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
});

const Layout = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const currentWeek = useRecoilValue(currentWeekState);

  const fetchTasks = useCallback(async () => {
    const weekData = await getWeekData(currentWeek);
    setTasks(weekData);
  }, [currentWeek]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.checkList}>
        <Header />
        <WeekList />
        <CheckListView tasks={tasks} setTasks={setTasks} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.input}>
        <Input setTasks={setTasks} />
      </KeyboardAvoidingView>
      <ModalBackground />
      <FloatButton />
    </SafeAreaView>
  );
};

export default Layout;
