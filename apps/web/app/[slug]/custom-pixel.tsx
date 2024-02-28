'use client'

import React, {useEffect} from 'react'
import {setCustomPixelId} from '@/lib/analytics-facebook'

export function CustomPixel({id}: {id: string}) {
  useEffect(() => {
    setCustomPixelId(id)
  }, [id])

  return <></>
}
