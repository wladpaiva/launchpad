'use client'

import React, {useEffect} from 'react'
import {setPixelId} from '@/lib/analytics-custom-facebook'

export function CustomPixel({id}: {id: string}) {
  useEffect(() => {
    setPixelId(id)
  })

  return <></>
}
