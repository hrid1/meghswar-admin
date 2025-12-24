import React from 'react'
import UnProcessedTable from './_components/UnProcessedTable'
import PageTitle from '@/components/reusable/PageTittle'

export default function page() {
  return (
    <div>
      <PageTitle title='Reverse Entry - Unprocessed'/>
      <UnProcessedTable/>
    </div>
  )
}
