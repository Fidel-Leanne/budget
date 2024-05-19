import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';
import { Feather } from '@expo/vector-icons'; // Import Feather Icons

const Header = () => {
  const { user, isLoading } = useGlobalContext();

  return (
    <View className="h-20 bg-slate-700 flex items-center justify-between px-4">
      <View className="flex-row items-center">
        {user && user.avatar && (
          <Image
            source={{ uri: user.avatar }}
            className="w-12 h-12 rounded-full mr-4"
            style={{ marginLeft: 0 }} // Set marginLeft to 0 for the image
          />
        )}
        <Text className="text-2xl font-semibold text-white">Welcome to SmartSpend</Text>
      </View>
      <View className="flex-row items-center">
        {/* Notification Icon */}
        <Feather name="bell" size={24} color="white" style={{ marginRight: 16 }} />
        {/* User Greeting */}
        {user && (
          <Text className="text-xl font-semibold text-white">Hello, {user.username}!</Text>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
