import React from "react";


export function ProgressBar(props) {
    return (
        <div className="w-full bg-black rounded-full h-4 dark:bg-black">
            <div className="bg-violet-300 h-4 rounded-full" style={{width: props.percentage + "%"}}></div>
        </div>
    )
}