import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const home = () => {
  return (
    <SafeAreaView>
        <StatusBar style='dark'/>
        <View>
      <Text>home</Text>
    </View>

    </SafeAreaView>
    
  )
}

export default home

const styles = StyleSheet.create({})