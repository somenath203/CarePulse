'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from './CustomFormField';
import SubmitButton from './SubmitButton';
import { PatientFormValidation } from '@/lib/formvalidation';
import { registerPatient } from '@/lib/actions/patient.actions';
import { PatientFormDefaultValues, GenderOptions, Doctors, IdentificationTypes } from '@/constants';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SelectItem } from '@/components/ui/select';
import { FileUploader } from './FileUploader';



const PatientRegisterForDoctorForm = ({ user }) => {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PatientFormValidation),

    defaultValues: {
      ...PatientFormDefaultValues
    },

  });


  const onSubmitForm = async (values) => {
        
    try {

      setIsLoading(true);
      

      let formData;


      if (values.identificationDocument && values.identificationDocument?.length > 0) {

        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type, 
        });

        formData = new FormData();

        formData.append("blobFile", blobFile);

        formData.append("fileName", values.identificationDocument[0].name);

      }


      const patientData = {
        ...values,
        userId: user?.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData
      }

      const newPatient = await registerPatient(patientData);

      if (newPatient) {

        router.push(`/patients/${user?.$id}/new-appointment`);
        
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

            <h1 className="header">Welcome ⭐</h1>

            <p className="text-dark-700">Let us know about yourself</p>

          </section>


          <section className="space-y-6">

            <div className="mb-9 space-y-1">

              <h2 className="sub-header">Personal Information</h2>

            </div>

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

          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              formControl={form.control}
              fieldType="email"
              name="email"
              label="Email Address"
              placeholder="enter your email address"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="phoneInput"
              name="phone"
              label="Mobile Number"
              placeholder="enter your mobile number"
              iconSrc="/assets/icons/email.svg"
              iconAlt="mobileno"
            />

          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>

            <CustomFormField
              formControl={form.control}
              fieldType="datePicker"
              name="birthDate"
              label="Date of Birth"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="selectGender"
              name="gender"
              label="Gender"
              placeholder="enter your mobile number"
              iconSrc="/assets/icons/email.svg"
              iconAlt="mobileno"
              renderSelectGenderSkeleton={(field) => {
                
                return <FormControl>

                  <RadioGroup 
                    className='flex h-11 gap-6 lg:justify-between' 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >

                    { GenderOptions.map((option) => (
                      
                      <div key={option} className='radio-group'>

                        <RadioGroupItem value={option} id={option} />

                        <Label htmlFor={option} className='cursor-pointer'>{option}</Label>

                      </div>

                    ))}

                  </RadioGroup>

                </FormControl>
              }}
            />

          </div>


          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              formControl={form.control}
              fieldType="addressInput"
              name="address"
              label="Full Address"
              placeholder="enter your address"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="occupationInput"
              name="occupation"
              label="Occupation"
              placeholder="enter your occupation"
            />

          </div>


          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              formControl={form.control}
              fieldType="emergencyContactNameInput"
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="enter your emergency contact name"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="emergencyContactNumberInput"
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="enter your emergency contact number"
            />

          </div>


          <section className="space-y-6">

            <div className="mb-9 space-y-1">

              <h2 className="sub-header">Medical Information</h2>

            </div>

          </section>


          <CustomFormField
            formControl={form.control}
            fieldType="selectPrimaryPhysicianInput"
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="select your primary physician"
          >
            {Doctors.map((doctor) => (

              <SelectItem key={doctor.name} value={doctor.name}>

                <div className='flex cursor-pointer items-center gap-2'>

                  <Image 
                    src={doctor.image} 
                    width={32} 
                    height={32} 
                    alt={doctor.name} 
                    className='rounded-full border border-dark-500' 
                  />

                  <p>{doctor.name}</p>

                </div>

              </SelectItem>

            ))}
          </CustomFormField>


          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              formControl={form.control}
              fieldType="insuranceProviderInput"
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="enter the name of your insurance provider"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="insurancePolicyNumberInput"
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="enter your insurance policy number"
            />

          </div>


          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              formControl={form.control}
              fieldType="allergiesInput"
              name="allergies"
              label="Allergies"
              placeholder="please describe any allergies you have (if any)"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="currentMedicationInput"
              name="currentMedication"
              label="Current Medication"
              placeholder="enter your current medication (if any)"
            />

          </div>


          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              formControl={form.control}
              fieldType="familyMedicalHistoryInput"
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="please describe your family medical history"
            />

            <CustomFormField
              formControl={form.control}
              fieldType="pastMedicalHistoryInput"
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="please describe your past medical history"
            />

          </div>


          <section className="space-y-6">

            <div className="mb-9 space-y-1">

              <h2 className="sub-header">Identification and Verification</h2>

            </div>

          </section>


          <CustomFormField
            formControl={form.control}
            fieldType="identificationCategorySelectInput"
            name="identificationType"
            label="Identification Type"
            placeholder="select an identification type"
          >
            {IdentificationTypes.map((identification) => (

              <SelectItem key={identification} value={identification}>

                <div className='flex cursor-pointer items-center gap-2'>

                  <p>{identification}</p>

                </div>

              </SelectItem>

            ))}
          </CustomFormField>


          <CustomFormField
            formControl={form.control}
            fieldType="identificationNumberInput"
            name="identificationNumber"
            label="Identification Number"
            placeholder="enter the identification number"
          />


          <CustomFormField
            formControl={form.control}
            fieldType="applicationIdenitificationDocumentInput"
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            placeholder="select a physician of your choice"
            renderIdentificationDocumentUploadSkeleton = {(field) => {

              return <FormControl>
              
                <FileUploader files={field.value} onChange={field.onChange} />

              </FormControl>

            }}
          >

          </CustomFormField>


          <section className="space-y-6">

            <div className="mb-9 space-y-1">

              <h2 className="sub-header">Consent and Privacy</h2>

            </div>

          </section>


          <CustomFormField
            formControl={form.control}
            fieldType="consentToReceiveTreatmentForHealthConditionCheckbox"
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition"
          />

          <CustomFormField
            formControl={form.control}
            fieldType="consentToDiscloseHealthConditionForTreatmentPurposeCheckbox"
            name="discloseConsent"
            label="I consent to the use and disclosure of my health information for treatment purpose"
          />

          <CustomFormField
            formControl={form.control}
            fieldType="consentToAgreeTermsAndConditionsCheckbox"
            name="termsAndConditions"
            label="I acknowledge that I review and agree to the privacy policy"
          />

          

          <SubmitButton isLoading={isLoading}>Submit</SubmitButton>

        </form>

      </Form>

    </div>
    
  );
};

export default PatientRegisterForDoctorForm;
