import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';

const Sidebar = ({ isVisible, onClose }) => {
  const router = useRouter();
  const { user, setUser, setIsLogged } = useGlobalContext();

  const handlePressOutside = () => {
    if (isVisible) {
      onClose();
    }
  };
  

  if (!isVisible) return null;

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
         <SafeAreaView className="absolute top-0 left-0 h-[690px] w-[250px] bg-gray-900 bg-opacity-25  shadow-lg z-50 mt-8 rounded-3xl ">
      <View className="p-4">
        <TouchableOpacity onPress={onClose} className="mb-4">
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/dashboard'); onClose(); }} className="mb-4">
          <Text className="text-white font-psemibold text-lg">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/accounts'); onClose(); }} className="mb-4">
          <Text className="text-gray-300 font-psemibold text-lg">Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/transactions'); onClose(); }} className="mb-4">
          <Text className="text-gray-300 font-psemibold  text-lg">Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/budgets'); onClose(); }} className="mb-4">
          <Text className="text-gray-300 font-psemibold text-lg">Budgets</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/settings'); onClose(); }} className="mb-4">
          <Text className="text-gray-300 font-psemibold text-lg">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {logout}} className="mt-[370px] bg-slate-700 rounded-xl">
          <Text className="text-orange-500 text-lg text-center font-psemibold h-9 ">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    </TouchableWithoutFeedback>
   
  );
};

export default Sidebar;
