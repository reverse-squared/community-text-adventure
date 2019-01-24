require("module-alias/register");
require("@babel/register");

const mockery = require("mockery");
const React = require("react");
describe("Custom HTML", function() {
    before(function() {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock("web-text-adventure", {
            Prompt: () => React.createElement("wta-prompt"),
            Options: () => React.createElement("wta-options"),
            DebugPanel: () => React.createElement("wta-debug"),
            setCustomHTML: (html) => htmll = html({prompt: "Hello World", contributor: null}),
        });

    });
    after(function () {
        mockery.disable();
    });
    it("does not crash during render", function() {
        require("../templates/CustomHTML");
    });
});
