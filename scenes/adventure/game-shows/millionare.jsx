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
            { text: "Pay bills", to: "loan_paybills" },
            { text: "Invest in Bitcoin", to: "loan_bitcoin" },
            { text: "Ask Bill Gates", to: "" }
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

    },
    mill_lose: {

    }
});
