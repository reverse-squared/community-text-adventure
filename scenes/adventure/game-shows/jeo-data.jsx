// list of catagories, questions 200-1000, options is array with first being What is correct
// (which get randomly shuffled)
import React from "react";
export default [
    {
        catagoryName: "JavaScript",
        questions: {
            200: {
                question: () => <div>
                    <p>How many npm packages exist</p>
                </div>,
                options: [
                    { text: "What is more than one" },
                    { text: "What is zero" },
                    { text: "What is who cares" },
                    { text: "What is 1000000" },
                ],
                contributor: "Dave",
            },
            400: {
                question: () => <div>
                    <p>
                        What will the code below output to the console and why?
                    </p>

                </div>,
                options: [
                    { text: () => <span>What is outer func:  this.foo = bar<br />outer func:  self.foo = bar<br />inner func:  this.foo = undefined<br />inner func:  self.foo = bar</span> },
                    { text: () => <span>What is outer func:  this.bar = foo<br />outer func:  this.foo = bar<br />inner func:  self.foo = undefined<br />inner func:  self.foo = bar</span> },
                    { text: () => <span>What is outer func:  this.bar = foo<br />outer func:  this.foo = bar<br />outer func:  self.foo = undefined<br />outer func:  self.bar = bar</span> },
                    { text: () => <span>What is outer func:  self.bar = foo<br />outer func:  self.foo = bar<br />outer func:  self.foo = undefined<br />outer func:  self.bar = bar</span> },
                ],
                contributor: "Hunter",
            },
            1000: {
                question: () => <div>
                    <p>Whats typeof null</p>
                </div>,
                options: [
                    { text: "What is object" },
                    { text: "What is number" },
                    { text: "What is function" },
                    { text: "What is string" },
                    { text: "What is bigint" },
                    { text: "What is symbol" },
                    { text: "What is undefined" },
                    { text: "What is boolean" },
                    { text: "What is null" },
                ],
                contributor: "Dave",
            },
            600: {
                question: () => <div>
                    <p>is react good</p>
                </div>,
                options: [
                    { text: "What is yes" },
                    { text: "What is no" },
                ],
                contributor: "Dave"
            },
            800: {
                question: () => <div>
                    <p>Async functions are part of ____</p>
                </div>,
                options: [
                    { text: "What is ES2017" },
                    { text: "What is ES6" },
                    { text: "What is ES7" },
                    { text: "What is ES5" },
                    { text: "What is TypeScript" },
                    { text: "What is Java" },
                ],
                contributor: "Dave"
            }
        }
    },
    {
        catagoryName: "Video Games",
        questions: {
            200: {
                question: () => <div>
                    <p>Catagory 200</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            400: {
                question: () => <div>
                    <p>Catagory 400</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            600: {
                question: () => <div>
                    <p>Catagory 600</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            800: {
                question: () => <div>
                    <p>Catagory 800</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            1000: {
                question: () => <div>
                    <p>Catagory 1000</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            }
        }
    },
    {
        catagoryName: "Pancakes",
        questions: {
            200: {
                question: () => <div>
                    <p>Catagory 200</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            400: {
                question: () => <div>
                    <p>Catagory 400</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            600: {
                question: () => <div>
                    <p>Catagory 600</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            800: {
                question: () => <div>
                    <p>Catagory 800</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            1000: {
                question: () => <div>
                    <p>Catagory 1000</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            }
        }
    },
    {
        catagoryName: "Catagory4",
        questions: {
            200: {
                question: () => <div>
                    <p>Catagory 200</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            400: {
                question: () => <div>
                    <p>Catagory 400</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            600: {
                question: () => <div>
                    <p>Catagory 600</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            800: {
                question: () => <div>
                    <p>Catagory 800</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            1000: {
                question: () => <div>
                    <p>Catagory 1000</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            }
        }
    },
    {
        catagoryName: "Catagory5",
        questions: {
            200: {
                question: () => <div>
                    <p>Catagory 200</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            400: {
                question: () => <div>
                    <p>Catagory 400</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            600: {
                question: () => <div>
                    <p>Catagory 600</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            800: {
                question: () => <div>
                    <p>Catagory 800</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            1000: {
                question: () => <div>
                    <p>Catagory 1000</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            }
        }
    },
    {
        catagoryName: "CTA Endings",
        questions: {
            200: {
                question: () => <div>
                    <p>How do you get the Dog Ending?</p>
                </div>,
                options: [
                    { text: "What is the walking your dog after work" },
                    { text: "What is feeding the dog pancakes" },
                    { text: "What is selling the dog to pay for a loan" },
                ],
                contributor: undefined,
            },
            400: {
                question: () => <div>
                    <p>Catagory 400</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            600: {
                question: () => <div>
                    <p>Catagory 600</p>
                </div>,
                options: [
                    { text: "What is correct" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                    { text: "What is incorrect" },
                ],
                contributor: undefined,
            },
            800: {
                question: () => <div>
                    <p>How do you get the Chuck E Cheese ending</p>
                </div>,
                options: [
                    { text: "What is missing one direction on the way to the hospital" },
                    { text: "What is telling abra to teleport" },
                    { text: "What is getting an Uber ride" },
                    { text: "What is escaping jail" },
                 
                ],
                contributor: undefined,
            },
            1000: {
                question: () => <div>
                    <p>How do you get the turn it up to eleven ending</p>
                </div>,
                options: [
                    { text: "What is adding eleven chocolates" },
                    { text: "What is leveling to a Level 11 Crook" },
                    { text: "What is buying eleven bottles of water" },
                    { text: "What is reading the Bee Movie script 11 times" },
                ],
                contributor: undefined,
            }
        }
    },
];