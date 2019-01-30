require("module-alias/register");
require("@babel/register");

const Jeopardy = require("../scenes/adventure/game-shows/jeo-data").default;

describe("Jeopardy Data", () => {
    Jeopardy.forEach(catagory => {
        describe(catagory.catagoryName, () => {
            [200,400,600,800,1000].forEach((price) => {
                describe("$" + price, () => {
                    const question = catagory.questions[price];
                    
                    it("renders prompt", () => {
                        try {
                            question.question();
                        } catch (error) {
                            throw new Error("Question Renders Properly");
                        }
                    });

                    it("has contributor", () => {
                        if (!question.contributor) {
                            throw new Error("Question Missing Contributor");
                        }
                    });

                    it("has options with `What is`", () => {
                        question.options.forEach((opt) => {
                            if(opt.text.startsWith("What is ")) return;
                            if(opt.text.startsWith("Who is ")) return;
                            if(opt.text.startsWith("Where is ")) return;
                            throw new Error("Doesn't Start with `What is`");
                        });
                    });

                });
            });
        });
    });
});