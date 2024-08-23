import { z } from 'zod';

export const userFormValidation = z.object({
  fullName: z
    .string()
    .min(2, 'full name must be atleast minimum of 2 characters')
    .max(50, 'full name cannot be more than 50 characters'),
  emailAddress: z
    .string()
    .email('Invalid Email Address or no Email Address is provided'),
  mobileNumber: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      'Invalid Mobile Number or no Mobile Number is provided'
    ),
});

export const PatientFormValidation = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['male', 'female', 'others']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be at most 50 characters'),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      'Invalid phone number'
    ),
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  insuranceProvider: z
    .string()
    .min(2, 'Insurance name must be at least 2 characters')
    .max(50, 'Insurance name must be at most 50 characters'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Policy number must be at least 2 characters')
    .max(50, 'Policy number must be at most 50 characters'),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  discloseConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  termsAndConditions: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
});

export const CreateAppointmentSchema = z.object({
  doctorForAppointment: z.string().min(2, 'Select at least one doctor'),
  dateOfDoctorAppointment: z.coerce.date(),
  reasonOfAppointment: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  doctorForAppointment: z.string().min(2, 'Select at least one doctor'),
  dateOfDoctorAppointment: z.coerce.date(),
  reasonOfAppointment: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  doctorForAppointment: z.string().min(2, 'Select at least one doctor'),
  dateOfDoctorAppointment: z.coerce.date(),
  reasonOfAppointment: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
