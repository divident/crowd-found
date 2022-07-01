import React from "react";
import "./LoadingAnim.css";

//None PendingSignature Mining Success Fail Exception


export function LoadingAnim(pros) {

    return (
        <div className="lds-ellipsis ">
            <div className="bg-violet-500"></div>
            <div className="bg-violet-500"></div>
            <div className="bg-violet-500"></div>
            <div className="bg-violet-500"></div>
        </div>
    )
}

