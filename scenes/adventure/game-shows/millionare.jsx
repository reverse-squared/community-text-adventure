import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { decreaseTurn, LoanHeader } from "@scenes/after-hospital/loan/loan";

addFlag("isPlayingMillionaire", false);

addScenes({
    mill_start: {
        prompt: () => <div>
            <p>Do you want to be a millionaire?</p>
        </div>,
        options: [
            { text: "Yes", to: "mill_yes" },
            { text: "No", to: "mill_no" }
        ],
        contributor: "Dave"
    },
    mill_yes: {
        prompt: () => <div>
            <LoanHeader />
            <p>How shall you get a million dollars?</p>
        </div>,
        options: [
            { text: "Pay your bills", to: "loan_paybills" },
            { text: "Invest in some Bitcoin", to: "loan_bitcoin" },
            { text: "Ask Bill Gates", to: "" },
            { text: "Rob a Bank", to: "bank_rob" }
        ],
        action: () => {
            isPlayingMillionaire = true;
            decreaseTurn();
        },
        contributor: "Dave"
    },
    mill_no: {
        prompt: () => <div>
            <p>Oh... okay.</p>
        </div>,
        ending: {
            id: "no-million",
            name: "Not a Millionaire",
            description: "Who doesn't want a million dollars?"
        },
        contributor: "Dave"
    },
    mill_win: {
        prompt: () => <div>
            You successfully got one million dollars and won <span style={{ color: "lime" }}>Who Wants to be a Millionare</span>
            . Awesome!
        </div>,
        ending: {
            id: "mill-win",
            name: "How to be a Millionaire",
            description: "You won Who Wants to be a Millionare!",
        },
        contributor: "Dave",
    },
    mill_lose: {
        prompt: () => <div>
            Time's up! Looks like you dont quite have enough money, so you do not win <span style={{ color: "lime" }}>Who Wants to be a Millionare</span>. Better luck next time.
        </div>,
        ending: {
            id: "mill-win",
            name: "How to NOT be a Millionaire",
            description: "You couldn't do it!",
        },
        contributor: "Dave",
    }
});
