import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Sidebar from '../../components/Sidebar';
import { images } from '../../constants';


const Profile = () => {
  const { user, isLoading } = useGlobalContext();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1  bg-slate-700">
      <StatusBar style="light" />
      <View className="flex-row justify-between p-4 items-center">
        <TouchableOpacity onPress={toggleSidebar}>
          <MaterialCommunityIcons name="menu" size={40} color="orange"  />
        </TouchableOpacity>
        
        <View>
          {user && (
            <Image
              source={{ uri: user.avatarUrl }}
              className="w-10 h-10 rounded-full mt-3"
            />
          )}
        </View>

       
      </View>

      <View>
          <Text className="text-lg font-pmedium text-white text-center"> {user.username}</Text>
          <Text className="text-lg font-pmedium text-white text-center">{user.email}</Text>
        </View>
      <View className="flex-1 items-center mt-6">
        <Image
          source={images.card}
          className="w-[400px] h-[300px] mx-auto mt-[70px]"
          resizeMode="contain"
        />
      </View>
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
    </SafeAreaView>
  );
};

export default Profile;
