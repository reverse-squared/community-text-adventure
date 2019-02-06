import React, { Fragment } from "react";
import Lock from "@res/lock";
import classNames from "classnames";

export default ({ ending }) => <div className={classNames({
    "ending-square": true,
    achieved: ending.achieved,
    locked: !ending.achieved
})}>
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
