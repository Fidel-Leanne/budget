import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';
import { Feather } from '@expo/vector-icons'; // Import Feather Icons

const Header = () => {
  const { user, isLoading } = useGlobalContext();

  return (
    <View className="h-[90px] bg-slate-700 flex ">
      <View className="flex-row items-center">
        {user && user.avatar && (
          <Image
            source={{ uri: user.avatar }}
            className="w-12 h-12 rounded-full mr-5 mt-1"
           // Set marginLeft to 0 for the image
          />
        )}
        <Text className=" text-xl font-psemibold text-white">Welcome to SmartSpend</Text>
      </View>
      <View className="flex-row items-center mt-2">
        {/* Notification Icon */}
        <Feather name="bell" size={24} color="white" className='mr-4 mt'/>
        {/* User Greeting */}
        {user && (
          <Text className="text-xl font-pregular text-white ml-9">Hello, {user.username}!</Text>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
