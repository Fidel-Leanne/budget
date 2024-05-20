import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import { MaterialIcons } from '@expo/vector-icons';

const AddNewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [categoryName, setCategoryName] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="bg-slate-700 h-full">
      <StatusBar style="dark" />

      <View className="p-4">
        <Text className="text-white text-2xl font-pregular">Category</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: selectedColor }]}
          value={selectedIcon}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
          className="text-3xl text-center mt-8 w-[90px] rounded-full mx-auto"
        />
      </View>

      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={(color) => setSelectedColor(color)}
      />

      <View className="mt-10 ml-8">
        <View className="relative w-[330px] mb-8">
          <TextInput
            placeholder="Category name"
            placeholderTextColor="white"
            className="bg-slate-400 h-[47px] w-full rounded-lg pl-10 pr-10"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <MaterialIcons
            name="local-offer"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>

        <View className="relative w-[330px] mb-8">
          <TextInput
            placeholder="Budget"
            placeholderTextColor="white"
            className="bg-slate-400 h-[47px] w-full rounded-lg pl-10 pr-10"
            value={totalBudget}
            onChangeText={setTotalBudget}
          />
          <MaterialIcons
            name="attach-money"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>   
        
        <TouchableOpacity className='bg-black w-[300px] h-9 rounded-full mt-5'
            disabled={!categoryName && !totalBudget}>
                <Text className="text-secondary text-2xl font-pregular text-center">
                    Add Category</Text>   
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default AddNewCategory;

const styles = StyleSheet.create({
  textInput: {
    color: 'white',
    fontSize: 30,
    marginTop: 32,
    textAlign: 'center',
    padding: 10,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 12.5, // Center the icon vertically in the TextInput
    
  },
});
