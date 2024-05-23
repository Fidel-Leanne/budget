import { SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupaBaseConfig';
import { StatusBar } from 'expo-status-bar';

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
      <SafeAreaView className="flex-1 justify-center items-center">
        <StatusBar style="dark" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl">{categoryData.icon}</Text>
        <Text className="text-xl font-bold mt-4">{categoryData.name}</Text>
        <Text className="text-sm text-gray-500 mt-2">
          {categoryData.CategoryItems?.length} Items
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetails;
