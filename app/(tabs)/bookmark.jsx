import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Bookmark = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.ValueXY({ x: -300, y: 0 })).current;
  const router= useRouter()


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.spring(slideAnim, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStarted = () => {
   router.push('/home');
  }

  return (
    <SafeAreaView className='h-full'>
      <StatusBar style='dark' />

      <View className="flex-1 bg-gradient-to-b from-indigo-500 to-purple-800 items-center justify-center px-8">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim.x }, { translateY: slideAnim.y }],
          }}
        >
          <View className="bg-white rounded-xl p-6 shadow-lg">
            <Text className="text-3xl font-pbold text-center mb-4">
              About Smart Spend
            </Text>
            <Text className="text-md text-gray-700 mb-6 font-psemibold">
              Smart Spend is a powerful budgeting app that helps you take control
              of your finances. With its intuitive interface, you can easily track
              your expenses, set budgets, and achieve your financial goals.
            </Text>
            <View className="flex-row justify-center mb-4">
              <Ionicons name="pie-chart-outline" size={32} color="#6366F1" />
              <Text className="text-lg font-psemibold ml-2">
                Visualize Your Spending
              </Text>
            </View>
            <Text className="text-gray-600 mb-4 font-pmedium">
              Smart Spend provides insightful charts and graphs that give you a
              clear overview of your spending patterns, making it easier to
              identify areas where you can save.
            </Text>
            <View className="flex-row justify-center mb-4">
              <Ionicons name="calendar-outline" size={32} color="#6366F1" />
              <Text className="text-lg font-psemibold ml-2">
                Stay on Track with Budgets
              </Text>
            </View>
            <Text className="text-gray-600 mb-6 font-pregular">
              Set realistic budgets for different categories and receive
              notifications when you're approaching your limits, helping you stay
              on top of your spending.
            </Text>
            <TouchableOpacity
              className="bg-indigo-500 rounded-lg py-3 px-6"
              onPress={getStarted}
            >
              <Text className="text-white font-psemibold">Get Started</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
