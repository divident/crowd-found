import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useEthers } from "@usedapp/core";
import { usePledge, useReadCampaigns, useReadPledge, useRefund, useAllowance, useCancel, useUnpledge, useClaim } from "../hooks";
import { TitleBar } from "./TitleBar";
import { ProgressBar } from "./ProgressBar";
import { StatusBar } from "./StatusBar";
import { useGetBalance } from "../hooks";

export function CampaingDetails(props) {

    const { id } = useParams();
    const { value, error } = useReadCampaigns(id)
    const { account } = useEthers()

    const { state, send } = useRefund();

    const { valuePled, errorPleg } = useReadPledge(id, account);
    const pledgeFunc = usePledge();
    const balanceOf = useGetBalance(account)

    const [campaign, setCampaign] = useState();
    const [pledged, setPledged] = useState();
    const [amount, setAmount] = useState();
    const allowanceFunc = useAllowance();
    const [allowanceState, setAllowanceState] = useState(false);
    const cancelFunc = useCancel();
    const claimFunc = useClaim();
    const unpledgeFunc = useUnpledge();
    const [balance, setBalance] = useState(0);


    useEffect(() => {
        if (value) {
            const tmp = {
                creator: value[0],
                goal: parseInt(value[1]._hex, 16),
                pledged: parseInt(value[2]._hex, 16),
                startAt: new Date(value[3] * 1000).toLocaleDateString(),
                endAt: new Date(value[4] * 1000).toLocaleDateString(),
                claimed: value[5] ? 'yes' : 'no'
            }
            setCampaign(tmp);
        }

        if (valuePled) {
            setPledged(parseInt(valuePled[0]._hex, 16));
        }

        if (allowanceFunc?.state && allowanceFunc.state.status === "Success") {
            if(allowanceState == false) {
                pledgeFunc.send(id, amount);
                setAllowanceState(true);
            }
        } else {
            setAllowanceState(false);
        }

        if(balanceOf && balanceOf.value) {
            setBalance(parseInt(balanceOf.value[0]._hex, 16) / 10e17)
        }

    }, [props.id, value, account, valuePled, allowanceFunc.state])

    function isOwner(creator) {
        return creator === account
    }

    function onRefund(ev) {
        send(id)
    }

    function onAmountChange(ev) {
        setAmount(ev.target.value)
    }

    function onSubmit(ev) {
        ev.preventDefault();
        const contractAddress = '0x29be70B9377b687a83389C924A0dD8177DddafFD';

        allowanceFunc.send(contractAddress, amount);
    }

    function onUnpledge(ev) {
        unpledgeFunc.send(id, pledged)

    }

    function onClaim(ev) {
        claimFunc.send(id)
    }

    function onCancel(ev) {
        cancelFunc.send(id)
    }

    return (
        <div>
            <StatusBar state={unpledgeFunc.state} />
            <StatusBar state={pledgeFunc.state} />
            <StatusBar state={allowanceFunc.state} />
            <StatusBar state={state} />
            <StatusBar state={cancelFunc.state} />
            <StatusBar state={claimFunc.state} />
            <TitleBar title={"Campaing Number " + id} />
            <div>
                {campaign &&
                    <div className="bg-violet-100 my-4 py-2 px-4 rounded-xl">
                        <p className="text-md">Creator: {campaign.creator}  {isOwner(campaign.creator) && "(you)"}</p>


                        <div className="flex gap-0.5 flex-col text-right">
                            <div>Start at: {campaign.startAt}</div>
                            <div>End at: {campaign.endAt}</div>
                        </div>
                        <div className="text-center">
                            <div>Collected {campaign.pledged} from {campaign.goal}</div>
                            <ProgressBar percentage={campaign.pledged / campaign.goal * 100} />
                        </div>
                    </div>
                }

                {pledged !== undefined && (
                    <div className="bg-violet-100 py-2 px-4 min-h-16 rounded-xl flex flex-col gap-4">
                        <div className="w-full mb-2">
                            <h3 className="mb-4">Pledged amount:&nbsp;{pledged}</h3>
                            <p className="mb-2">Available balance: <span className="font-medium">{balance}&nbsp;DAPP</span></p>
                            <button className="btn-secondary" disabled={false} onClick={onUnpledge}>Unpledge</button>
                        </div>
                        <div className="w-full border-t-2 border-violet-600 mb-2 pt-2">
                            <h3 className="mb-4">Pledge</h3>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                        Amount
                                    </label>
                                    <input onChange={onAmountChange} className="shadow appearance-none border rounded w-full 
                                        required
                                        py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                                        focus:shadow-outline" id="amount" type="number" placeholder="Amount" />
                                </div>
                                <button className="btn-secondary" type="submit" onClick={onSubmit}>Submit</button>
                            </form>
                        </div>
                        {isOwner(campaign.creator) && <div className="w-full border-t-2 border-violet-600 pt-2 mb-4">
                            <h3 className="mb-4">Owner functions</h3>
                            <button className="btn-secondary" onClick={onClaim}>Claim</button>
                            <button className="btn-secondary mx-2" onClick={onRefund}>Refund</button>
                            <button className="btn-secondary mx-2" onClick={onCancel}>Cancel</button>
                        </div>
                        }
                    </div>

                )}
            </div>
        </div>
    )
}