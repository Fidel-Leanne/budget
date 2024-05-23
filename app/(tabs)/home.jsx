import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import CircularChart from '../../components/CircularChart';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import CategoryList from '../../components/CategoryList';

const Home = () => {
  const { user, isLoading } = useGlobalContext();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getCategoryList();
    }
  }, [user]);

  const getCategoryList = async () => {
    setLoading(true);
    console.log('User email:', user.email); // Log the user's email
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('created_by', user.email);
    console.log('Supabase response:', data, error); // Log the Supabase response
    setLoading(false);
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      console.log('Fetched categories:', data);
      setCategoryList(data);
    }
  };

  if (isLoading || loading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-lg text-secondary-100 mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style="light" />
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <CircularChart />
        {categoryList.length > 0 && <CategoryList categories={categoryList} />}
      </ScrollView>
      <View className="absolute bottom-0 right-0 mb-8 mr-8">
        <Link href="/add-new-category">
          <Ionicons name="add-circle-outline" size={50} color="orange" />
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Home;
