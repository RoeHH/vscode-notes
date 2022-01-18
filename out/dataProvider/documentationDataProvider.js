"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocFile = exports.DocumentationDataProvider = void 0;
const vscode = require("vscode");
class DocumentationDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.docFiles = [];
    }
    async getItems() {
        if (this.docFiles.length !== 0) {
            return this.docFiles;
        }
        return await vscode.workspace.findFiles('Documentation/**').then((uris) => {
            uris.map((uri) => {
                this.docFiles.push(new DocFile(uri));
            });
        }).then(() => {
            return this.docFiles;
        });
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return this.getItems();
    }
}
exports.DocumentationDataProvider = DocumentationDataProvider;
class DocFile extends vscode.TreeItem {
    constructor(uri) {
        let uriParts = uri.fsPath.split('\\');
        let fileName = "";
        for (let i = 0; i < uriParts.length; i++) {
            if (uriParts[i] === 'Documentation') {
                fileName = uriParts.slice(i + 1).join('/');
                break;
            }
        }
        super(fileName, vscode.TreeItemCollapsibleState.None);
        this.resourceUri = uri;
        this.command = { command: 'notes.openDocumentation', title: '', arguments: [uri] };
    }
}
exports.DocFile = DocFile;
//# sourceMappingURL=documentationDataProvider.js.map