import Image from "next/image";
import * as Sentry from '@sentry/nextjs';

import PatientRegisterForDoctorForm from "@/app/_components/forms/PatientRegisterForDoctorForm";
import { getCurrentAuthenticatedUser } from "@/lib/actions/patient.actions";


const Page = async ({ params }) => {


  const user = await getCurrentAuthenticatedUser(params?.userId);

  
  Sentry.metrics.set('user_view_register_page', user?.name); 
  

  return (
    <div className="h-screen max-h-screen flex">

      <section className="container remove-scrollbar">

        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">

          <Image 
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientRegisterForDoctorForm user={user}  />

          <p className="copyright py-12">© {new Date().getFullYear()} CarePulse</p>

        </div>

      </section>

      <Image 
        src='/assets/images/register-img.png'
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]" 
      />
      

    </div>
  )
};

export default Page;