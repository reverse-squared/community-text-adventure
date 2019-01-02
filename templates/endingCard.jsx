import React from "react";

export default ({ ending, hideAchievedState }) => <div className="ending-square">
    <div className="ending-square-title">{ending.name}</div>
    <div className="ending-square-desc">{ending.description}</div>
    {
        !hideAchievedState
            ? <div className={"ending-square-status status-" + (ending.achieved ? "yes" : "no")}>{ending.achieved ? "Achieved" : "Not Achieved"}</div>
            : null
    }
</div>;