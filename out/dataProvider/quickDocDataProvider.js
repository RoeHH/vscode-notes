"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocFile = exports.QuickDocDataProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
class QuickDocDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.docFiles = [];
    }
    async getItems() {
        if (this.docFiles.length !== 0) {
            return this.docFiles;
        }
        let dir = vscode.workspace.getConfiguration('notes').get('noteDir').replace(/\\/g, '/');
        fs.readdirSync(dir).map((file) => {
            if (file.endsWith('.md')) {
                let filePath = path.join(dir, file);
                let firstLineName = fs.readFileSync(filePath, 'utf8').split('\n').shift() || "";
                let fileName = file;
                if (firstLineName.startsWith('/delete')) {
                    fs.unlinkSync(filePath);
                }
                else {
                    if (firstLineName.startsWith('#')) {
                        fileName = firstLineName.substring(2);
                        let newFilePath = path.join(dir, fileName.replace(/ /g, '_') + '.md');
                        if (fs.existsSync(newFilePath)) {
                            let b = true;
                            for (let i = 0; b; i++) {
                                let newFilePath = path.join(dir, fileName.replace(/ /g, '_') + i + '.md');
                                if (fs.existsSync(newFilePath)) {
                                    b = false;
                                }
                            }
                        }
                        fs.renameSync(filePath, newFilePath);
                        this.docFiles.unshift(new DocFile(vscode.Uri.file(newFilePath), fileName, true));
                    }
                    else {
                        this.docFiles.push(new DocFile(vscode.Uri.file(filePath), fileName));
                    }
                }
            }
        });
        this.docFiles.sort((a, b) => {
            if (a.label === undefined || b.label === undefined || !a.cool || !b.cool) {
                return 0;
            }
            return a.label.toString().localeCompare(b.label.toString());
        });
        return this.docFiles;
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
exports.QuickDocDataProvider = QuickDocDataProvider;
class DocFile extends vscode.TreeItem {
    constructor(uri, fileName, c) {
        super(fileName, vscode.TreeItemCollapsibleState.None);
        this.resourceUri = uri;
        this.command = { command: 'notes.openDocumentation', title: 'open', arguments: [this.resourceUri] };
        this.cool = c || false;
    }
}
exports.DocFile = DocFile;
//# sourceMappingURL=quickDocDataProvider.js.map