import React, { useEffect, useState } from "react";
import { LoadingAnim } from "./LoadingAnim";


const statusType = {
    "None": { message: "None", color: "", loading: false, hash: false },
    "PendingSignature": { message: "Pending", color: "", loading: true, hash: false },
    "Mining": { message: "Mining", color: "", loading: true, hash: true, hash: true },
    "Success": { message: "Success", color: "", loading: false, hash: true },
    "Fail": { message: "Fail", color: "", loading: false, hash: true },
    "Exception": { message: "Exception", color: "", loading: false, hash: true }
}

export function StatusBar(props) {
    const [hash, setHash] = useState("")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [show, setShow] = useState();

    useEffect(() => {
        const status = props.state?.status || "None"
        if (statusType[status]?.loading || false) {
            setHash(props?.state?.transaction?.hash || "")
        }

        setLoading(statusType[status]?.loading || false);

        if (status === "Exception" || status === "Fail") {
            setMessage(`${statusType[status].message}: ${props.state?.errorMessage || "Unknown error"}`)
        } else {
            setMessage(statusType[status]?.message || "None");
        }
        if (status !== "None") {
            setShow(true);
        } else {
            setShow(false);
        }

    }, [props.state])

    function onClose(ev) {
        setShow(false);
    }

    if (show) {
        return (
            <div className="bg-violet-100 h-16 mb-6 p-3 rounded-xl flex items-center gap-4">
                {hash && <a href={"https://rinkeby.etherscan.io/tx/" + hash} target="_blank" className="btn-secondary">View transaction</a>}
                <p>Status: {message}</p>
                {loading && <LoadingAnim />}
                <div className="ml-auto cursor-pointer mr-3 hover:scale-150 transition-scale duration-500" onClick={onClose}>X</div>
            </div>
        )
    } else {
        return <div></div>
    }
}
