import React from 'react'
import { useEthers } from '@usedapp/core'

export const MetamaskConnect = () => {
    const { account, activateBrowserWallet, chainId, deactivate, library } = useEthers()


    const onDisconnect = () => {
        localStorage.removeItem('walletconnect')
        deactivate()
    }
    const ConnectButton = () => (
        <div>
            <button className="btn-secondary" onClick={() => activateBrowserWallet()}>Connect</button>
        </div>)

    const DisconnectButton = () => (
        <div>
            <button className="btn-secondary" onClick={() => onDisconnect()}>Disconnect</button>
        </div>
    )


    return (
        <div className="grid gap-2 grid-cols-2 grid-rows-1 max-w-[300px]  max-h-6 items-center justify-items-end">
            {!!account ? (
                <div>
                    <div className="max-w-[200px] account overflow-hidden text-ellipsis whitespace-nowrap">{account}</div>
                </div>) : (<div></div>)}
            <div>
                {!!account ? <DisconnectButton /> : <ConnectButton />}
            </div>
        </div>
    )
}