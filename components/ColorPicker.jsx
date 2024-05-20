import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'

export default function ColorPicker({selectedColor,setSelectedColor}) {
  return (
    <View className='flex-row gap-7 mx-auto mt-[1px]'>
        
        {Colors.COLOR_LIST.map((color,index)=>(
            <TouchableOpacity 
            key={index}
            style={[{
                height:30,
                width:30,
                backgroundColor:color,
                borderRadius:99
            },selectedColor==color&&{borderWidth:4}]}
            onPress={()=>setSelectedColor(color)}
            >
            </TouchableOpacity>
        ))}
    </View>
  )
}