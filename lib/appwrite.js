import { Client , Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.fifi.sora',
    projectId:'662fbd700022f7e86caf',
    databaseId:'662fbf4a0004f7a8732d',
    userCollectionId:'662fbf7d001e637218af',
    videoCollectionId:'662fbfbc0013cec03697',
    storageId:'662fc1dd003d48d52e78'
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars= new Avatars(client);
const databases= new Databases(client);


export const createUser= async (email, password, username)=>{
   
    try{

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error

        const avatarUrl=avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),{
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser

    }catch(error){

        console.log(error)
        throw new Error(error)

    }

}

export const  signIn= async(email, password)=>{

    try {
        const session=await account.createEmailSession(email, password)


        console.log(session)
        return session
    } catch (error) {
        throw new Error(error)
    }

}

export const getCurrentUser = async()=>{
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser= await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}
