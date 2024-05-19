import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import CircularChart from '../../components/CircularChart';

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
    
      <Header/>
      <CircularChart/>
     
      
    </SafeAreaView>
  );
};

export default home;
