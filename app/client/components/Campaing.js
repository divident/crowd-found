import React, { useEffect, useState } from "react";
import { useReadCampaigns } from "../hooks";
import { ProgressBar } from "./ProgressBar";
import { useEthers } from "@usedapp/core";
import { useContext } from "react";
import { CountContext } from "./Context";

export function Campaign(props) {

    const { value, error } = useReadCampaigns(props.id)
    const { account } = useEthers()
    const [campaign, setCampaign] = useState();
    const [active, setActive] = useState();
    const dispatch = useContext(CountContext);


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
            const isActive = tmp.creator !== '0x0000000000000000000000000000000000000000' ? true : false

            setActive(isActive);
        }
    }, [props.id, value])


    function isOwner(creator) {
        return creator === account
    }

    return (
        <div>
            {active &&
                <div className="bg-violet-100 hover:bg-violet-600 hover:text-white my-4 py-2 px-4 rounded-xl">
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
        </div>
    )
}
