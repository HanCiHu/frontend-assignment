import AsyncStorage from '@react-native-async-storage/async-storage';

import {CHECKLIST_KEY} from './constant';
import checklistJson from '#/assets/checklist/checklist_seed.json';

export interface Task {
  weekNumber: number;
  content: string;
  isCompleted: boolean;
}

export const getCheckListData = async (): Promise<Task[]> => {
  const checkListData = await AsyncStorage.getItem(CHECKLIST_KEY);
  if (checkListData) {
    return JSON.parse(checkListData);
  }
  const newCheckListData = checklistJson.map(
    (data: Omit<Task, 'isCompleted'>) => ({
      ...data,
      isCompleted: false,
    }),
  );

  await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(newCheckListData));
  return newCheckListData;
};

export const addTask = async (weekNumber: number, content: string) => {
  const checkListData = await getCheckListData();
  const weekData: Task = {weekNumber, content, isCompleted: false};
  if (
    !checkListData.some(
      data => data.weekNumber === weekNumber && data.content === content,
    )
  ) {
    const newCheckListData = [...checkListData, weekData];
    await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(newCheckListData));
    return newCheckListData.filter(
      (data: Task) => data.weekNumber === weekNumber,
    );
  } else {
    return completeTask(weekNumber, content);
  }
};

export const getWeekData = async (weekNumber: number) => {
  const checkListData = await getCheckListData();
  return checkListData.filter(weekData => weekData.weekNumber === weekNumber);
};

export const completeTask = async (weekNumber: number, content: string) => {
  const checkListData = await getCheckListData();
  const weekDataIndex = checkListData.findIndex(
    data => data.weekNumber === weekNumber && data.content === content,
  );
  if (weekDataIndex > -1) {
    checkListData[weekDataIndex].isCompleted =
      !checkListData[weekDataIndex].isCompleted;
    await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkListData));
  }
  return checkListData.filter(weekData => weekData.weekNumber === weekNumber);
};

export const updateTask = async (
  weekNumber: number,
  content: string,
  newContent: string,
) => {
  const checkListData = await getCheckListData();
  const weekDataIndex = checkListData.findIndex(
    data => data.weekNumber === weekNumber && data.content === content,
  );
  if (weekDataIndex > -1) {
    checkListData[weekDataIndex].content = newContent;
    await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkListData));
  }
  return checkListData.filter(weekData => weekData.weekNumber === weekNumber);
};

export const deleteTask = async (weekNumber: number, content: string) => {
  const checkListData = await getCheckListData();
  const weekDataIndex = checkListData.findIndex(
    data => data.weekNumber === weekNumber && data.content === content,
  );
  if (weekDataIndex > -1) {
    checkListData.splice(weekDataIndex, 1);
    await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkListData));
  }
  return checkListData.filter(weekData => weekData.weekNumber === weekNumber);
};
