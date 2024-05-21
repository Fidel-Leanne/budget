import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Sidebar = ({ isVisible, onClose }) => {
  const router = useRouter();

  if (!isVisible) return null;

  return (
    <SafeAreaView className="absolute top-0 left-0 h-[690px] w-[250px] bg-slate-800 bg-opacity-70 shadow-lg z-50 mt-6 rounded-3xl ">
      <View className="p-4">
        <TouchableOpacity onPress={onClose} className="mb-4">
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/dashboard'); onClose(); }} className="mb-4">
          <Text className="text-white text-lg">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/accounts'); onClose(); }} className="mb-4">
          <Text className="text-white text-lg">Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/transactions'); onClose(); }} className="mb-4">
          <Text className="text-white text-lg">Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/budgets'); onClose(); }} className="mb-4">
          <Text className="text-white text-lg">Budgets</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push('/settings'); onClose(); }} className="mb-4">
          <Text className="text-white text-lg">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Add logout functionality here */ onClose(); }} className="mt-4">
          <Text className="text-white text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Sidebar;
