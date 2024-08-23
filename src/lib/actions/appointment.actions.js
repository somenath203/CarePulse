'use server';

import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import nodemailer from 'nodemailer';

import { databases } from "../appwrite.config";
import { parseStringify } from "@/app/lib/utils";
import { formatDateTime } from "@/app/lib/utils";


export const createNewAppointment = async (appointmentData) => {

    try {

        const newAppointmentCreated = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID, 
            ID.unique(),
            appointmentData
        )

        return parseStringify(newAppointmentCreated);
        
    } catch (error) {
        
        console.log(error);
        
    }

}


export const fetchAppointmentDetails = async (appointmentId) => {

    try {

        const appointment = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID,
            appointmentId
        )

        return parseStringify(appointment);
        
    } catch (error) {
        
        console.log(error);

    }

}


export const getAppointmentList = async () => {

    try {
        
        const allAppointments = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID,
            [Query.orderDesc('$createdAt')] 
        );

        const initialCountsOfAllCategories = {
            scheduledAppointmentsCounts: 0,
            pendingAppointmentsCounts: 0,
            cancelledAppointmentsCounts: 0,
        }

        const counts = allAppointments?.documents?.reduce((accumulator, appointment) => {


            if (appointment?.status === 'scheduled') {

                accumulator.scheduledAppointmentsCounts += 1;

            } else if (appointment?.status === 'cancelled') {

                accumulator.cancelledAppointmentsCounts += 1;

            } else if (appointment?.status === 'pending') {

                accumulator.pendingAppointmentsCounts += 1;

            }

            return accumulator; 


        }, initialCountsOfAllCategories);


        const finalData = {
            totalNumberOfDocumentCount: allAppointments.total, 
            ...counts,
            allDocuments: allAppointments.documents
        }

        return parseStringify(finalData);

    } catch (error) {
        
        console.log(error);
        
    }

}


export const sendEmailNotification = async (emailIdOfTheUser, emailSubject, emailBody) => {

    try {

        const transporter = nodemailer.createTransport({
            service: process.env.NEXT_PUBLIC_GMAIL_APP_SERVICE,
            auth: {
                user: process.env.NEXT_PUBLIC_GMAIL_APP_HOST_EMAIL,
                pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: `${process.env.NEXT_PUBLIC_GMAIL_APP_HOST_NAME} ${process.env.NEXT_PUBLIC_GMAIL_APP_HOST_EMAIL}`,
            to: emailIdOfTheUser,
            subject: emailSubject,
            text: emailBody
        });
         

    } catch (error) {

        console.error('Error sending email:', error);

    }
};



export const updateTheAppointment = async ({ idOfTheAppointmentToBeUpdated, authUserEmailAddress, appointmentDetails, type }) => {

    try {

        const appointmentUpdated = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID,
            idOfTheAppointmentToBeUpdated, 
            appointmentDetails
        )

        const emailSubject = `CarePlus Patient Appointment`;

        const emailBody = `
            Hi, it's CarePlus.
            ${type === 'schedule' ? `Your appointment has been scheduled on ${formatDateTime(appointmentDetails?.dateOfDoctorAppointment).dateTime} with Dr. ${appointmentDetails?.doctorForAppointment}` : `We regret to inform you that your appointment has been cancelled. Reason for cancellation: ${appointmentDetails?.cancellationReason}`}`;


        sendEmailNotification(authUserEmailAddress, emailSubject, emailBody);

        revalidatePath('/admin');

        return parseStringify(appointmentUpdated);
        
    } catch (error) {
        
        console.log(error);
        
    }

}
