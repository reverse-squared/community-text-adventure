import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import Jeopardy from "./jeo-data";
import SceneLink from "@templates/SceneLink";
import { formatMoney } from "@scenes/after-hospital/loan/loan";

addFlag("jeopardyMoney", 0);
addFlag("jeopardyQuestionsAnswered", []);

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
        <em>This is Jeopardy!</em> You have {formatMoney(jeopardyMoney)}.
    </p>
</div>;

addScenes({
    // #region Jeopardy
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
            <JeopardyHeader />
            {
                jeopardyQuestionsAnswered.length === 0
                    ? <React.Fragment>
                        <p>You stand behind your podium as Alex Trebek names off the categories...</p>
                        <p>Which do you go for first?</p>
                    </React.Fragment>
                    : <React.Fragment>
                        <p>Which do you go for next?</p>
                    </React.Fragment>    
            }
            
            <table>
                <thead>
                    <tr>
                        {
                            Jeopardy.map((c, i) => <th key={i}>{c.catagoryName}</th>)
                        }
                    </tr>
                    {
                        [200, 400, 600, 800, 1000].map(price => {
                            return <tr>
                                {
                                    [0,1,2,3,4,5].map(cata => {
                                        return <td style={{textAlign:"center"}}>
                                            <SceneLink
                                                disabled={jeopardyQuestionsAnswered.includes(`jeopardy_c${cata}_${price}`)}
                                                to={`jeopardy_c${cata}_${price}`}
                                            >
                                                {price}
                                            </SceneLink>
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
    ...[200, 400, 600, 800, 1000].map(price => {
        return [0, 1, 2, 3, 4, 5].map(cata => {
            const catagory = Jeopardy[cata];
            const question = catagory.questions[price];
            return {
                [`jeopardy_c${cata}_${price}`]: {
                    prompt: () => <div>
                        <JeopardyHeader />
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
                            if (i === 0) {
                                // correct
                                jeopardyMoney += price;
                                setScene(`answer_correct_${price}`);
                            } else {
                                // wrong
                                jeopardyMoney -= price;
                                setScene(`jeopardy_incorrect_c${cata}_${price}`);

                            }
                        },
                    }))),
                    contributor: question.contributor,
                    action: () => {
                        jeopardyQuestionsAnswered.push(`jeopardy_c${cata}_${price}`);
                    }
                },
                [`jeopardy_incorrect_c${cata}_${price}`]: {
                    prompt: () => <div>
                        <JeopardyHeader />
                        <p>
                            And that would be '{
                                question.options[0].text.apply
                                    ? question.options[0].text
                                    : question.options[0].text.replace(/^(What|Who|Where) is /g, "")
                            }'.
                        </p>
                        <p>
                            <span style={{ color: "red" }}>-{formatMoney(price)}</span>
                        </p>
                    </div>,
                    options: [
                        { text: "Continue", to: "jeopardy_start" },
                    ],
                    noContributor: true,
                },
            };
        }).reduce((obj, next) => ({ ...obj, ...next }), {});
    }).reduce((obj,next) => ({...obj, ...next}), {}),
    ...[200, 400, 600, 800, 1000].map(price => {
        return {
            [`answer_correct_${price}`]: {
                prompt: () => <div>
                    <JeopardyHeader />
                    <p>
                        Correct!
                    </p>
                    <p>
                        <span style={{ color: "lime" }}>+{formatMoney(price)}</span>
                    </p>
                </div>,
                options: [
                    { text: "Continue", to: "jeopardy_start" },
                ],
                noContributor: true,
            }
        };
    }).reduce((obj,next) => ({...obj, ...next}), {})
    // #endregion
});
