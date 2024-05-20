import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider'; // Import the global context

const Profile = () => {
  const { user, isLoading } = useGlobalContext(); // Get the user and loading state from context

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <Text className="text-lg text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <StatusBar style="light" />
      <View className="flex-1 mt-7">
        <Text className="text-2xl font-bold text-white ">Profile</Text>
        {user && (
          <View className="items-center">
            <Image
              source={{ uri: user.avatarUrl }}
              className="w-24 h-24 rounded-full mb-5"
            />
            <Text className="text-lg text-white mb-2">Username: {user.username}</Text>
            <Text className="text-lg text-white mb-2">Email: {user.email}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
