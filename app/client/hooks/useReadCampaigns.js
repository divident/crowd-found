
import CrowdFund from '../../../deploy/build/contracts/CrowdFundAbi.json'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import { useCall } from '@usedapp/core'

export const useReadCampaigns = (campaignId) => {


    const contractInterface = new utils.Interface(CrowdFund)
    const contractAddress = '0x29be70B9377b687a83389C924A0dD8177DddafFD'
    const contract = new Contract(contractAddress, contractInterface)

    
    const { value, error } = useCall(contractAddress && {
        contract: contract,
        method: 'campaigns',
        args: [campaignId]
      }) ?? {}
      
      return {value, error}
}
