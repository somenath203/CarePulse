'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AppointmentForm from '../../forms/AppointmentForm';


const AppointmentModal = ({ type, patientId, userId, appointment }) => {


  const [ openDialog, setOpenDialog ] = useState(false);


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>


      <DialogTrigger asChild>

        <Button variant='ghost' className={`capitalize ${type === 'schedule' ? 'text-green-500' : 'text-red-500'}`}>{type}</Button>
      
      </DialogTrigger>


      <DialogContent className='shad-dialog sm:max-w-md'>

        <DialogHeader className='mb-4 space-y-3'>

          <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>

          <DialogDescription>

            Please fill in the following details to {type} the 
            
          </DialogDescription>

        </DialogHeader>

        <AppointmentForm
            type={type}
            patientId={patientId}
            userId={userId}
            appointment={appointment}
            setOpenDialog={setOpenDialog}
        />

      </DialogContent>


    </Dialog>
  );
};


export default AppointmentModal;
