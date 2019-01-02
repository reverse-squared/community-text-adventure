import React from "react";
import Lock from "../res/lock.jsx";

export default ({ ending, hideAchievedState }) => <div className="ending-square">
    <div className="ending-square-title">{ending.name}</div>
   
    {
        !hideAchievedState
            ? <div>
                {
                    ending.achieved
                        ? <div>
                            <div className="ending-square-desc">{ending.description}</div>
                            <div className={"ending-square-status status-yes"}>Achieved</div>
                        </div>
                        : <div>
                            <br/>
                            <Lock />
                        </div>
                }
            </div>
            : null
    }
    
</div>;