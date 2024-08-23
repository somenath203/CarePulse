# CarePulse

## Demo Video of the Project

![Screenshot (694)](https://github.com/user-attachments/assets/b3978a22-a0c8-470c-a33d-c5ae354415a5)

https://www.youtube.com/watch?v=cogkrXXNa8U

## Introduction

CarePulse is a comprehensive healthcare management application designed to streamline patient and admin interactions. The application is divided into two main parts: user and admin functionalities. Users can register, submit their medical information, and book appointments, while admins can manage appointments and handle user requests.

## Features of the Application

### User Features

1. **User Registration:**
   - Users can register by providing their full name, email address, and phone number.

2. **Personal Information Form:**
   - Full Name
   - Email Address
   - Mobile Number
   - Date of Birth
   - Gender
   - Full Address
   - Occupation
   - Emergency Contact Name and Number

3. **Medical Information Form:**
   - Primary Physician
   - Insurance Provider
   - Emergency Policy Number
   - Allergies
   - Current Medication
   - Family Medical History
   - Past Medical History

4. **Identification and Verification:**
   - Identification Type (e.g., Birth Certificate)
   - Identification Number
   - Scanned Copy of Identification Document

5. **Consent and Privacy Agreement:**
   - Consent to receive treatment
   - Consent to use and disclose health information
   - Acknowledgment of privacy policy

6. **Appointment Booking:**
   - Select Doctor
   - Choose Date and Time
   - Provide Reason for Appointment

7. **Success Message:**
   - Users receive a confirmation email with appointment details upon successful submission.

### Admin Features

1. **Appointment Management:**
   - View and manage Scheduled, Pending, and Cancelled Appointments

2. **Appointment Table:**
   - ID
   - Patient
   - Status
   - Date of Doctor Appointment
   - Doctor
   - Actions (Schedule or Cancel Appointment)

3. **Admin Access:**
   - Admins can access the admin page by entering a correct passcode available on the landing page.

4. **Notification System:**
   - Email notifications are sent to users regarding appointment status changes, managed via Gmail SMTP through Nodemailer.

## Technologies Used

- **Next.js:** Framework for building the React application.
- **Appwrite:** Backend server for handling authentication and data management.
- **TailwindCSS:** Utility-first CSS framework for styling.
- **Shadcn UI:** UI components library for a modern user interface.
- **Zod:** Schema validation library for input validation.
- **Gmail SMTP via Nodemailer:** Service for sending email notifications.
- **Sentry.io:** Error tracking and monitoring tool.

## Deployement URL

The application is deployed on Vercel.

Deployment Link: https://care-pulse-som.vercel.app/
