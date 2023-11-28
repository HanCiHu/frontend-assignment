import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useSetRecoilState} from 'recoil';

import {currentWeekState, modeState} from '#/atom';
import {ModeType} from '#/util/constant';
import Week from './Week';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',

    borderBottomColor: '#F6F5F8',
    borderBottomWidth: 1,
    paddingBottom: 16,
    maxHeight: 78,
  },
});

const ITEM_WIDTH = 65;

const WeekList = () => {
  const weeks = [-1, -1, -1, ...Array(40).keys(), -1, -1, -1].map(n => n + 1);
  const [visibleItems, setVisibleItems] = useState<number[]>([0, 6]);
  const scrollRef = useRef<ScrollView>(null);
  const setCurrentWeek = useSetRecoilState(currentWeekState);
  const setMode = useSetRecoilState(modeState);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const startIndex = Math.floor(xOffset / ITEM_WIDTH);
    const endIndex = Math.round(
      (xOffset + e.nativeEvent.layoutMeasurement.width) / ITEM_WIDTH,
    );
    if (startIndex < 0) {
      setVisibleItems([0, 6]);
    } else if (endIndex > 44) {
      setVisibleItems([38, 45]);
    } else {
      setVisibleItems([startIndex, endIndex]);
    }
  };

  const onWeekPress = (index: number) => {
    if (scrollRef.current == null) {
      return;
    }
    scrollRef.current.scrollTo({
      x: index * ITEM_WIDTH,
      animated: true,
    });
  };

  const onScrollDragEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isMomentum = e.nativeEvent.velocity?.x !== 0;
    if (!isMomentum) {
      onMomentumScrollEnd();
    }
  };

  const onMomentumScrollEnd = () => {
    const index = Math.round((visibleItems[0] + visibleItems[1]) / 2);
    setCurrentWeek(index - 2);
    setMode(ModeType.WAITING);
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
      onScrollEndDrag={onScrollDragEnd}
      onMomentumScrollEnd={onMomentumScrollEnd}>
      {weeks.map((week, index) => (
        <Week
          key={index}
          week={week}
          isSelected={
            index === Math.ceil((visibleItems[0] + visibleItems[1]) / 2)
          }
          onPress={() => onWeekPress(week - 1)}
        />
      ))}
    </ScrollView>
  );
};

export default WeekList;
