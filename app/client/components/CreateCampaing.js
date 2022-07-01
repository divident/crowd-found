import React, { useState } from "react";
import { useLaunch } from "../hooks";
import { StatusBar } from "./StatusBar";
import { TitleBar } from "./TitleBar";

export function CreateCampaing() {

    const [values, setValues] = useState({});
    const { state, send } = useLaunch();


    const onValChange = (value) => (ev) => {
        setValues(e => ({ ...e, [value]: ev.target.value }));
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(JSON.stringify(values));
        const startAtTimestamp = Math.floor(new Date(values.startAt).getTime() / 1000)
        const endAtTimestamp = Math.floor(new Date(values.endAt).getTime() / 1000)
        send(values.goal, startAtTimestamp, endAtTimestamp);
    }

    return (
        <div>
            <StatusBar state={state} />
            <TitleBar title="Create Campaing" />
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mt-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
                        Goal
                    </label>
                    <input onChange={onValChange("goal")} className="shadow appearance-none border rounded w-full 
                        py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                        focus:shadow-outline" id="goal" type="text" placeholder="Goal" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startAt">
                        Start at
                    </label>
                    <input onChange={onValChange("startAt")} className="shadow appearance-none border rounded w-full 
                    py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                    focus:shadow-outline" id="startAt" type="text" placeholder="YYYY-MM-DD" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endAt">
                        End at
                    </label>
                    <input onChange={onValChange("endAt")} className="shadow appearance-none border rounded w-full 
                    py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                    focus:shadow-outline" id="endAt" type="text" placeholder="YYYY-MM-DD" />
                </div>
                <div className="text-right">
                    <button onClick={onSubmit} className="btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}