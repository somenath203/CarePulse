import Link from "next/link";
import Image from "next/image";
import * as Sentry from '@sentry/nextjs';

import { fetchAppointmentDetails } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { getCurrentAuthenticatedUser } from "@/lib/actions/patient.actions";


const Page = async ({ searchParams, params: { userId }}) => {


  const appointmentId = searchParams?.appointmentId;
  
  const appointment = await fetchAppointmentDetails(appointmentId);

  const doctorWithWhomUserBookedAppointment = Doctors.find((doctor) => doctor.name === appointment?.doctorForAppointment);
  
  const user = await getCurrentAuthenticatedUser(userId);

  
  Sentry.metrics.set('user_view_success_page', user?.name); 

  
  return (
    <div className="flex h-screen max-h-screen px-[5%]">

      <div className="success-img">

        <Link href='/'>

          <Image 
           src="/assets/icons/logo-full.svg"
           alt="success img"
           width={1000}
           height={1000}
           className="h-10 w-fit"
          />
        
        </Link>

        <section className="flex flex-col items-center">

          <Image
            src='/assets/gifs/success.gif'
            height={300}
            width={280}
            alt="success"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">

            Your <span className="text-green-500">appointment request</span> has been successfully submitted.

          </h2>

          <p className="text-xl text-center">

            You will receive a confirmation email once the admin approves your appointment. Please keep an eye on your inbox, and do not forget to check your spam folder just in case the email ends up there. 😊

          </p>
          
        </section>


        <section className="request-details">

          <p>Requested appointment details:</p>

          <div className="flex items-center gap-3">

            <Image
              src={doctorWithWhomUserBookedAppointment?.image}
              alt={doctorWithWhomUserBookedAppointment?.name}
              width={100}
              height={100}
              className="size-6"
            />

            <p className='whitespace-nowrap'>Dr. {doctorWithWhomUserBookedAppointment?.name}</p>

          </div>

          <div className="flex gap-2">

            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />

            <p>{formatDateTime(appointment?.dateOfDoctorAppointment).dateTime}</p>

          </div>

        </section>

        <Button variant='outline' className='shad-primary-btn' asChild>

          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>

        </Button>

        <p className="copyright py-12">© {new Date().getFullYear()} CarePulse</p>

      </div>

    </div>
  )
};

export default Page;