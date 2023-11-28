import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: 50,
    height: 62,
    borderRadius: 40,
    marginHorizontal: 7.5,
  },
  emptyContainer: {
    width: 50,
    height: 62,
    marginHorizontal: 7.5,
  },
  text: {
    fontSize: 11,
    lineHeight: 14.98,
  },
  week: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24.52,
  },
});

interface WeekProps {
  week: number;
  isSelected: boolean;
  onPress: () => void;
}

const Week = ({week, isSelected, onPress}: WeekProps) => {
  if (week === 0) {
    return <View style={styles.emptyContainer} />;
  }

  const containerStyle = [
    styles.container,
    {backgroundColor: isSelected ? '#44CEC6' : '#F6F5F8'},
  ];
  const textStyle = [styles.text, {color: isSelected ? '#FFFFFF' : '#999999'}];
  const weekStyle = [styles.week, {color: isSelected ? '#FFFFFF' : '#999999'}];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text style={textStyle}>{'week'}</Text>
      <Text style={weekStyle}>{week}</Text>
    </TouchableOpacity>
  );
};

export default Week;
