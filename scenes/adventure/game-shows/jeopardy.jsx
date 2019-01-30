import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import Jeopardy from "./jeo-data";
import SceneLink from "@templates/SceneLink";
import { formatMoney } from "@scenes/after-hospital/loan/loan";

addFlag("jeopardyMoney", 0);

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const JeopardyHeader = () => <div>
    <p className="jeo-header">
        Jeopardy! You have {formatMoney(jeopardyMoney)}.
    </p>
</div>;

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
                                        return <td style={{textAlign:"center"}}>
                                            <SceneLink to={`jeopardy_c${cata}_${price}`}>{price}</SceneLink>
                                        </td>;
                                    })
                                }
                            </tr>;
                        })
                    }
                </thead>
            </table>
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        contributor: "Dave"
    },
    ...[100, 200, 300, 400, 500].map(price => {
        return [0, 1, 2, 3, 4].map(cata => {
            const catagory = Jeopardy[cata];
            const question = catagory.questions[price];
            return {
                prompt: () => <div>
                    <p>
                        You choose {catagory.catagoryName} for ${price}.
                    </p>
                    <p>
                        <question.question />
                    </p>
                </div>,
                options: shuffle(question.options.map((opt, i) => ({
                    text: opt.text,
                    to: null,
                    action: () => {
                        // sure
                        if(i===0) {
                            // correct
                        } else {
                            // wrong
                        }
                    },
                    contributor: opt.contributor,
                }))),

                jeo_catagory: cata,
                jeo_price: price,
            };
        }).reduce((obj, next) => (obj[`jeopardy_c${next.jeo_catagory}_${next.jeo_price}`]=next,obj), {});
    }).reduce((obj,next) => ({...obj, ...next}), {})
});
