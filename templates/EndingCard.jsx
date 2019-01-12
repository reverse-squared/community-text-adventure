import React, { Fragment } from "react";
import Lock from "@res/lock";

export default ({ ending }) => <div className="ending-square">
    <div className="ending-square-title">{ending.name}</div>
    {
        ending.achieved
            ? <Fragment>
                <div className="ending-square-desc">{ending.description}</div>
                <div className={"ending-square-status status-yes"}>Achieved</div>
            </Fragment>
            : <Fragment>
                <br />
                <Lock />
            </Fragment>
    }
</div>;
