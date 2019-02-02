import React from "react";
import { setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

let delayTimer;
let autoDestTimer;
let activationTimer;
let progressTimer;
let progress;

function TimeTravelScene({ delay = 3000, timer = 3000, jDest = "nowhere", lDest = "nowhere", dest = "nowhere" }) {
    if(dest === "nowhere") throw new Error("Nowhere");
    function onKeyPress(ev) {
        if (!delayTimer && !activationTimer) {
            if (ev.key === "j" && jDest !== "nowhere") {
                setScene("timetravel" + jDest);
            }
            if (ev.key === "l" && lDest !== "nowhere") {
                setScene("timetravel" + lDest);
            }
        }
    }
    return {
        options: [],
        action: () => {
            delayTimer = setTimeout(() => {
                delayTimer = undefined;

                activationTimer = setTimeout(() => {
                    activationTimer = undefined;

                    if(jDest === "nowhere" && lDest === "nowhere") {
                        document.getElementById("outer-progress").classList.add("PROGRESS_BAR_ACTIVATED");
                    }
                    
                    const instructions = document.querySelector(".time-instructions");
                    if (instructions) instructions.classList.add("ACTIVATED");
                }, timer - 500);
                
                autoDestTimer = setTimeout(() => {
                    setScene("timetravel" + dest);
                }, timer + (
                    (jDest === "nowhere" && lDest === "nowhere")
                        ? 0
                        : 200));

                const decreasePerStep = (1000 / 45) / (10 * (timer / 1000));
                progressTimer = setInterval(() => {
                    progress -= decreasePerStep;
                    document.getElementById("inner-progress").style.width = progress + "%";
                }, 1000 / 45);
                progress = 100;

            }, delay);

            setTimeout(() => {
                if (jDest === "nowhere" && lDest === "nowhere") {
                    document.getElementById("outer-progress").classList.add("PROGRESS_BAR_WAITONLY");
                }
            }, 5);

            window.addEventListener("keydown", onKeyPress);
        },
        onDeactivate: () => {
            document.getElementById("outer-progress").classList.remove("PROGRESS_BAR_ACTIVATED");
            document.getElementById("outer-progress").classList.remove("PROGRESS_BAR_WAITONLY");
            const instructions = document.querySelector(".time-instructions");
            if (instructions)instructions.classList.remove("ACTIVATED");
            document.getElementById("inner-progress").style.width = "100%";

            if (delayTimer) clearTimeout(delayTimer);
            if (autoDestTimer) clearTimeout(autoDestTimer);
            if (activationTimer) clearTimeout(activationTimer);
            if (progressTimer) clearInterval(progressTimer);

            delayTimer = undefined;
            autoDestTimer = undefined;
            activationTimer = undefined;
            progress = undefined;

            window.removeEventListener("keydown", onKeyPress);
        },
        excludeEmptyOptionsCheck: true
    };
}
function TimeTravelDom() {
    return <React.Fragment>
        <style>{`
            .PROGRESS_BAR_ACTIVATED {
                background: green!important
            }
            .PROGRESS_BAR_ACTIVATED #inner-progress {
                background: lime!important
            }
            .PROGRESS_BAR_WAITONLY {
                background: gray!important
            }
            .PROGRESS_BAR_WAITONLY #inner-progress {
                background: white!important
            }
            .time-instructions {
                color: #888;
            }
            .time-instructions.ACTIVATED {
                color: lime;
            }
        `}</style>
        <div style={{ height: "6px", width: "100%", background: "#2f4570" }} id="outer-progress">
            <div style={{ height: "100%", width: "100%", background: "cornflowerblue" }} id="inner-progress" />
        </div>
    </React.Fragment>;
}

addScenes({
    // #region Time Travel
    gsearch_timetravel: {
        prompt: () => <div>
            <p>
                You want to learn how to time travel, I can sense it! Well, I've been time traveling
                for years, but you look too inexperienced. Sorry, kiddo! Hold up, this restaurant's
                dessert has been poisoned! And a baby is crawling to go eat it!
                Well..... <em>sigh</em> A precious life is on the line, and I'll need an assistant
                to save it, so it's your lucky day. I'll teach you how to time travel!
            </p>
        </div>,
        options: [
            { text: "Continue", to: "timetravel2" },
        ],
        contributor: "Dave",
    },
    timetravel2: {
        prompt: () => <div>
            <p>
                First rule: don't do anything until the clock says it's time! The clock doesn't mess
                around, so here goes!
            </p>
        </div>,
        options: [
            { text: "Continue", to: "timetravel3" },
        ],
        contributor: "Dave",
    },
    timetravel3: {
        prompt: () => <div>
            <p>
                If you're watching this video on a computer, pressing J or L will warp you 10 seconds
                backward or forward in time. Oh god, since when did this baby know how to run? Anyway,
                if you're instead watching on your phone, sorry, this effect isn't gonna work. Come
                back when you have access to a computer.
            </p>
        </div>,
        options: [
            { text: "Continue", to: "timetravel4", if: () => {
                const mobile = new (require("mobile-detect"))(window.navigator.userAgent);
                return !mobile.mobile();
            } },
            { text: "I am on a mobile device", if: () => {
                const mobile = new (require("mobile-detect"))(window.navigator.userAgent);
                return !!mobile.mobile();
            }, to: "timetravel_mobile"},
        ],
        contributor: "Dave",
    },
    timetravel_mobile: {
        prompt: () => <div>
            <p>
                Since your on a mobile device, I'll just give you all the endings. You should
                definetly play this path on the computer to see what you're missing out on.
            </p>
        </div>,
        action: () => {

        },
        options: [
            { text: "End", to: "start" },
        ],
        contributor: "Dave",
    },
    timetravel4: {
        prompt: () => <div>
            <p>
                The baby's getting close, so we need to act now! I'm gonna time-freeze the baby, and
                you will warp
                forward the cake's age. 3, 2, 1, go!
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press L</span>
            </p>
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ delay: 4000, timer: 4000, dest: "5", lDest: "6" }),
    },
    timetravel5: {
        prompt: () => <div>
            <p>
                You never listen to me. Well, inexplicable rift in spacetime
                happening in 3, 2 1.
            </p>
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ delay:0, timer: 3000, dest: "6" }),
    },
    timetravel6: {
        prompt: () => <div>
            <p>
                Woah, baby doesn't wanna chow down on the now rotten, smelly cake? We saved its
                life! Oh, the baby wants to drink vodka now. That's no good, the legal age is 21! I
                think you've learned
                enough, I'll leave this one up to you.
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press L</span>
            </p>
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ delay: 5000, dest: "7", lDest: "9" }),
    },
    timetravel7: {
        prompt: () => <div>
            <p>
                <em>Hopefully you never see this.</em>
                <br />
                <em>Cary is dumb.</em>
            </p>
            <TimeTravelDom />
        </div>,
        ...TimeTravelScene({ delay: 0, timer: 2000, dest: "8" }),
        contributor: "Dave",
    },
    timetravel8: {
        prompt: () => <div>
            <p>
                Perfect, he is 22 and is enjoying the booze. Yikes! Now he is hungover, let's warp
                him out of it.
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press L</span>
            </p>
        </div>,
        ...TimeTravelScene({ timer: 3000, lDest: "11", dest: "9" }),
        contributor: "Dave",
    },
    timetravel9: {
        prompt: () => <div>
            <p>
                Crap, now the baby's 50, too old to party. We gotta warp backward.
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press J</span>
            </p>
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ delay: 5000, dest: "10", jDest: "8" }),
    },
    timetravel10: {
        prompt: () => <div>
            <p>
                You're seriously gonna disobey me again?
            </p>
            <TimeTravelDom />
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ delay: 0, timer: 5000, dest: "11" }),
    },
    timetravel11: {
        prompt: () => <div>
            <p>
                He's dead. What a tragedy. T'is the fate of a time traveler to witness every
                youngster die of old age.
            </p>
            <TimeTravelDom />
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ delay: 0, timer: 6000, dest: "12" }),
    },
    timetravel12: {
        prompt: () => <div>
            <p>
                Second rule, never become attached to the children you assist. That being said you've
                made good progress.
            </p>
            <TimeTravelDom />
        </div>,
        ...TimeTravelScene({ delay: 0, timer: 5000, dest: "13" }),
        contributor: "Dave",
    },
    timetravel13: {
        prompt: () => <div>
            <p>
                ...But there's one last skill I want to teach you, <b>Overlapping Timelines</b>.
                <br />
                Buckle Up, Press L
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press L</span>
            </p>
        </div>,
        ...TimeTravelScene({ delay: 2000, timer: 3000, dest: "14", lDest: "15" }),
        contributor: "Dave",
    },
    timetravel14: {
        prompt: () => <div>
            <p>
                Nice one, you're doing well, I'm gonna get some coffee, please ignore everything my
                animatronic clone says, <strong><em>you copycat.</em></strong>
            </p>
            <TimeTravelDom />
        </div>,
        ...TimeTravelScene({ delay: 0, timer: 6500, dest: "15" }),
        contributor: "Dave",
    },
    timetravel15: {
        prompt: () => <div>
            <p>
                Now press it again!
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press It Again</span>
            </p>
        </div>,
        ...TimeTravelScene({ delay:0, timer: 2300, jDest: "14", dest: "16", lDest: "18" }),
        contributor: "Dave",
    },
    timetravel16: {
        prompt: () => <div>
            <p>
                Thanks for ignoring the clone, one final command, press L.
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press L</span>
            </p>
        </div>,
        ...TimeTravelScene({ timer: 2500, lDest: "19", dest: "17" }),
        contributor: "Dave",
    },
    timetravel17: {
        prompt: () => <div>
            <p>
                Give J another press.
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press J</span>
            </p>
        </div>,
        ...TimeTravelScene({ timer: 3000, jDest: "15", dest: "18" }),
        contributor: "Dave",
    },
    timetravel18: {
        prompt: () => <div>
            <p>
                Excelent job so far! Let's turn it around and press J.
            </p>
            <TimeTravelDom />
            <p>
                <span className="time-instructions">Press J</span>
            </p>
        </div>,
        contributor: "Dave",
        ...TimeTravelScene({ timer: 3000, jDest: "17", dest: "19" }),
    },
    timetravel19: {
        prompt: () => <div>
            <p>
                It's gonna be hard to top that flawless run, out of hundreds of my students, nobody
                has preformed overlapped timelines as well as you just did, use your newfound powers
                for good, never use them for evil.
            </p>
            <p>
                TODO: Decide your ending for the Mini Game.
            </p>
        </div>,
        options: [],
        contributor: "Dave",
    }
    // #endregion
});
