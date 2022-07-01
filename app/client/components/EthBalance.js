import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { TitleBar } from './TitleBar'


export function EthBalance() {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)
  
    return (
      <div>
        <TitleBar title="Balance"/>
        {etherBalance && 
          (
            <div className="balance">
              Ether balance: 
              <p className="bold">{formatEther(etherBalance)} ETH</p>
            </div>
          )
        }
      </div>
    )
  }