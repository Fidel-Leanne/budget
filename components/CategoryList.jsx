import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';

const CategoryList = ({ categories, onRefresh }) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onCategoryClick = (category) => {
    router.push({
      pathname: '/category-detail',
      params: { categoryId: category.id }
    });
  };

  const calculateTotalCost = (categoryItems) => {
    let totalCost = 0;
    categoryItems.forEach(item => {
      totalCost += item.cost;
    });
    return totalCost;
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  return (
    <View className="flex-1 bg-slate-800">
      <Text className="text-slate-50 font-psemibold text-lg mt-3 ml-3">
        Latest Expenses
      </Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.id} className="ml-4 mt-4" onPress={() => onCategoryClick(category)}>
            <View className="bg-slate-200/50 w-[350px] rounded-lg h-auto flex-row items-center p-2">
              <Text style={[styles.iconText, { backgroundColor: category?.color }]}>
                {category.icon}
              </Text>
              <View className="ml-2 flex-1">
                <Text className="text-white font-psemibold">{category.name}</Text>
                <Text className="text-white font-pregular">{category?.CategoryItems?.length} Items</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text className="text-white font-psemibold">${calculateTotalCost(category?.CategoryItems)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  iconText: {
    fontSize: 20,
    padding: 16,
    borderRadius: 8,
    width: 80,
    textAlign: 'center',
    color: 'white',
  },
  amountContainer: {
    alignSelf: 'flex-end',
  },
  scrollView: {
    paddingBottom: 20,
  },
});
