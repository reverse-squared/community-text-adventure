import React from "react";
import { setScene } from "web-text-adventure";
import { addScenes } from "@src/ending";

let progressTimer = null;
let progress = null;
let inputElem = null;

function QuickTimeDom() {
    return <div style={{ height: "6px", width: "100%", background: "#2f4570" }}>
        <div style={{ height: "100%", width: "100%", background: "cornflowerblue" }} id="inner-progress" />
    </div>;
}

function QuickTimeHandlers(extra = {}) {
    const decreasePerStep = (1000 / 45) / (10 * (extra.time / 1000));
    return {
        onDeactivate: () => {
            if (progressTimer) clearInterval(progressTimer);
            progressTimer = null;
            if (extra.onDeactivate) extra.onDeactivate();
        },
        action: () => {
            progressTimer = setInterval(() => {
                progress -= decreasePerStep;
                if (progress <= 0) {
                    setScene("run_from_hospital_fail");
                } else {
                    document.getElementById("inner-progress").style.width = progress + "%";
                }
            }, 1000/45);
            progress = 100;
            if (extra.action) extra.action();
        },
    };
}

addScenes({
    // Peanut butter pancakes. Level 4.
    make_pb_pancakes: {
        prompt: () => <div>
            <p>Turns out you are allergic to peanut butter. Now you have to play a hospital and ambulance bill of <strong>$4313</strong>. Do you pay it?</p>
        </div>,
        options: [
            { text: "Yes (-$4313)", to: "yes_pay_bill" },
            { text: "No", to: "no_pay_bill" }
        ],
        contributor: "Hunter"
    },

    // Pay the hospital bill.
    yes_pay_bill: {
        prompt: () => <div>
            <p>You wanna pay your bill, so you have two options, pay with cash and risk getting arrested with counterfeit cash, or pay with one of your 23 credit cards which probably are all maxed out.</p>
        </div>,
        options: [
            { text: "Pay with Cash", to: "pay_bill_cash" },
            { text: "Pay with Credit", to: "pay_bill_credit" },
            { text: "Take out a loan", to: "loan_start" },
        ],
        contributor: "Hunter"
    },

    pay_bill_cash: {
        prompt: () => <div>
            <p>You paid with your cash. Even though it was counterfeit, nobody noticed. <s>That won't come back up later.</s> You continue with your day and go outside. What do you do?</p>
        </div>,
        options: [
            { text: "Fake your death", to: "fake_your_death" },
            { text: "Go skydiving", to: "skydive_pre" },
            { text: "Read a book", to: "read_a_book" }
        ],
        contributor: "Hunter"
    },

    pay_bill_credit: {
        prompt: () => <div>
            <p>You paid with your credit card. Even though it was a fake card, nobody noticed. <s>That won't come back up later.</s> You continue with your day and go outside. What do you do?</p>
        </div>,
        options: [
            { text: "Fake your death", to: "fake_your_death" },
            { text: "Go skydiving", to: "skydive_pre" },
            { text: "Read a book", to: "read_a_book" }
        ],
        contributor: "Dave and Hunter"
    },

    read_a_book: {
        prompt: () => <div>
            <p>You decided to read a book to become smart. Turns out that book held all of the world's knowledge. Now you know everything.</p>
        </div>,
        ending: {
            id: "smart-kid",
            name: "The Smart Kid",
            description: "You became famous for knowing everything in the world."
        },
        contributor: "Hunter"
    },

    // Don't pay hospital bill. Level 5.
    no_pay_bill: {
        prompt: () => <div>
            <p>You decide not to pay the bill and...</p>
        </div>,
        options: [
            { text: "Run for it", to: "run_from_hospital" },
            { text: "Take out a loan", to: "loan_start" },
            { text: "Jump out a window", to: "jump_out_a_window" },
        ],
        contributor: "Filip96"
    },

    jump_out_a_window: {
        prompt: () => <div>
            You jump out of the window, taking your leap of faith... and die, what kind of idea was that supposed to be.
        </div>,
        ending: {
            id: "jump-out-window",
            name: "Leap of Faith",
            description: "Why would anyone want to jump out of a window?",
        },
        contributor: "Dave",
    },

    run_from_hospital: {
        prompt: <div>
            <p>
                You start running...
            </p>
        </div>,
        options: [
            { text: "Run More", to: "run_from_hospital2" }
        ],
        contributor: "Dave",
    },
    run_from_hospital2: {
        prompt: <div>
            <p>
                You continue running...
            </p>
        </div>,
        options: [
            { text: "Run More", to: "run_from_hospital3" }
        ],
        contributor: "Dave",
    },
    run_from_hospital3: {
        prompt: <div>
            <p>
                You continue running, they notice you are running away...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: "run_from_hospital4" }
        ],
        ...QuickTimeHandlers({
            time: 2000,
        }),
        contributor: "Dave",
    },
    run_from_hospital4: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital5" }
        ],
        ...QuickTimeHandlers({
            time: 2000,
        }),
        contributor: "Dave",
    },
    run_from_hospital5: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital6" }
        ],
        ...QuickTimeHandlers({
            time: 2000,
        }),
        contributor: "Dave",
    },
    run_from_hospital6: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital7" }
        ],
        ...QuickTimeHandlers({
            time: 2000,
        }),
        contributor: "Dave",
    },
    run_from_hospital7: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital8" },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
        ],
        ...QuickTimeHandlers({
            time: 2000,
        }),
        contributor: "Dave",
    },
    run_from_hospital8: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: "run_from_hospital9" },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
        ],
        ...QuickTimeHandlers({
            time: 2000,
        }),
        contributor: "Dave",
    },
    run_from_hospital9: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital10" },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital10" },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital10" },
            { text: "Run More", to: null, if: () => false, disabledText: true },
        ],
        ...QuickTimeHandlers({
            time: 1500,
        }),
        contributor: "Dave",
    },
    run_from_hospital10: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital11" },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: null, if: () => false, disabledText: true },
        ],
        ...QuickTimeHandlers({
            time: 1500,
        }),
        contributor: "Dave",
    },
    run_from_hospital11: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Dont Click This One!", to: null },
            { text: "Dont Click This One!", to: null },
            { text: "Dont Click This One!", to: null },
            { text: "Click Here!", to: "run_from_hospital12" },
            { text: "Dont Click This One!", to: null },
            { text: "Dont Click This One!", to: null },
        ],
        ...QuickTimeHandlers({
            time: 1500,
        }),
        contributor: "Dave",
    },
    run_from_hospital12: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: null, if: () => false, disabledText: true },
            { text: "Run More", to: "run_from_hospital13" },
        ],
        ...QuickTimeHandlers({
            time: 1500,
        }),
        contributor: "Dave",
    },
    run_from_hospital13: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: "run_from_hospital14" },
        ],
        ...QuickTimeHandlers({
            time: 1500,
        }),
        contributor: "Dave",
    },
    run_from_hospital14: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            ...Array(100).fill(0).map(() => ({ text: "Run More", to: null, if: () => false, disabledText: true })),
            { text: "Run More", to: "run_from_hospital15" },
        ],
        ...QuickTimeHandlers({
            time: 5000,
        }),
        contributor: "Dave",
    },
    run_from_hospital15: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run More", to: "run_from_hospital16" },
        ],
        ...QuickTimeHandlers({
            time: 1500,
        }),
        contributor: "Dave",
    },
    run_from_hospital16: {
        prompt: <div>
            <p>
                You continue running...
            </p>
            <h1>Press V to continue</h1>
            <QuickTimeDom />
        </div>,
        options: [
            {text: "refresh", to: "run_from_hospital16"}
        ],
        ...QuickTimeHandlers({
            time: 1800,
            action: () => {
                inputElem = document.createElement("input");
                document.body.appendChild(inputElem);
                inputElem.focus();
                inputElem.onkeydown = (item) => {
                    if (item.keyCode == 86) {
                        setScene("run_from_hospital17");
                    }
                    item.preventDefault();
                };
                inputElem.style = "background:transparent;border:none;outline:none;position:absolute;top:290px;";
            },
            onDeactivate: () => {
                if (inputElem) {
                    inputElem.remove();
                    inputElem = null;
                }
            }
        }),
        excludeEmptyOptionsCheck: true,
        contributor: "Hunter",
    },
    run_from_hospital17: {
        prompt: <div>
            <p>
                You are close to the exit...
            </p>
            <QuickTimeDom />
        </div>,
        options: [
            { text: "Run Back to the Start", to: "run_from_hospital3" },
            { text: "Run Out the Exit", to: "run_from_hospital_finish" },
            { text: "Run To Jail", to: "run_from_hospital_jail" },
            { text: "Stop Running", to: "run_from_hospital_fail" },
        ],
        ...QuickTimeHandlers({
            time: 1100,
        }),
        contributor: "Dave",
    },

    run_from_hospital_fail: {
        prompt: () => <div>
            <p>
                prompt for failing
            </p>
        </div>,
        ending: {
            id: "escape-failure",
            name: "Caught Running Away",
            description: "Get caught by the police while running away from your hospital bill of $4313."
        }
    },
    run_from_hospital_jail: {
        prompt: () => <div>
            <p>
                prompt for running into jail
            </p>
        </div>,
        ending: {
            id: "escape-to-jail",
            name: "Escape to a Jail",
            description: "Your plan of running away was thought up too quickly that you accidentally escaped to jail..."
        }
    },
    run_from_hospital_finish: {
        prompt: () => <div>
            <p>
                prompt for finishing
            </p>
        </div>,
        ending: {
            id: "escape-success",
            name: "The Escape Plan",
            description: "You successfully ran away from the police, and avoided the bill of $4313."
        }
    }
});
