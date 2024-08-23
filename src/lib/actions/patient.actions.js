'use server';

import { ID, Query, InputFile } from "node-appwrite";

import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "@/app/lib/utils";


export const createNewUser = async (user) => {

    try {

        const createNewUser = await users.create(
            ID.unique(), 
            user?.email, 
            user?.phone, 
            undefined, 
            user?.name
        );

        return parseStringify(createNewUser);
        
        
    } catch (error) {
        
        console.log(error);

        if(error && error?.code === 409) {

            const userAlreadyExists = await users.list([Query.equal('email', user?.email)]);

            return userAlreadyExists?.users[0]; 

        }
        
    }

}


export const getCurrentAuthenticatedUser = async (idOfTheAuthenticatedUser) => {

    try {
      
        const user = await users.get(idOfTheAuthenticatedUser);

        return parseStringify(user);
        
    } catch (error) {
        
        console.log(error);
        
    }

}


export const registerPatient = async ({ identificationDocument, ...patientData }) => {

  try {

    let identificationDocumentUploaded;

    if (identificationDocument) {

        const inputFile = identificationDocument && InputFile.fromBlob(
            identificationDocument?.get("blobFile"), 
            identificationDocument?.get("fileName") 
        );


        identificationDocumentUploaded = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_STORAGE,
            ID.unique(),
            inputFile
        )

    }

    const newPatientCreated = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID, 
        ID.unique(),
        {
            identificationDocumentId: identificationDocumentUploaded?.$id,
            identificationDocumentUrl: `${process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_STORAGE}/files/${identificationDocumentUploaded?.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
            ...patientData
        }
    )


    return parseStringify(newPatientCreated);
    
  
  } catch (error) {
      
      console.log(error);
      
  }

}


export const getPatientByIdOfTheUserWhoCreatedThePatient = async (idOfTheUserWhoCreatedThePatient) => {

    try {
      
        const getPatient = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID, 
            [
                Query.equal('userId', idOfTheUserWhoCreatedThePatient)
            ]
        )        

        return parseStringify(getPatient.documents[0]);
        
        
    } catch (error) {
        
        console.log(error);
        
    }

}