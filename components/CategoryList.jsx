import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'

const CategoryList = ({ categories }) => {
  const router=useRouter();

  const onCategoryClick=(category)=>{
    router.push({
        pathname:'/category-detail',
        params:{
            categoryId:category.id
        }
    })
}

  return (
    <View className="flex-1">
      <View>
        <Text className="text-slate-50 font-psemibold text-lg mt-3 ml-3">
          Latest Expenses
        </Text>
      </View>


   
        <View>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} className="ml-4 mt-4" onPress={()=>onCategoryClick(category)}>
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
            </TouchableOpacity>
          ))}
        </View>
      
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
