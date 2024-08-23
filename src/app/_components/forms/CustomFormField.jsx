import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import DatePicker from "react-datepicker";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import 'react-phone-number-input/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox"


const RenderInputField = ({ field, props, fieldType }) => {

    const { iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSelectGenderSkeleton, renderIdentificationDocumentUploadSkeleton, disabled } = props;

    if (fieldType === 'text') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <Image src={iconSrc} alt={iconAlt} height={24} width={24} className='ml-2' />

                <FormControl>
                    
                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'email') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <Image src={iconSrc} alt={iconAlt} height={24} width={24} className='ml-2' />

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'phoneInput') {

        return (
            <FormControl>

                <PhoneInput
                    defaultCountry='IN'
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className='input-phone'
                />

            </FormControl>
        )

    } else if (fieldType === 'datePicker') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <Image 
                    src='/assets/icons/calendar.svg' 
                    height={24} 
                    width={24} 
                    alt='calendar' 
                    className='ml-2' 
                />

                <FormControl>

                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat={dateFormat ? dateFormat : 'MM/dd/yyyy'}
                        showTimeSelect={showTimeSelect ? showTimeSelect : false}
                        timeInputLabel='Time:'
                        wrapperClassName='date-picker'
                    />

                </FormControl>

            </div>
        )

    } else if (fieldType === 'selectGender') {

        return (
            renderSelectGenderSkeleton ? renderSelectGenderSkeleton(field) : null
        )

    } else if (fieldType === 'addressInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'occupationInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'emergencyContactNumberInput') {

        return (
            <FormControl>

                <PhoneInput
                    defaultCountry='IN'
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className='input-phone'
                />

            </FormControl>
        )

    } else if (fieldType === 'emergencyContactNameInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'selectPrimaryPhysicianInput') {

        return (
            <FormControl>

                <Select onValueChange={field.onChange} defaultValue={field.value}>

                    <FormControl>

                        <SelectTrigger className='shad-select-trigger'>

                            <SelectValue placeholder={placeholder} />

                        </SelectTrigger>

                    </FormControl>

                    <SelectContent className='shad-select-content'>
                        {props.children}
                    </SelectContent>

                </Select>

            </FormControl>
            
        )

    } else if (fieldType === 'insuranceProviderInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'insurancePolicyNumberInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'allergiesInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Textarea 
                        placeholder={placeholder} 
                        {...field}
                        className='shad-textArea !resize-none'
                        disabled={props.disabled}
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'currentMedicationInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Textarea 
                        placeholder={placeholder} 
                        {...field}
                        className='shad-textArea !resize-none'
                        disabled={props.disabled}
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'familyMedicalHistoryInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Textarea 
                        placeholder={placeholder} 
                        {...field}
                        className='shad-textArea !resize-none'
                        disabled={props.disabled}
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'pastMedicalHistoryInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Textarea 
                        placeholder={placeholder} 
                        {...field}
                        className='shad-textArea !resize-none'
                        disabled={props.disabled}
                    />
                
                </FormControl>

            </div>
        )

    } else if (fieldType === 'identificationCategorySelectInput') {

        return (
            <FormControl>

                <Select onValueChange={field.onChange} defaultValue={field.value}>

                    <FormControl>

                        <SelectTrigger className='shad-select-trigger'>

                            <SelectValue placeholder={placeholder} />

                        </SelectTrigger>

                    </FormControl>

                    <SelectContent className='shad-select-content'>
                        {props.children}
                    </SelectContent>

                </Select>

            </FormControl>
            
        )

    } else if (fieldType === 'identificationNumberInput') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Input 
                        type={fieldType} 
                        placeholder={placeholder} 
                        {...field} 
                        className='shad-input border-0'
                    />
                
                </FormControl>

            </div> 
        )

    } else if (fieldType === 'applicationIdenitificationDocumentInput') {

        return (
            renderIdentificationDocumentUploadSkeleton ? renderIdentificationDocumentUploadSkeleton(field) : null
        )

    } else if (fieldType === 'consentToReceiveTreatmentForHealthConditionCheckbox') {

        return <FormControl>

            <div className="flex items-center gap-4">

                <Checkbox 
                    id={props.name} 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                />

                <label htmlFor={props.name} className='checkbox-label'>{props.label}</label>

            </div>

        </FormControl>

    } else if (fieldType === 'consentToDiscloseHealthConditionForTreatmentPurposeCheckbox') {

        return <FormControl>

            <div className="flex items-center gap-4">

                <Checkbox 
                    id={props.name} 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                />

                <label htmlFor={props.name} className='checkbox-label'>{props.label}</label>

            </div>

        </FormControl>

    } else if (fieldType === 'consentToAgreeTermsAndConditionsCheckbox') {

        return <FormControl>

            <div className="flex items-center gap-4">

                <Checkbox 
                    id={props.name} 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                />

                <label htmlFor={props.name} className='checkbox-label'>{props.label}</label>

            </div>

        </FormControl>

    } else if (fieldType === 'selectDoctorForAppointment') {

        return (
            <FormControl>

                <Select onValueChange={field.onChange} defaultValue={field.value}>

                    <FormControl>

                        <SelectTrigger className='shad-select-trigger'>

                            <SelectValue placeholder={placeholder} />

                        </SelectTrigger>

                    </FormControl>

                    <SelectContent className='shad-select-content'>
                        {props.children}
                    </SelectContent>

                </Select>

            </FormControl>
            
        )
        
    } else if (fieldType === 'selectDateForAppointment') {

        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <Image 
                    src='/assets/icons/calendar.svg' 
                    height={24} 
                    width={24} 
                    alt='calendar' 
                    className='ml-2' 
                />

                <FormControl>

                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat={dateFormat ? dateFormat : 'MM/dd/yyyy'}
                        showTimeSelect={showTimeSelect ? showTimeSelect : false}
                        timeInputLabel='Time:'
                        wrapperClassName='date-picker'
                        disabled={disabled}
                    />

                </FormControl>

            </div>
        )

    } else if (fieldType === 'reasonOfAppointmentTextArea') {

        return (

            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Textarea 
                        placeholder={placeholder} 
                        {...field}
                        className='shad-textArea !resize-none'
                        disabled={props.disabled}
                    />
                
                </FormControl>

            </div>

        )

    } else if (fieldType === 'cancellationReasonInputField') {

        return (

            <div className="flex rounded-md border border-dark-500 bg-dark-400">

                <FormControl>

                    <Textarea 
                        placeholder={placeholder} 
                        {...field}
                        className='shad-textArea !resize-none'
                        disabled={props.disabled}
                    />
                
                </FormControl>

            </div>

        )

    }

}

const CustomFormField = (props) => {

  
  const { formControl, fieldType, name, label } = props;

  
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">

            { fieldType !== 'consentToReceiveTreatmentForHealthConditionCheckbox' && fieldType !== 'consentToDiscloseHealthConditionForTreatmentPurposeCheckbox' && fieldType !== 'consentToAgreeTermsAndConditionsCheckbox' && label && <>
                <FormLabel>{label}</FormLabel>
            </>}

            <RenderInputField 
                field={field} 
                props={props} 
                fieldType={fieldType} 
            />

            <FormMessage className='shad-error' />

        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
