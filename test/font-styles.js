describe("Font Styles", () => {
    const FontStyles = require("../templates/FontStyles");
    Object.keys(FontStyles).forEach(style => {
        describe(style, () => {
            it("does not crash on rendering", () => {
                FontStyles[style]({ string: "Hello, World"});
            });
            it("does not crash without a string", () => {
                FontStyles[style]({ });
            });
        });
    });
});