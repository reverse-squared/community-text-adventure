import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import Jeopardy from "./jeo-data";

addFlag("jeopardyMoney", 0);

addScenes({
    jeopardy_pre: {
        prompt: () => <div>
            <p>Your application to play Jeopardy on LIVE national TV has been approved!</p>
        </div>,
        options: [
            { text: "Go there", to: "jeopardy_start" }
        ],
        contributor: "Hunter"
    },
    jeopardy_start: {
        prompt: () => <div>
            <p>You stand behind your podium as Alex Trebek names off the categories...</p>
            <p>Which do you go for first?</p>
            <table>
                <thead>
                    <tr>
                        {
                            Jeopardy.map((c, i) => <th key={i}>{c.catagoryName}</th>)
                        }
                    </tr>
                    {
                        [100, 200, 300, 400, 500].map(price => {
                            return <tr>
                                {
                                    [0,1,2,3,4].map(cata => {
                                        return <td style={{textAlign:"center"}}>{price}</td>;
                                    })
                                }
                            </tr>;
                        })
                    }
                </thead>
            </table>
        </div>,
        options: [

        ],
        contributor: "Dave"
    }
});
