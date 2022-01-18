"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const helloworld_1 = require("./commands/helloworld");
const quickNote_1 = require("./commands/quickNote");
const openDocumentation_1 = require("./commands/openDocumentation");
const documentationDataProvider_1 = require("./dataProvider/documentationDataProvider");
const quickDocDataProvider_1 = require("./dataProvider/quickDocDataProvider");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('notes.helloWorld', helloworld_1.helloWorld));
    context.subscriptions.push(vscode.commands.registerCommand('notes.quickNote', quickNote_1.quickNote));
    context.subscriptions.push(vscode.commands.registerCommand('notes.openDocumentation', openDocumentation_1.openDocumentation));
    const documentationDataProvider = new documentationDataProvider_1.DocumentationDataProvider();
    vscode.window.registerTreeDataProvider('documentation', documentationDataProvider);
    const quickDocDataProvider = new quickDocDataProvider_1.QuickDocDataProvider();
    vscode.window.registerTreeDataProvider('quicknote', quickDocDataProvider);
    context.subscriptions.push(vscode.commands.registerCommand('view.refresh', () => { quickDocDataProvider.refresh(); }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map