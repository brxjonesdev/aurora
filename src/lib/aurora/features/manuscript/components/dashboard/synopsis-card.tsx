import { File } from '@/lib/aurora/core/types/manuscript'
import React from 'react'

export default function SynopsisCard({item}: {item: File}) {
  console.log(item, 'item in synopsis card')
  return (
    <div>{item.hoverSynopsis}</div>
  )
}
