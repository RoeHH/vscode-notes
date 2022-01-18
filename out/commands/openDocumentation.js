"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDocumentation = void 0;
const vscode = require("vscode");
function openDocumentation(uri) {
    vscode.commands.executeCommand('vscode.open', uri);
}
exports.openDocumentation = openDocumentation;
//# sourceMappingURL=openDocumentation.js.map