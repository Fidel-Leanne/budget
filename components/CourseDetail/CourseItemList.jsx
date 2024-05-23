import React from 'react';
import { View, Text, FlatList } from 'react-native';

const CourseItemList = ({ categoryData }) => {
  return (
    <View className="bg-white p-4 mt-4 rounded-t-lg">
      <Text className="text-xl font-bold mb-2">Course Items</Text>
      {categoryData?.CategoryItems?.length > 0 ? (
        <FlatList
          data={categoryData.CategoryItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex flex-row justify-between items-center border-b border-gray-200 py-2">
              <Text className="text-lg">{item.name}</Text>
              <Text className="text-lg font-bold">${item.cost}</Text>
            </View>
          )}
        />
      ) : (
        <Text className="text-lg text-gray-500">No items found</Text>
      )}
    </View>
  );
};

export default CourseItemList;
