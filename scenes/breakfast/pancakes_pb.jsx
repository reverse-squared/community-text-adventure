import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending";

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
            { text: "Take out a loan.", to: "loan_start" },
        ],
        contributor: "Hunter"
    },

    pay_bill_cash: {
        prompt: () => <div>
            <p>You paid with your cash. Even though it was counterfeit, nobody noticed. <s>That won't come back up later.</s> You continue with your day and go outside. What do you do?</p>
        </div>,
        options: [
            { text: "Fake your death", to: "fake_your_death" },
            { text: "Go skydiving.", to: "skydive_pre" }
        ],
        contributor: "Hunter"
    },

    pay_bill_credit: {
        prompt: () => <div>
            <p>You paid with your credit card. Even though it was a fake card, nobody noticed. <s>That won't come back up later.</s> You continue with your day and go outside. What do you do?</p>
        </div>,
        options: [
            { text: "Fake your death", to: "fake_your_death" },
            { text: "Go skydiving.", to: "skydive_pre" }
        ],
        contributor: "Dave and Hunter"
    },

    // Don't pay hospital bill. Level 5.
    no_pay_bill: {
        prompt: () => <div>
            <p>You decide not to pay the bill and...</p>
        </div>,
        options: [
            { text: "Run for it.", to: "run_from_hospital" },
            { text: "Take out a loan.", to: "loan_start" },
            { text: "Jump out a window.", to: "jump_out_a_window" },
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
});
