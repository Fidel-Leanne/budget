import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { Feather } from '@expo/vector-icons';

const CircularChart = () => {
  const widthAndHeight = 180; // Reduced size for better fit
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

  return (
    <View className=" bg-slate-700 mt-5 rounded-xl w-[350px] ml-5 items-center p-4">
      <Text className="text-white font-psemibold mt-0 mb-5">Your Expenses</Text>
      <View className="h-[180px] w-[330px] ml-5 rounded-xl items-center flex-row justify-center">
        <View className="relative items-center justify-center mt-0 ml-0">
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.7}
            coverFill={''}
          />
          <Text style={styles.currencyText}>N$0</Text>
        </View>
        <View className="flex-row items-center ml-4">
          <Feather name="box" size={24} color="white" />
          <Text className="text-white ml-2 font-pregular">NA</Text>
        </View>
      </View>
    </View>
  );
};

export default CircularChart;

const styles = StyleSheet.create({
  currencyText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
