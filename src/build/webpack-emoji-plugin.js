// amazing plugin to make everything an emoji
// copied https://github.com/MhMadHamster/webpack-chunk-rename-plugin/blob/master/index.js
const loaderUtils = require("loader-utils");


class ChunksRenamePlugin {
    constructor({ filename, chunkFilename}) {
        this.filename = filename;
        this.chunkFilename = chunkFilename;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            "ChunksRenamePlugin",
            (compilation) => {
                compilation.chunkTemplate.hooks.renderManifest.tap(
                    "ChunksRenamePlugin",
                    (result, options) => {
                        const chunk = options.chunk;
                        if (
                            this.filename &&
                            chunk.hasEntryModule() &&
                            chunk.isOnlyInitial()
                        ) {
                            chunk.filenameTemplate = loaderUtils.interpolateName({}, this.filename, { content: chunk.hash });
                        } else if (this.chunkFilename) {
                            chunk.filenameTemplate = loaderUtils.interpolateName({}, this.chunkFilename, { content: chunk.hash });
                        }
                    }
                );
            }
        );
    }
}

module.exports = ChunksRenamePlugin;