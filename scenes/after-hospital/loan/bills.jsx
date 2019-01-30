import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { LoanHeader, decreaseTurn, formatMoney } from "./loan";
import { RainbowCircleText } from "@templates/FontStyles";

addFlag("loanBills1", [false,false,false]);
addFlag("loanBills2", [false,false]);
addFlag("loanGroceries", [false,false,false,false,false,false,false]);
addFlag("loanBills3", [false,false,false,false,false]);
addFlag("loanIPhone", false);
addFlag("loanWindows", false);
addFlag("loanWindowsSoldOut", false);
addFlag("loan_visitedStore", false);

addScenes({
    loan_paybills: {
        prompt: () => <div>
            <LoanHeader />
            <div>
                You decide to pay your bills{(!isPlayingMillionaire && loanBills1[0] && loanBills1[1] && loanBills1[2]) ? ", and go even further into debt." : "..."}
            </div>
        </div>,
        options: [
            {
                text: "Pay Electric Bill (-$100)",
                disabledText: "(Purchased)",
                to: "loan_paybills",
                if: () => !loanBills1[0],
                action: () => {
                    loanBills1[0] = true;
                    loanMoney -= 100;
                }
            },
            {
                text: "Pay Gas Bill (-$60)",
                disabledText: "(Purchased)",
                to: "loan_paybills",
                if: () => !loanBills1[1],
                action: () => {
                    loanBills1[1] = true;
                    loanMoney -= 100;
                }
            },
            {
                text: "Pay Water Bill (-$28)",
                disabledText: "(Purchased)",
                to: "loan_paybills",
                if: () => !loanBills1[2],
                action: () => {
                    loanBills1[2] = true;
                    loanMoney -= 28;
                }
            },
            {
                text: "Pay Rent (-$2000)",
                to: "loan_paybills2",
                if: () => loanBills1[0] && loanBills1[1] && loanBills1[2],
                action: () => {
                    loanMoney -= 2000;
                }
            },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills2: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                It really seems like you could use a new car
            </p>
        </div>,
        options: [
            { text: "Buy Car (-$17,000)", to: "loan_paybills3", action: () => loanMoney-=17000 }
        ],
        action: decreaseTurn,
        contributor: "Dave"
    },
    loan_paybills3: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                ...and maybe a new house would be nice...
            </p>
        </div>,
        options: [
            { text: "Buy a new house (-$319,679)", disabledText: true, to: "loan_paybills3", if: () => loanMoney > -30000, action: () => loanMoney -= 319679 },
            { text: "Pay Shipping (-$0.99)", to: "loan_paybills4", if: () => loanMoney < -30000, action: () => loanMoney -= .99 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills4: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                ...and maybe a new house would be nice...
            </p>
        </div>,
        options: [
            { text: "Buy a new house (-$319,679)", disabledText: true, to: "BLANKSCENE", if: () => false },
            { text: "Pay Shipping (-$0.99)", disabledText: true, to: "BLANKSCENE", if: () => false },
            { text: "Pay Handling (-$0.98)", to: "loan_paybills5", action: () => loanMoney -= .98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills5: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                Hey, it looks like its also on sale! Buy one, get another half off!
            </p>
        </div>,
        options: [
            { text: "Buy another house (-$159,839)", to: "loan_paybills6", action: () => loanMoney -= 156839 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills6: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                Hey, it looks like its also on sale! Buy one, get another half off!
            </p>
        </div>,
        options: [
            { text: "Buy another house (-$159,839)", to: "BLANKSCENE", disabledText: true, if: () => false },
            { text: "Pay More Shipping (-$0.50)", to: "loan_paybills7", action: () => loanMoney-=0.50},
            // { text: "Pay Handling (-$0.45)", to: "loan_paybills5", action: () => loanMoney -= 98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills7: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                Hey, it looks like its also on sale! Buy one, get another half off!
            </p>
        </div>,
        options: [
            { text: "Buy another house (-$159,839)", to: "BLANKSCENE", disabledText: true, if: () => false },
            { text: "Pay More Shipping (-$0.50)", to: "BLANKSCENE", disabledText: true, if: () => false },
            { text: "Pay More Handling (-$0.45)", to: "loan_paybills_house", action: () => loanMoney -= 98 },
        ],
        action: decreaseTurn,
        contributor: "Hunter"
    },
    loan_paybills_house: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You are now at your amazing new house, and realize how ugly it is.
            </p>
        </div>,
        options: [
            { text: "Repaint the walls (-$500)", disabledText: "Repaint the walls (Purchased)", to: "loan_paybills_house", if: () => !loanBills2[0], action: () => { loanBills2[0] = true; loanMoney -= 500; } },
            { text: "Fix the wood floors (-$1700)", disabledText: "Fix the wood floors (Purchased)", to: "loan_paybills_house", if: () => !loanBills2[1], action: () => { loanBills2[1] = true; loanMoney -= 1700; } },
            { text: "Replace the windows (-$1500)", disabledText: "Replace the windows (Purchased)", to: "loan_paybills_windows", if: () => !loanWindows,action: () => loanMoney -= 1500 },
            { text: "Go buy groceries", disabledText: "Go buy groceries (Purchased)", to: "loan_paybills_groceries", if: ()=> !loan_visitedStore,action: () => loanMoney -= 500 },
            { text: "Buy an iPhone (-$4000)", disabledText: "Buy an iPhone (Purchased)", if: () => !loanIPhone, to: "loan_paybills_iphone", action: () => loanMoney -= 4000 },
        ],
        action: decreaseTurn,
        contributor: "many people"
    },
    loan_paybills_iphone: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                It looks like the <RainbowCircleText string="iPhone XSR Max Plus Deluxe Pro" /> just came out, so you bought the first in stock.
            </p>
        </div>,
        options: [
            { text: "Buy the headphone jack adapter (-$10)", to: "loan_paybills_iphone", if: () => !loanBills3[0], action: () => { loanMoney -= 10; loanBills3[0] = true; } },
            { text: "Buy the charger (-$55)", to: "loan_paybills_iphone", if: () => !loanBills3[1], action: () => { loanMoney -= 55; loanBills3[1] = true; } },
            { text: "Buy the charger brick (-$60)", to: "loan_paybills_iphone", if: () => !loanBills3[2] && loanBills3[1], action: () => { loanMoney -= 60; loanBills3[2] = true; } },
            { text: "Buy the new AirPods (-$235)", to: "loan_paybills_iphone", if: () => !loanBills3[3] && loanBills3[0], action: () => { loanMoney -= 235; loanBills3[3] = true; } },
            { text: "Sell the useless headphone jack adapter (+$2)", to: "loan_paybills_iphone", if: () => !loanBills3[4] && loanBills3[0] && loanBills3[3], action: () => { loanMoney += 2; loanBills3[4] = true; } },
            "seperator",
            { text: () => "Leave Apple Store", disabledText: true, to: "loan_paybills_house", if: () => loanBills3.reduce((x, y) => x && y, true) },
        ],
        action: () => {
            loanIPhone = true;
            decreaseTurn();
        },
        contributor: "Dave"
    },
    loan_paybills_groceries: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                {
                    loanGroceries.reduce((x, y) => x && y, true) 
                        ? <span>
                            You have <a href="https://youtu.be/D0NzFatmLCo">taken the entire stock</a> of the store.
                        </span>
                        : <span>
                            You enter the grocery store, and you decide to buy everything inside the shop, as your
                            new house is currently empty.
                        </span>
                }
            </p>
        </div>,
        options: [
            { text: "Buy all the Eggs (-$5543)", disabledText: "Buy all the Eggs (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 5543; loanGroceries[0] = true; } , if: () => !loanGroceries[0] },
            { text: "Buy all the Salad (-$4234)", disabledText: "Buy all the Salad (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 4234; loanGroceries[1] = true; }, if: () => !loanGroceries[1] },
            { text: "Buy all the Cookies (-$2445)", disabledText: "Buy all the Cookies (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 2445; loanGroceries[2] = true; }, if: () => !loanGroceries[2] },
            { text: "Buy all the Candy (-$23585)", disabledText: "Buy all the Candy (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 23585; loanGroceries[3] = true; }, if: () => !loanGroceries[3] },
            { text: "Buy all the Poptarts (-$854)", disabledText: "Buy all the Poptarts (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 854; loanGroceries[4] = true; }, if: () => !loanGroceries[4] },
            { text: "Buy all the Milk (-$482)", disabledText: "Buy all the Milk (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 482; loanGroceries[5] = true; }, if: () => !loanGroceries[5] },
            { text: "Buy all the Dog Toys (-$1)", disabledText: "Buy all the Dog Toys (Purchased)", to: "loan_paybills_groceries", action: () => { loanMoney -= 1; loanGroceries[6] = true; }, if: () => !loanGroceries[6] },
            "seperator",
            { text: "Leave", disabledText: true, to: "loan_paybills_house", if: () => loanGroceries.reduce((x,y) => x&&y, true) },
            
        ],
        action: () => {
            loan_visitedStore = true;
            decreaseTurn();
        },
        contributor: "Hunter",
    },
    loan_paybills_windows: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                After replacing the windows on your house, you notice your neighbour has more windows than you. <strong>Do you buy more windows?</strong>
            </p>
        </div>,
        options: () => [
            { text: "Oh, hell yeah (-$1500)", to: "loan_paybills_windows_buymore", action: () => loanMoney -= 1500 },
            { text: "No", to: "loan_paybills_house" },
            { text: "Smash neighbour's windows", to: isPlayingMillionaire ? "loan_paybills_smashwindow_millionaire" : "loan_paybills_smashwindow" },
        ],
        action: () => {
            loanWindows = true;
            decreaseTurn();
        },
        contributor: "Toshiyuki",
    },
    loan_paybills_windows_buymore: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows...
            </p>
        </div>,
        options: [
            { text: "More Windows (-$1500)", to: "loan_paybills_windows_buymore2", action: () => loanMoney -= 1500 },
            { text: "Return Home", to: "loan_paybills_house" }
        ],
        contributor: "Toshiyuki",
    },
    loan_paybills_windows_buymore2: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows... there is a shortage of windows so the price of windows has been marked up.
            </p>
        </div>,
        options: [
            { text: "More Windows (-$3500)", to: "loan_paybills_windows_buymore3", action: () => loanMoney -= 3500 },
            { text: "Return Home", to: "loan_paybills_house" }
        ],
        action: decreaseTurn,
        contributor: "Toshiyuki",
    },
    loan_paybills_windows_buymore3: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You buy another set of windows... the Window Store has run out of windows.
            </p>
        </div>,
        options: [
            { text: "Return Home", to: "loan_paybills_house" }
        ],
        action: () => {
            loanWindowsSoldOut = true;
            decreaseTurn();
        },
        contributor: "Toshiyuki",
    },
    loan_debt_house_ending: {
        prompt: () => <div>
            <p>
                Time's Up!
            </p>
            <p>
                Instead of trying to pay off the loan, you got so focused on having the best house
                that you went <strong style={{color:"red"}}>{formatMoney(-loanMoney)}</strong> into debt. You have been sent to jail for
                spending so much money, but at least you had fun in the moment.
            </p>
        </div>,
        ending: {
            id: "loan-500k debt",
            name: "500k in Debt",
            description: "Spend half a million dollars instead of paying your loan."
        },
        contributor: "Dave"
    },
    loan_paybills_smashwindow_millionaire: {
        prompt: () => <div>
            <p>
                As part of the <span style={{ color: "lime" }}>Who Wants to be a Millionare</span> rules, you cannot destroy property. You
                smashed this person's windows, so you got disqualified.
            </p>
        </div>,
        ending: {
            id: "disqualified",
            name: "Disqualified",
            description: "Get Disqualified from How to be a Millionaire."
        },
        contributor: "Dave",
    },
    loan_paybills_smashwindow: {
        prompt: () => <div>
            <p>
                Despite being <strong style={{ color: "red" }}>{formatMoney(-loanMoney)}</strong> into debt, you smashed your neighbour's windows,
                and now they are suing you for the cost of repairs. Turns out they spent over ten million dollars on their windows, so you are definitely
                unable to pay off your loan...
            </p>
        </div>,
        options: [
            { text: "Pay for windows (-$10000000)", to: "loan_paybills_smashwindow_end" }
        ],
        contributor: "Dave"
    },
    loan_paybills_smashwindow_end: {
        prompt: () => <div>
            <p>
                Despite being <strong style={{ color: "red" }}>{formatMoney(-loanMoney)}</strong> into debt, you smashed your neighbour's windows,
                and now they are suing you for the cost of repairs. Turns out they spent over ten million dollars on their windows, so you are definitely
                unable to pay off your loan. You are now going to jail, forever, but at least you had fun in the moment.
            </p>
        </div>,
        ending: {
            id: "smash-window",
            name: "Smash Windows",
            description: "Smash your neighbour's $10,000,000 set of windows.",
        },
        contributor: "Dave"
    },
});
