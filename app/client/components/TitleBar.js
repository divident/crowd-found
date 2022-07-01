import React, { useEffect, useState } from "react";
import { MetamaskConnect } from "./MetamaskConnect";


export function TitleBar(props) {

    return (
        <div className="flex w-100 justify-between text-white">
            <div>
                <h2 className="text-2xl">{props.title}</h2>
            </div>
            <div>
                <MetamaskConnect />
            </div>
        </div>
    )
}