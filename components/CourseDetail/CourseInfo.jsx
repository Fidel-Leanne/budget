import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/SupaBaseConfig';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from 'react-native-modal';
import CourseItemList from './CourseItemList';

const CourseInfo = ({ categoryData }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onViewItems = () => {
    setIsModalVisible(true);
  };
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
    Alert.alert(
      'Are you Sure',
      'Do you really want to Delete?',
      [
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
      ]
    );
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  
  return (
    <View className="flex-1 bg-slate-800 p-6">
      <View className="items-center mt-10">
        <Text
          className={`text-5xl p-6 rounded-lg shadow-lg`}
          style={{ backgroundColor: categoryData.color }}
        >
          {categoryData.icon}
        </Text>
        <Text className="text-3xl text-white font-pbold mt-6">
          {categoryData?.name}
        </Text>
        <Text className="text-base font-pregular text-gray-300 mt-2">
          {categoryData?.CategoryItems?.length} Items
        </Text>
      </View>
      <View className="mt-12 w-full items-center">
        <Text className="text-2xl text-white font-pbold mb-4">${totalCost}</Text>
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
              <Text className="text-xl font-pmedium text-white">Progress</Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <Text className="text-xl text-white font-pbold mt-4">
          Total Budget: ${categoryData.assigned_budget}
        </Text>
      </View>
      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-full absolute bottom-16 left-4 self-center shadow-lg"
        onPress={onViewItems}
      >
        <View className="flex-row items-center">
          <Ionicons name="list" size={30} color="white" />
          <Text className="text-white font-bold ml-2">View Items</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-600 p-4 rounded-full absolute bottom-16 right-4 self-center shadow-lg"
        onPress={onDeleteCategory}
      >
        <Ionicons name="trash-bin-outline" size={30} color="white" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View className="bg-white rounded-lg h-3/6 p-4">
          <CourseItemList categoryData={categoryData} />
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-md mt-[120px] self-end"
            onPress={closeModal}
          >
            <Text className="text-white font-bold ">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CourseInfo;