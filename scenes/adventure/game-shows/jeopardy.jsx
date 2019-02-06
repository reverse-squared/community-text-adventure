import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import Jeopardy from "./jeo-data";
import SceneLink from "@templates/SceneLink";
import { formatMoney } from "@scenes/after-hospital/loan/loan";

addFlag("jeopardyMoney", 0);
addFlag("jeopardyQuestionsAnswered", []);
addFlag("jeopardyQuestionsLeft", 10);
addFlag("jeopardyCorrect", 0);

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
                        <p>Since the other contestants called in sick, you are the only one here. You will only be able to answer 10 questions instead of the entire board.</p>
                    </React.Fragment>
                    : <React.Fragment>
                        <p>You can answer {jeopardyQuestionsLeft} more questions, what do you go for next?</p>
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
                        { text: "Continue", to: "jeopardy_decideend" },
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
                action: () => {
                    jeopardyCorrect++;
                },
                options: [
                    { text: "Continue", to: "jeopardy_decideend" },
                ],
                noContributor: true,
            }
        };
    }).reduce((obj,next) => ({...obj, ...next}), {}),
    // #endregion

    jeopardy_decideend: {
        prompt: () => <div />,
        options: [],
        noContributor: true,
        excludeEmptyOptionsCheck: true,
        action: () => {
            if(jeopardyQuestionsLeft <= 0) {
                // Ending
                if(jeopardyMoney >= 9200) {
                    setScene("je_profit");
                } else if(jeopardyMoney === 0) {
                    setScene("je_break_even");
                } else if(jeopardyCorrect === 0) {
                    setScene("je_failure");
                } else if(jeopardyMoney > 0) {
                    setScene("je_win");
                } else {
                    setScene("je_lose");
                }
            } else {
                setScene("jeopardy_start");
            }
        },
    }
});
