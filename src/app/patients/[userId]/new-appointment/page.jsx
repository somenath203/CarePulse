import Image from "next/image";
import * as Sentry from '@sentry/nextjs';

import AppointmentForm from "@/app/_components/forms/AppointmentForm";
import { getPatientByIdOfTheUserWhoCreatedThePatient } from "@/lib/actions/patient.actions";


const Page = async ({ params }) => {


  const patient = await getPatientByIdOfTheUserWhoCreatedThePatient(params?.userId);


  Sentry.metrics.set('user_view_new_appointment_page', patient?.fullName); 


  return (
    <div className="h-screen max-h-screen flex">

      <section className="container my-auto remove-scrollbar">

        <div className="sub-container max-w-[860px] flex-1 justify-between">

          <Image 
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create" 
            userId={params?.userId}
            patientId={patient?.$id}
          />

          <p className="copyright py-12">© {new Date().getFullYear()} CarePulse</p>

        </div>

      </section>

      <Image 
        src='/assets/images/appointment-img.png'
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom" 
      />
      

    </div>
  )
};

export default Page;
