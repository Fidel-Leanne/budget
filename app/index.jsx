import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link , Redirect, router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../context/GlobalProvider'

export default function App () {
   const {isLoading , isLoggedIn}= useGlobalContext()

   if(!isLoading && isLoggedIn) return <Redirect href='/home'/>

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height:'100%'}}>
       <View className='w-full justify-center items-center min-h-[85vh] px-4'> 
          <Image
          source={images.robot}
          className='w-[300px] h-[200px] mt-12'
          resizeMode='contain'
          />


          <View className='relative mt-[150px]'>
            <Text className='text-3xl text-white font-bold text-center'>
            {''}
            <Text className='text-blue-500'>SmartSpend</Text>
            </Text>

            <Image
            source={images.path}
            className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
            resizeMode='contain'
            />             
          </View>

          <Text className='text-2xl font-pregular text-gray-100 mt-7 text-center'>
          Your Budget. Your Future.
          </Text>

          <CustomButton
          title='Continue with Email'
          handlePress= {()=>router.push('/login')}
          containerStyles= 'w-full mt-7'
          />

       </View> 
      </ScrollView>

      <StatusBar backgroundColor='#161622'
      style='light'
      />
    
    </SafeAreaView>
  )
} 