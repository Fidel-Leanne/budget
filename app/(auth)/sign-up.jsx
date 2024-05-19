import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeText = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  };

  const submit = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      // Set to global state if needed
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-85vh px-4 my-6">
          <Text className="text-2xl text-white font-semibold mt-10">
            Register with SmartSpend
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(value) => handleChangeText('username', value)}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(value) => handleChangeText('email', value)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(value) => handleChangeText('password', value)}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-5 mx-4"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              Have an account already?
            </Text>
            <Link href="/login" className="text-lg font-semibold text-blue-300">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
