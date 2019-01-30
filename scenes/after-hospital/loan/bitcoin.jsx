import React from "react";
import { addFlag } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { RainbowText } from "@templates/FontStyles";

import { LoanHeader, decreaseTurn, formatMoney } from "./loan";

addFlag("loan_bitcoin", 0);
addFlag("loan_walletcash", 50);
addFlag("loan_initial_deposit", 0);
addFlag("loan_payloan", false);


// amount of Bitcoin you get per one cash
const BTC_EXCHANGES = [
    5, // loanTurns===30
    5, // loanTurns===29 (initial deposit)
    5, // loanTurns===28
    4.99999, // loanTurns===27
    4.9951, // loanTurns===26
    4.9523, // loanTurns===25
    4.571364,
    4.216314,
    3.221634,
    5.256134,
    4.21761, // loanTurns===20
    10.25152,
    8.521523,
    3.3315253,
    1.95152,
    1.401532,
    0.31521523,
    0.112531253,
    0.01152532,
    0.001512532,
    0.000521525, // loanTurns===10
    0.000245123,
    0.00055213,
    0.0003643,
    0.055231523,
    0.075213,
    0.0054123,
    0.001852,
    0.0041,
    0.000005,
];

function cashToBTC(cash) {
    return cash * BTC_EXCHANGES[30 - loanTurns];
}
function btcToCash(btc) {
    return btc / BTC_EXCHANGES[30 - loanTurns];
}

const formatBTC = (num) => {
    return (Math.floor(num * 500) / 500) + " BTC";
};

const LoanBTCHeader = () => <div>
    {
        isPlayingMillionaire
            ? (
                <LoanHeader bitcoin />
            )
            : (
                !loan_payloan
                    ? <p className={"loan-header " + (loanTurns < 10 ? "loan-header-low" : "")} style={{ marginBottom: "10px" }}>
                        You need to pay off a loan of <strong>$4313</strong>. You have <strong>{loanTurns}</strong> turns left to pay it off.
                    </p>
                    : <p className={"loan-header " + (loanTurns < 10 ? "loan-header-low" : "")} style={{ marginBottom: "10px" }}>
                        You have <strong>{loanTurns}</strong> turns left to make as much money as possible.
                    </p>
            )
        
    }
    <div className="bitcoin-status">
        <p>You have <strong>{formatMoney(loan_walletcash)}</strong> cash, and <strong>{formatBTC(loan_bitcoin)}</strong></p>
    </div>
    <div className="bitcoin-exchange" style={{ marginTop: "0" }}>
        <h3 style={{ marginTop: "0" }}>BTC Exchange Rate</h3>
        <p>
            <strong>$1</strong> --> <strong>{formatBTC(cashToBTC(1))}</strong><br />
            <strong>1 BTC</strong> --> <strong>{formatMoney(btcToCash(1))}</strong><br />
        </p>
    </div>
</div>;

addScenes({
    loan_bitcoin: {
        prompt: () => <div>
            <LoanHeader />
            <p>
                You go to your local <span style={{ color: "orange" }}>Bitcoin Store</span>, you are going to be able to spend up to $50 of your cash on Bitcoin. How much should you start off doing.
            </p>
        </div>,
        options: [
            { text: "$50", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 50 },
            { text: "$40", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 40 },
            { text: "$30", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 30 },
            { text: "$20", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 20 },
            { text: "$10", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 10 },
            { text: "$5", to: "loan_bitcoin_initial_dep", action: () => loan_initial_deposit = 5 },
        ],
        action: () => {
            if (loanMoney >= 900) {
                loan_walletcash = 999999.99;
            }
            decreaseTurn();
        },
        contributor: "Dave"
    },
    loan_bitcoin_initial_dep: {
        prompt: () => <div>
            <p>
                You trade ${loan_initial_deposit} for {formatBTC(cashToBTC(loan_initial_deposit))} as an initial deposit.
            </p>
        </div>,
        options: [
            { text: "Okay", to: "loan_bitcoin_main"}
        ],
        action: () => {
            // process and set some new variables
            decreaseTurn();

            loan_bitcoin = cashToBTC(loan_initial_deposit);
            loan_walletcash = loan_walletcash - loan_initial_deposit;
        },
        contributor: "Dave"
    },
    loan_bitcoin_main: {
        prompt: () => <div>
            <LoanBTCHeader />
            
            <p>
                What do you do now?
            </p>
        </div>,
        options: () => [
            { text: "Trade $$ --> BTC", to: "loan_bitcoin_deposit"},
            { text: "Trade BTC --> $$", to: "loan_bitcoin_withdraw"},
            { text: "Wait", to: "loan_bitcoin_main"},
            ...(
                isPlayingMillionaire
                    ? []
                    : [
                        { is: "seperator" },
                        {
                            text: "Pay Loan (-$4313)",
                            disabledText: () => {
                                if (loan_payloan) {
                                    return "Pay Loan (Purchased)";
                                } else {
                                    return "Pay Loan (-$4313)";
                                }
                            },
                            action: () => loan_payloan = true,
                            to: "loan_bitcoin_main",
                            if: () => (loan_walletcash > 4313 && !loan_payloan)
                        }
                    ]
            )
        ],
        action: decreaseTurn,
        contributor: "Dave"
    },
    loan_bitcoin_deposit: {
        prompt: ()=> <div>
            <LoanBTCHeader />
            <p>
                You want to exchange cash for Bitcoin. How much?
            </p>
        </div>,
        options: [
            { text: "Cancel", to: "loan_bitcoin_main"},
            "seperator",
            { text: "", disabledText: () => (loan_walletcash < 1) ? "(You need at least $1 to buy bitcoin)" : null, if: () => false, to: "loan_bitcoin_main" },  
            ...[1, 2, 3, 4, 5, 10, 25, 50, 80, 100, 200, 300, 400, 500, 1000, 5000, 10000, 50000, 100000].map(cash => {
                return {
                    text: () => `${formatMoney(cash)} for ${formatBTC(cashToBTC(cash))}`,
                    action: () => {
                        loan_walletcash -= cash;
                        loan_bitcoin += cashToBTC(cash);
                    },
                    if: () => loan_walletcash >= cash,
                    to: "loan_bitcoin_main"
                };
            }),
        ],
        contributor: "Dave",
    },
    loan_bitcoin_withdraw: {
        prompt: ()=> <div>
            <LoanBTCHeader />
            <p>
                You want to exchange Bitcoins for cash. How much?
            </p>
        </div>,
        options: [
            { text: "Cancel", to: "loan_bitcoin_main"},
            "seperator",
            { text: "", disabledText: () => (loan_bitcoin < 0.5) ? "(You need at least 0.5 BTC to sell bitcoin)" : null, if: () => false, to: "loan_bitcoin_main" },  
            ...[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 250, 300, 350, 400, 450, 500, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(price => {
                return {
                    text: () => `${formatBTC(price)} for ${formatMoney(btcToCash(price))}`,
                    action: () => {
                        loan_walletcash += btcToCash(price);
                        loan_bitcoin -= price;
                    },
                    if: () => loan_bitcoin >= price,
                    to: "loan_bitcoin_main"
                };
            }),
        ],
        contributor: "Dave",
    },
    loan_bitcoin_lose: {
        prompt: () => <div>
            <p>You were not able to make enough money from Bitcoin to pay off the loan, and fell even farther into debt. First time huh?</p>

        </div>,
        ending: {
            id: "btc-lose",
            name: "Failed Investment",
            description: "Fail to get rich off of Bitcoin, and fail to pay your loan."
        },
        contributor: "Dave",
    },
    loan_bitcoin_win: {
        prompt: () => <div>
            <p>You got <span style={{fontWeight:"bold"}}><RainbowText string={formatMoney(loan_walletcash)} /></span> by investing in Bitcoin, and were able to pay off your loan. What a crazy thing.</p>
        </div>,
        ending: {
            id: "btc-win-billion",
            name: "Bitcoin Millionaire",
            description: "Pay off your loan by getting crazy rich off of Bitcoin."
        },
        contributor: "Dave",
    },
    loan_bitcoin_win_sortof: {
        prompt: () => <div>
            <p>You got <span style={{ fontWeight: "bold", color: "green" }}>{formatMoney(loan_walletcash)}</span> by investing in Bitcoin, and were able to pay off your loan.</p>
        </div>,
        ending: {
            id: "btc-win",
            name: "Bitcoin Success",
            description: "Pay off your loan by getting money from Bitcoin."
        },
        contributor: "Dave",
    },
});
