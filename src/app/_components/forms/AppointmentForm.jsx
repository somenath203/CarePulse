'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Form } from '@/components/ui/form';
import CustomFormField from './CustomFormField';
import SubmitButton from './SubmitButton';
import { getAppointmentSchema } from '@/lib/formvalidation';
import { Doctors } from '@/constants';
import { SelectItem } from '@/components/ui/select';
import { createNewAppointment, updateTheAppointment } from '@/lib/actions/appointment.actions';
import { getCurrentAuthenticatedUser } from '@/lib/actions/patient.actions';



const AppointmentForm = ({ type, userId, patientId, appointment, setOpenDialog }) => {


  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);


  const [ authUserEmailAddress, setAuthUserEmailAddress ] = useState();


  const getPhoneNumberOfAuthenticatedUser = async () => {

    try {
      
      const authUser = await getCurrentAuthenticatedUser(userId);

      setAuthUserEmailAddress(authUser?.email);

    } catch (error) {
      
      console.log(error);
      
    }

  }


  useEffect(() => {

    getPhoneNumberOfAuthenticatedUser();

  }, [userId]);


  const form = useForm({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      doctorForAppointment: appointment ? appointment.doctorForAppointment : '',
      dateOfDoctorAppointment: appointment ? new Date(appointment.dateOfDoctorAppointment) : new Date(Date.now()),
      reasonOfAppointment: appointment ? appointment.reasonOfAppointment : '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  });

  const onSubmitForm = async (values) => {

    setIsLoading(true);

    let status;

    switch (type) {
      case 'cancel':
        status = 'cancelled';
        break;
      case 'schedule':
        status = 'scheduled';
        break;
      default:
        status = 'pending';
    }

    try {

      if (type === 'create' && patientId) {

        const appointmentData = {
          userId: userId,
          patient: patientId,
          doctorForAppointment: values?.doctorForAppointment,
          dateOfDoctorAppointment: new Date(values?.dateOfDoctorAppointment),
          reasonOfAppointment: values?.reasonOfAppointment,
          status: status,
        };

        const newAppointmentCreated = await createNewAppointment(appointmentData);

        if (newAppointmentCreated) {

          form.reset();
          
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointmentCreated?.$id}`);
        
        }

      } else if (authUserEmailAddress) {

        const appointmentToUpdate = {
          authUserEmailAddress: authUserEmailAddress,
          idOfTheAppointmentToBeUpdated: appointment?.$id,
          appointmentDetails: {
            doctorForAppointment: values?.doctorForAppointment,
            dateOfDoctorAppointment: new Date(values?.dateOfDoctorAppointment),
            status: status,
            cancellationReason: values?.cancellationReason,
          },
          type: type,
        };

        const updateAppointment = await updateTheAppointment(appointmentToUpdate);

        if (updateAppointment) {

          setOpenDialog && setOpenDialog(false);

          form.reset();

        }

      }
    } catch (error) {

      console.error(error);

    } finally {

      setIsLoading(false);

    }

  };

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      buttonLabel = 'Create Appointment';
  }


  return (
    <div>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6 flex-1">

          {type === 'create' && (
            <section className="mb-12 space-y-4">
              <h1 className="header">New Appointment 🩺</h1>
              <p className="text-dark-700">Request a new appointment</p>
            </section>
          )}

          {type !== 'cancel' && (
            <>
              <CustomFormField
                formControl={form.control}
                fieldType="selectDoctorForAppointment"
                name="doctorForAppointment"
                label="Select Doctor for Appointment"
                placeholder="select the doctor for appointment of your choice"
              >
                {Doctors.map((doctor) => (
                  <SelectItem key={doctor.name} value={doctor.name} disabled={type === 'schedule'}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt={doctor.name}
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                formControl={form.control}
                fieldType="selectDateForAppointment"
                name="dateOfDoctorAppointment"
                label="Select Date for Doctor Appointment"
                showTimeSelect
                dateFormat="MM/dd/yyyy h:mm aa"
                disabled={type === 'schedule'}
              />

              <CustomFormField
                formControl={form.control}
                fieldType="reasonOfAppointmentTextArea"
                name="reasonOfAppointment"
                label="Reason of Appointment"
                placeholder="please enter the reason of appointment"
                disabled={type === 'schedule'}
              />

            </>
          )}

          {type === 'cancel' && (
            <CustomFormField
              formControl={form.control}
              fieldType="cancellationReasonInputField"
              name="cancellationReason"
              label="Reason for cancellation of Appointment"
              placeholder="please enter the reason for cancellation of appointment"
            />
          )}

          <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
            {buttonLabel}
          </SubmitButton>

        </form>

      </Form>
      
    </div>
  );
};

export default AppointmentForm;