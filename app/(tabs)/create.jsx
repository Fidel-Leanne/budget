import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const create = () => {
  return (
    <SafeAreaView>
        <StatusBar style='dark' />
    <View>
      <Text className='text-black'>create</Text>
    </View>
    </SafeAreaView>
    
  )
}

export default create

const styles = StyleSheet.create({})