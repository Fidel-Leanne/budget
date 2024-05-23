import { View, Text, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import { EvilIcons } from '@expo/vector-icons';
import { supabase } from '../../utils/SupaBaseConfig';

export default function CourseItemList({ categoryData, setUpdateRecord }) {
  const [explandItem, setExpandItem] = useState();

  const onDeleteItem = async (id) => {
    const { error } = await supabase.from('CategoryItems').delete().eq('id', id);
    ToastAndroid.show('Item Deleted!', ToastAndroid.SHORT);
    setUpdateRecord(true);
  };

  const openURL = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View className="mt-5">
      <Text className="text-lg font-pbold">Item List</Text>
      <View className="mt-4">
        {categoryData?.CategoryItems?.length > 0 ? (
          categoryData?.CategoryItems?.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                className="flex-row items-center justify-between mt-2.5"
                onPress={() => setExpandItem(index)}
              >
                <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg" />
                <View className="flex-1 ml-2.5">
                  <Text className="text-base font-pbold">{item.name}</Text>
                  <Text className="text-sm text-gray-500" numberOfLines={2}>
                    {item.url}
                  </Text>
                </View>
                <Text className="text-base font-pbold">${item.cost}</Text>
              </TouchableOpacity>
              {explandItem === index && (
                <View className="flex-row justify-end gap-2.5 mt-2.5">
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
              {categoryData?.CategoryItems.length - 1 !== index && (
                <View className="border-b border-gray-300 mt-2.5" />
              )}
            </React.Fragment>
          ))
        ) : (
          <Text className="text-xl font-pbold text-gray-500">No Item Found</Text>
        )}
      </View>
    </View>
  );
}