import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router'

const SignIn = () => {

    const router=useRouter()

  const [form, setForm]= useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit=()=>{

    router.replace('/home')
  }
  return (
    <SafeAreaView className='bg-primary h-full'>

      <ScrollView>
      <View className='w-full justify-center min-h-85vh px-4 my-6'>
       

       <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
        Login to SmartSpend
       </Text>

       <FormField
       title='Email'
       value={form.email}
       handleChangeText={(e)=>setForm({email: e})}
       otherStyles='mt-7'
       keyboardType='email-address'
       />

      <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e)=>setForm({password: e})}
            otherStyles='mt-7'
            />

            <CustomButton
            title='Sign in'
            handlePress={submit}
            containerStyles='mt-5 mx-4'
            isLoading={isSubmitting}/>

            <View className='justify-center pt-5 flex-row gap-2'>

              <Text className='text-lg text-gray-100 font-pregular'>
                 Don't have an account
              </Text>
              <Link href='/sign-up' className='text-lg font-psemibold text-blue-300'> Sign Up</Link>
            </View>
      </View>

      </ScrollView>
      
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})