import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CircularChart = ({ categoryList }) => {
  const widthAndHeight = 180;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  const [totalCalculatedEstimate, setTotalCalculatedEstimate] = useState(0);
  const [chartSize] = useState(new Animated.Value(0));

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      updateCircularChart();
      animateChart();
    }
  }, [categoryList]);

  const animateChart = () => {
    Animated.spring(chartSize, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const updateCircularChart = () => {
    let totalEstimates = 0;
    let newSliceColor = [];
    let newValues = [];
    let otherCost = 0;
    categoryList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        item.CategoryItems?.forEach((item_) => {
          itemTotalCost += item_.cost;
          totalEstimates += item_.cost;
        });
        newSliceColor.push(Colors.COLOR_LIST[index]);
        newValues.push(itemTotalCost);
      } else {
        item.CategoryItems?.forEach((item_) => {
          otherCost += item_.cost;
          totalEstimates += item_.cost;
        });
      }
    });
    newSliceColor.push(Colors.COLOR_LIST[4]);
    newValues.push(otherCost);
    setSliceColor(newSliceColor);
    setValues(newValues);
    setTotalCalculatedEstimate(totalEstimates);
  };

  return (
    <View className="bg-slate-700/50 mt-5 rounded-xl w-[350px] mx-auto items-center p-6">
      <Text className="text-white font-psemibold text-lg mb-5">
        Total Estimate: <Text className="font-bold">${totalCalculatedEstimate}</Text>
      </Text>
      <Animated.View
        className="h-[180px] w-[330px] rounded-xl items-center flex-row justify-center"
        style={{ transform: [{ scale: chartSize }] }}
      >
        <View className="relative items-center justify-center">
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={'#FFF'}
          />
          <Text style={styles.currencyText}>N${totalCalculatedEstimate}</Text>
        </View>
        <View className="flex-col items-start ml-4">
          {categoryList.length === 0 ? (
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
              <Text className="text-white ml-2">NA</Text>
            </View>
          ) : (
            categoryList.map((category, index) => (
              <View key={index} className="flex-row items-center mt-2">
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={24}
                  color={Colors.COLOR_LIST[index % Colors.COLOR_LIST.length]}
                />
                <Text className="text-secondary-200 font-pmedium ml-2">{index < 4 ? category.name : 'Other'}</Text>
              </View>
            ))
          )}
        </View>
      </Animated.View>
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