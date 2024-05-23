import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupaBaseConfig';
import { StatusBar } from 'expo-status-bar';
import CourseInfo from '../components/CourseDetail/CourseInfo';

const CategoryDetails = () => {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState(null); // Initialize with null

  useEffect(() => {
    if (categoryId) {
      getCategoryDetail();
    }
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('id', categoryId);

    if (error) {
      console.error('Error fetching category details:', error);
    } else if (data && data.length > 0) {
        
      setCategoryData(data[0]);
    }
  };

  if (!categoryData) {
    return (
        <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-lg text-secondary-100 mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-600">
      <StatusBar style="dark" />
      <CourseInfo categoryData={categoryData}/>
    </SafeAreaView>
  );
};

export default CategoryDetails;
