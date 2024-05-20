import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CircularChart = () => {
    const widthAndHeight = 150
    const [values, setValues]=useState([1])
    const [sliceColor,setSliceColor]=useState([Colors.GRAY]);
    const series = [123, 321, 123, 789, 537]
    
  return (
    <View>
      <Text className='text-white font-psemibold mt-3 mb-5 '>Your Expenses</Text>
      <View className='h-[230px] w-[350px] bg-slate-500  ml-5 rounded-xl ' >

        <Text className='text-white text-center font-pregular mb-5 mt-2'>Your Estimated Cost: <Text className="font-pbold">N$0</Text></Text>
        <View className='flex-row '>
  
            <PieChart
                widthAndHeight={widthAndHeight}
                series={values}
                sliceColor={sliceColor}
                coverRadius={0.6}
                coverFill={'#FFF'}
                className='ml-2'
            />

            <MaterialCommunityIcons 
                        name="checkbox-blank-circle" 
                        size={24} color={Colors.GRAY}
                        className='ml-9'
                         />
                <Text className='text-white'>NA</Text>

        </View>
        
                </View>
      
    </View>
  )
}

export default CircularChart

const styles = StyleSheet.create({})