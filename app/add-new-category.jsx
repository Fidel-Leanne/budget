import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';

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
          onChangeText={setSelectedIcon}
          className="text-3xl text-center mt-8 w-[90px] rounded-full mx-auto "
        />
      </View>

      

      <ColorPicker
      selectedColor={selectedColor}
      setSelectedColor={(color)=>setSelectedColor(color)}
      />
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
});
