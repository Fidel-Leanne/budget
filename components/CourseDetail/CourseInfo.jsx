import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/SupaBaseConfig';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CourseInfo = ({ categoryData }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (categoryData) {
      calculateTotalPerc();
    }
  }, [categoryData]);

  const calculateTotalPerc = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach(item => {
      total += item.cost;
    });
    setTotalCost(total);
    let perc = (total / categoryData.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }
    setPercTotal(perc);
  };

  const onDeleteCategory = () => {
    Alert.alert('Are you Sure', 'Do you really want to Delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          const { error: deleteItemsError } = await supabase
            .from('CategoryItems')
            .delete()
            .eq('category_id', categoryData.id);

          const { error: deleteCategoryError } = await supabase
            .from('Category')
            .delete()
            .eq('id', categoryData.id);

          if (deleteItemsError || deleteCategoryError) {
            ToastAndroid.show('Error deleting category!', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Category Deleted!', ToastAndroid.SHORT);
            router.replace('/home');
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-slate-800 p-6">
      <View className="items-center mt-10">
        <Text className={`text-5xl p-6 rounded-lg shadow-lg`} style={{ backgroundColor: categoryData.color }}>
          {categoryData.icon}
        </Text>
        <Text className="text-3xl text-white font-bold mt-6">{categoryData?.name}</Text>
        <Text className="text-base text-gray-300 mt-2">{categoryData?.CategoryItems?.length} Items</Text>
      </View>
      <View className="mt-12 w-full items-center">
        <Text className="text-2xl text-white font-extrabold mb-4">${totalCost}</Text>
        <AnimatedCircularProgress
          size={200}
          width={20}
          fill={percTotal}
          tintColor="#4caf50"
          backgroundColor="#3d5875"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View className="items-center">
              <Text className="text-xl text-white">Progress</Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <Text className="text-xl text-white font-bold mt-4">Total Budget: ${categoryData.assigned_budget}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-600 p-4 rounded-full absolute bottom-10 self-center shadow-lg"
        onPress={onDeleteCategory}
      >
        <Ionicons name="trash-bin-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CourseInfo;


