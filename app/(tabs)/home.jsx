import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider'; // Import the global context

const home = () => {
  const { user, isLoading } = useGlobalContext(); // Get the user and loading state from context

  if (isLoading) {
    return (
      <SafeAreaView className='bg-primary'>
        <Text className='text-2xl text-secondary-100'>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <StatusBar style="light" />
      <View className='flex justify-items-center items-center'>
        <Text className='text-3xl font-psemibold text-white'>Welcome to SmartSpend</Text>
        {user && (
          <Text className='text-2xl font-psemibold text-white'>Hello, {user.username}!</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default home;

