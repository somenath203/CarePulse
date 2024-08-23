import * as sdk from 'node-appwrite';


const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT) 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY_SECRET);


export const databases = new sdk.Databases(client);

export const storage = new sdk.Storage(client);

export const users = new sdk.Users(client);

