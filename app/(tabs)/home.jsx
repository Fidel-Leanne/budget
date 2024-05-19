import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider'; // Import the global context

const Home = () => {
  const { user, isLoading } = useGlobalContext(); // Get the user and loading state from context

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SmartSpend</Text>
        {user && (
          <>
            <Text style={styles.subtitle}>Hello, {user.username}!</Text>
            {user.avatar && (
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937', // Tailwind color bg-primary
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600', // Tailwind class font-psemibold
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600', // Tailwind class font-psemibold
    color: '#FFFFFF',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#CBD5E1', // Tailwind color text-secondary-100
    marginTop: 10,
  },
});
