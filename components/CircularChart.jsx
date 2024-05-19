import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors'

const CircularChart = () => {
    const widthAndHeight = 200
    const [values, setValues]=useState([1])
    const [sliceColor,setSliceColor]=useState([Colors.GRAY]);
    const series = [123, 321, 123, 789, 537]
    
  return (
    <View>
      <Text className='text-white font-psemibold mb-5'>Your Expenses</Text>
      <View >
        <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.6}
            coverFill={'#FFF'}
          />
      </View>
    </View>
  )
}

export default CircularChart

const styles = StyleSheet.create({})