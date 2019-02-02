import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { formatMoney } from "@scenes/after-hospital/loan/loan";

addFlag("bid", 0);

addScenes({
    price_pre: {
        prompt: () => <div>
            <p>Your application to play Jeopardy on LIVE national TV has been approved!</p>
        </div>,
        options: [
            { text: "Go there", to: "price_start" }
        ],
        contributor: "Hunter"
    },
    price_start: {
        prompt: () => <div>
            <p>The first item to be displayed is a <b>New iPhone XR</b>. Closest one to the actual retail price without going over
                wins this product and goes on stage. What's your guess?
            </p>
            <div style={{ textAlign: "center" }}>
                <span>
                    {formatMoney(bid)}
                </span>                
            </div>
        </div>,
        options: [
            { text: "Increase Bid", to: "price_start", action: () => bid++ },
            { text: "Decrease Bid", to: "price_start", disabledText: "Decrease Bid", if: () => bid != 0, action: () => {
                if(bid !== 0) {
                    bid--;   
                }
            } },
            { text: "Bid", to: "price_lmao", if: () => bid > 0, action: () => checkBid(bid, 899, "price_stage", "price_start2") }
        ],
        contributor: "Hunter"
    },
    price_lmao: {
        prompt: () => <div>
            <p>Your bid was wrong. The correct price was {formatMoney(bid - 0.01)}.</p>
        </div>,
        ending: {
            id: "price",
            name: "One Cent Off",
            description: "Your bid was SO close, just once cent less and you'd be right!"
        },
        contributor: "Dave"
    }
});
