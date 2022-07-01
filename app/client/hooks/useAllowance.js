import { useContractFunction } from "@usedapp/core"
import DappToken from '../../../deploy/build/contracts/DappTokenAbi.json'

import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"


export function useAllowance() {
    const contractAddress = '0x8322f207b796bc9795647Ed3BeD28b8C1b97D103';
    const interafce = new utils.Interface(DappToken)

    const contract = new Contract(
        contractAddress,
        interafce,
    )

    const { state, send } = useContractFunction(contract, "increaseAllowance",

        {
            transactionName: "Wrap",
        })

    return { state, send }
}