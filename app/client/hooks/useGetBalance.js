import DappToken from '../../../deploy/build/contracts/DappTokenAbi.json'

import { useCall } from '@usedapp/core'
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export function useGetBalance(account) {

    const contractAddress = '0x8322f207b796bc9795647Ed3BeD28b8C1b97D103';
    const interafce = new utils.Interface(DappToken)

    const contract = new Contract(
        contractAddress,
        interafce,
    )

    
    const { value, error } = useCall(contractAddress && {
        contract: contract,
        method: 'balanceOf',
        args: [account]
      }) ?? {}

      return {value, error}
}