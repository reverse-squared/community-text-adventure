require("module-alias/register");
require("@babel/register");

const mockery = require("mockery");
const React = require("react");
describe("Custom HTML", function() {
    let render;

    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock("web-text-adventure", {
            Prompt: () => React.createElement("wta-prompt"),
            Options: () => React.createElement("wta-options"),
            DebugPanel: () => React.createElement("wta-debug"),
            setCustomHTML: (html) => render = html,
        });

        require("../templates/CustomHTML");

    });
    after(function () {
        mockery.disable();
    });
    it("does not crash during render", function() {
        render({ prompt: "Hello World", options: [], contributor: null });
    });
    it("returns nothing for a blank scene", function() {
        if (render({ prompt: "Hello World", options: [], contributor: null, isBlank: true }) !== null) {
            throw new Error("Expected Null");
        }
    });
});
