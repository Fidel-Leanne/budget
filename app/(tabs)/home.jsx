import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { supabase } from '../../utils/SupaBaseConfig';

const home = () => {
  const { user, isLoading } = useGlobalContext();

  useEffect(() => {
    if (user) {
      getCategoryList();
    }
  }, [user]);

  const getCategoryList = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*')
      .eq('created_by', user.email);

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      console.log('Fetched categories:', data);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
      <ActivityIndicator size="large" color="#ffffff" />
      <Text className="text-lg text-secondary-100 mt-4">Loading...</Text>
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-black-200 h-full">
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-semibold text-white">Welcome to SmartSpend</Text>
        {user && (
          <View className="flex-row items-center mt-4">
            {user.avatar && (
              <Image
                source={{ uri: user.avatar }}
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <Text className="text-xl font-semibold text-white">Hello, {user.username}!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default home;
