"use client"

import Image from "next/image";

import StatusBadge from "./StatusBadge";
import { formatDateTime } from "@/app/lib/utils";
import { Doctors } from "@/constants";
import AppointmentModal from "./AppointmentModal";


export const allColumns = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: 'patient',                     
    header: 'Patient',
    cell: ({ row }) => {

      const appointment = row.original;

      return <p className="text-14-medium">
        {appointment.patient.fullName}
      </p>

    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="min-w-[115px]">

        <StatusBadge status={row.original.status} />

      </div>
    }
  },
  {
    accessorKey: "dateOfDoctorAppointment",
    header: "Date of Doctor Appointment",
    cell: ({ row }) => {
      return <p className="text-14-regular min-w-100px">
        {formatDateTime(row.original.dateOfDoctorAppointment).dateTime}
      </p>
    }
  },
  {
    accessorKey: "doctorForAppointment",
    header: "Doctor",
    cell: ({ row }) => {

      const doctor = Doctors.find((doctor) => doctor.name === row.original.doctorForAppointment);

      return <div className="flex items-center gap-3">

        <Image
          src={doctor.image}
          alt={doctor.name}
          width={100}
          height={100}
          className="size-8"
        />

        <p className="whitespace-nowrap">Dr. {doctor.name}</p>

      </div>
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return <div className="flex gap-1">

        <AppointmentModal 
            type="schedule"
            patientId={row.original.patient.$id} 
            userId={row.original.userId}
            appointment={row.original}
          />

        <AppointmentModal 
          type="cancel" 
          patientId={row.original.patient.$id} 
          userId={row.original.userId}
          appointment={row.original}
        />

      </div>
    }, 
  },
];

