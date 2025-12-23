import React from 'react'
import ParcelReportTable from './_components/ParcelReportTable'
import PageTitle from '@/components/reusable/PageTittle'

export default function page() {
  return (
    <div>
      <PageTitle title='Parcel Reports'/>
      <ParcelReportTable/>
    </div>
  )
}
