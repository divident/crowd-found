import React, { useEffect } from "react";
import { Campaign } from "./Campaing";
import { Link } from "react-router-dom";
import "./Home.css"

export function CampaingsList(props) {

    useEffect(() => {

    }, [props.count])


    return (
        <div>
            {Array.from(Array(props.count+1).keys()).slice(1).map(id => (
                <div className="fade-in" key={id}>
                    <Link to={"/campaings/" + id}>
                        <Campaign id={id} />
                    </Link>
                </div>
            ))}
        </div>
    )
}
