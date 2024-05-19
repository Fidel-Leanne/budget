import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.company.smartspend',
  projectId: '6648e37d00290fdd52cc',
  databaseId: '6649c7f000009c28ac5f',
  userCollectionId: '6649c82d001ebaf8398d',
  storageId: '6649c9c4002f79a82a3b'
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    // Create a new user account
    const newAccount = await account.create(ID.unique(), email, password, username);

    // Generate an avatar URL based on the username
    const avatarUrl = avatars.getInitials(username);

    // Sign in the user to create a session
    await signIn(email, password);

    // Store user details in the database
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    console.log(newUser);

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(error.message || 'Failed to create user');
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const getCurrentUser = async () => {
  try {
    // Get the current account
    const currentAccount = await account.get();

    // Fetch the user document from the database
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('User not found');

    return currentUser.documents[0];
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error(error.message || 'Failed to fetch current user');
  }
};
