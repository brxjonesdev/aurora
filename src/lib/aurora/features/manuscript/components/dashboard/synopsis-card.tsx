import { File } from '@/lib/aurora/core/types/manuscript'
import React from 'react'

export default function SynopsisCard({id, title, synopsis}: {id: string, title: string, synopsis: string}) {
  console.log(title, 'title in synopsis card')
  return (
    <div>{synopsis}</div>
  )
}
