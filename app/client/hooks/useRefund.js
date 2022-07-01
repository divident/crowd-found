import { useContractFunction } from "@usedapp/core"
import CrowdFund from '../../../deploy/build/contracts/CrowdFundAbi.json'

import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const useRefund = () => {

    const contractAddress = '0x29be70B9377b687a83389C924A0dD8177DddafFD';
    const interafce = new utils.Interface(CrowdFund)

    const contract = new Contract(
        contractAddress,
        interafce,
    )

    const { state, send } = useContractFunction(contract, "refund", {
        transactionName: "Wrap",
    })

    return { state, send }
}

