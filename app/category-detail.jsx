import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'; // Import RefreshControl
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupaBaseConfig';
import { StatusBar } from 'expo-status-bar';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemList from '../components/CourseDetail/CourseItemList';

const CategoryDetails = () => {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  useEffect(() => {
    if (categoryId) {
      getCategoryDetail();
    }
  }, [categoryId]);

  const getCategoryDetail = async () => {
    setRefreshing(true); // Set refreshing state to true when fetching data
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('id', categoryId);

    if (error) {
      console.error('Error fetching category details:', error);
    } else if (data && data.length > 0) {
      setCategoryData(data[0]);
    }
    setRefreshing(false); // Set refreshing state to false after fetching data
  };

  const onRefresh = () => {
    getCategoryDetail(); // Call getCategoryDetail to refresh data
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Add RefreshControl
        }
      >
        <CourseInfo categoryData={categoryData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetails;
