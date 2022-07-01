import { useEthers } from '@usedapp/core'
import React, { useEffect, useRef } from 'react'


export function AccountIcon({ account }) {
  const size = 20
  const borderRadius = '50%'

  const { account: walletAccount } = useEthers()
  const address = account ?? walletAccount
  
  const accountIconRef = useRef(null)

  useEffect(() => {
    if (address && accountIconRef.current) {
      accountIconRef.current.innerHTML = ''
    }
  }, [address, accountIconRef, size])

  return <div ref={accountIconRef} style={{ borderRadius }} />
}
