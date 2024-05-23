import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid, TextInput } from 'react-native'; // Removed duplicate import
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/SupaBaseConfig';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from 'react-native-modal';
import CourseItemList from './CourseItemList';

const CourseInfo = ({ categoryData }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  const [isItemListModalVisible, setIsItemListModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [newItemImage, setNewItemImage] = useState('');
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
      // Notify the user when they exceed the budget
      console.log('Budget Exceeded'); // Check if this console log is triggered
      Alert.alert(
        'Budget Exceeded',
        'You have exceeded your budget!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
    setPercTotal(perc);
  };

  // Rest of the component remains unchanged


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

  const openItemListModal = () => {
    setIsItemListModalVisible(true);
  };

  const closeItemListModal = () => {
    setIsItemListModalVisible(false);
  };

  const openAddItemModal = () => {
    setIsAddItemModalVisible(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModalVisible(false);
  };

  const onAddItem = async () => {
    if (!newItemName || !newItemCost) {
      ToastAndroid.show('Please fill in all required fields!', ToastAndroid.SHORT);
      return;
    }
  
    // Calculate the total cost if the new item is added
    const newTotalCost = totalCost + parseFloat(newItemCost);
  
    if (newTotalCost > categoryData.assigned_budget) {
      // If adding the new item exceeds the budget, show an alert
      Alert.alert(
        'Budget Exceeded',
        'Adding this item will exceed your budget!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
      return;
    }
  
    // If the new item does not exceed the budget, proceed with insertion
    const { error } = await supabase.from('CategoryItems').insert([
      {
        name: newItemName,
        cost: parseFloat(newItemCost),
        url: newItemUrl,
        image: newItemImage,
        category_id: categoryData.id,
      },
    ]);
  
    if (error) {
      ToastAndroid.show('Error adding item!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Item added successfully!', ToastAndroid.SHORT);
      
      closeAddItemModal();
    }
  };
  

  return (
     
    <View className="flex-1 bg-slate-800 p-6">
      <View className="items-center mt-10">
        <Text className="text-5xl p-6 rounded-lg shadow-lg" style={{ backgroundColor: categoryData.color }}>
          {categoryData.icon}
        </Text>
        <Text className="text-3xl text-white font-pbold mt-6">{categoryData?.name}</Text>
        <Text className="text-base font-pregular text-gray-300 mt-2">{categoryData?.CategoryItems?.length} Items</Text>
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
        <Text className="text-xl text-white font-pbold mt-4 mb-3">Total Budget: ${categoryData.assigned_budget}</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-600/30 p-4 rounded-full absolute  bottom-16 left-4 ml-[-11] mt-2 self-center shadow-lg"
        onPress={openItemListModal}
      >
        <View className="flex-row items-center">
          <Ionicons name="list" size={30} color="white" />
          <Text className="text-white font-pbold ml-2">View Items</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-600/5 p-4 rounded-full absolute bottom-32 left-4 self-center shadow-lg mb-[530px] ml-[-11]"
        onPress={openAddItemModal}
      >
        <View className="flex-row items-center">
          <Ionicons name="add-circle-outline" size={30} color="white" />
          <Text className="text-white font-pbold ml-2">Add Item</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-600 p-4 rounded-full absolute bottom-16 right-4 self-center shadow-lg"
        onPress={onDeleteCategory}
      >
        <Ionicons name="trash-bin-outline" size={30} color="white" />
      </TouchableOpacity>

      <Modal isVisible={isItemListModalVisible} onBackdropPress={closeItemListModal} avoidKeyboard>
        <View className="bg-slate-400 rounded-lg h-3/6 p-4">
          <CourseItemList categoryData={categoryData} />
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-md mt-[130px] self-end "
            onPress={closeItemListModal}
          >
            <Text className="text-white font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isAddItemModalVisible} onBackdropPress={closeAddItemModal} avoidKeyboard>
        <View className="rounded-lg p-4 bg-slate-400">
          <Text className="text-lg font-pbold mb-4">Add New Item</Text>
          <TextInput
            className="border border-gray-300 p-2 mb-4 font-pregular rounded-md "
            placeholder="Item Name"
            value={newItemName}
            onChangeText={setNewItemName}
            />
            <TextInput
              className="border border-gray-300 p-2 mb-4 rounded-md font-pregular"
              placeholder="Item Cost"
              keyboardType="numeric"
              value={newItemCost}
              onChangeText={setNewItemCost}
            />
            <TextInput
              className="border border-gray-300 p-2 mb-4 rounded-md font-pregular"
              placeholder="Item URL"
              value={newItemUrl}
              onChangeText={setNewItemUrl}
            />
            <TextInput
              className="border border-gray-300 p-2 mb-4 rounded-md font-pregular"
              placeholder="Item Image URL"
              value={newItemImage}
              onChangeText={setNewItemImage}
            />

            <View className='flex-row'>
                <TouchableOpacity className="bg-green-600 px-4 py-2 rounded-xl mt-4" onPress={onAddItem}>
                  <Text className="text-white font-pbold">Add Item</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-xl ml-28 mt-4 " onPress={closeAddItemModal}>
                  <Text className="text-white font-pbold">Cancel</Text>
                </TouchableOpacity>
            </View>
           
          </View>
        </Modal>
      </View>
    );
  };
  
  export default CourseInfo;
  
