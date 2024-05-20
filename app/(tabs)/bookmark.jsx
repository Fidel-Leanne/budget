import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const bookmark = () => {
  return (
    <SafeAreaView>
      <StatusBar style='dark'/>
        <View className='mt-10'>
          <Text>bookmark</Text>
        </View>
    </SafeAreaView>
    
  )
}

export default bookmark

const styles = StyleSheet.create({})