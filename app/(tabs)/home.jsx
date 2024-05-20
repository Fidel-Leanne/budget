import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import CircularChart from '../../components/CircularChart';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

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
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style="light" />
    
      <Header />
      <CircularChart/>

      <View className="absolute bottom-0 right-0 mb-8 mr-8">
        <Link href='/add-new-category'>
          <Ionicons name="add-circle-outline" size={50} color="orange" />
        
        </Link>
    </View>

     
      
    </SafeAreaView>
  );
};

export default home;
