import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <View className="flex-1">
      <View>
        <Text className="text-slate-50 font-psemibold text-lg mt-3 ml-3">
          Latest Expenses
        </Text>
      </View>
      <ScrollView>
        <View>
          {categories.map((category) => (
            <View key={category.id} className="ml-4 mt-4">
              <View className="bg-slate-200/50 w-[350px] rounded-lg h-auto flex-row items-center p-2">
                <Text style={[styles.iconText, { backgroundColor: category?.color }]}>
                  {category.icon}
                </Text>
                <View className="ml-2 flex-1">
                  <Text className="text-white font-psemibold">{category.name}</Text>
                  <Text className="text-white font-pregular">{category?.CategoryItems?.length} Items</Text>
                </View>
                <View style={styles.amountContainer}>
                  <Text className="text-white font-psemibold">N$5000</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
});
