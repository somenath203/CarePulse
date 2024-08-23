'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import CustomFormField from './CustomFormField';
import SubmitButton from './SubmitButton';
import { userFormValidation } from '@/lib/formvalidation';
import { createNewUser } from '@/lib/actions/patient.actions';



const PatientForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(userFormValidation),

    defaultValues: {
      fullName: '',
      emailAddress: '',
      mobileNumber: ''
    },

  });


  const onSubmitForm = async ({ fullName, emailAddress, mobileNumber }) => {
    
    try {

      setIsLoading(true);

      const userData = {
        name: fullName,
        email: emailAddress,
        phone: mobileNumber
      };

      const newUserCreated = await createNewUser(userData);
      
      if(newUserCreated) {

        router.push(`/patients/${newUserCreated?.$id}/register`);

      }
      
    } catch (error) {
      
      console.log(error);
      
    } finally {

      setIsLoading(false);

    }

  }


  return (
    <div>
      <Form {...form}>
      
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-6 flex-1"
        >

          <section className="mb-12 space-y-4">

            <h1 className="header">Hi there 👋</h1>

            <p className="text-dark-700">Schedule your first appointment</p>

          </section>


          <CustomFormField
            formControl={form.control}
            fieldType="text"
            name="fullName"
            label="Full Name"
            placeholder="enter your full name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            formControl={form.control}
            fieldType="email"
            name="emailAddress"
            label="Email Address"
            placeholder="enter your email address"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            formControl={form.control}
            fieldType="phoneInput"
            name="mobileNumber"
            label="Mobile Number"
            placeholder="enter your mobile number"
            iconSrc="/assets/icons/email.svg"
            iconAlt="mobileno"
          />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>

        </form>

      </Form>

    </div>
    
  );
};

export default PatientForm;
