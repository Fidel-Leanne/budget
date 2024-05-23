import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/SupaBaseConfig';
import * as Progress from 'react-native-progress';

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
    setPercTotal(perc / 100); // For the progress bar, we need a value between 0 and 1
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
    <View className="flex-1 bg-slate-700 p-4">
      <View className="items-center mt-10">
        <Text className={`text-4xl p-4 rounded-lg`} style={{ backgroundColor: categoryData.color }}>
          {categoryData.icon}
        </Text>
        <Text className="text-2xl text-white font-bold mt-4">{categoryData?.name}</Text>
        <Text className="text-sm text-gray-300 mt-2">{categoryData?.CategoryItems?.length} Items</Text>
      </View>
      <View className="mt-10 w-full">
        <View className="flex-row justify-between mt-4">
          <Text className="text-white font-bold text-lg">${totalCost}</Text>
          <Text className="text-white text-lg">Total Budget: ${categoryData.assigned_budget}</Text>
        </View>
        <View className="w-full mt-4">
          <Progress.Bar
            progress={percTotal}
            width={null}
            color="green"
            unfilledColor="grey"
            borderWidth={0}
            height={20}
            borderRadius={10}
          />
        </View>
      </View>
      <TouchableOpacity
        className="bg-red-600 p-4 rounded-full absolute bottom-10 self-center"
        onPress={onDeleteCategory}
      >
        <Ionicons name="trash-bin-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CourseInfo;
