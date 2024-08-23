import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

import StatCard from '../_components/admin/StatCard';
import { getAppointmentList } from '@/lib/actions/appointment.actions';
import { AdminUserDataTable } from '../_components/admin/table/AdminUserDataTable';
import { allColumns } from '../_components/admin/table/allColumns';
import { decryptKey } from '../lib/utils';


const Page = async () => {

  let isAccessPassKeyCorrect = false;
  
  const accessPassKey = cookies().get('accessPassKeyCookie')?.value;

  if (accessPassKey) {

    isAccessPassKeyCorrect = decryptKey(accessPassKey) === process.env.NEXT_PUBLIC_ADMIN_PASS_KEY;

  }
  

  const allAppointmentsCateogiresDetails = await getAppointmentList();


  return (
     <div className="mx-auto max-w-7xl flex-col space-y-14">

      <header className="admin-header">

        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={16}
            height={162}
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>

      </header>

      {accessPassKey && isAccessPassKeyCorrect ? <main className="admin-main">

        <section className="w-full space-y-4">

          <h1 className="header"> Welcome ✨ </h1>

          <p className="text-dark-700">
            Start today with managing new appointments
          </p>

        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={
              allAppointmentsCateogiresDetails?.scheduledAppointmentsCounts
            }
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />

          <StatCard
            type="pending"
            count={allAppointmentsCateogiresDetails?.pendingAppointmentsCounts}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />

          <StatCard
            type="cancelled"
            count={
              allAppointmentsCateogiresDetails?.cancelledAppointmentsCounts
            }
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <AdminUserDataTable
          columns={allColumns}
          data={allAppointmentsCateogiresDetails?.allDocuments}
        />

      </main> : <div className='min-h-screen flex justify-center'>
        <p className='mt-28 text-center p-4 text-lg lg:text-xl tracking-widest uppercase'>Access denied: You must be enter admin access key in order to view this page.</p>
      </div>}

    </div>
  );
};

export default Page;
