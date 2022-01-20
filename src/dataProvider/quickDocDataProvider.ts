import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class QuickDocDataProvider implements vscode.TreeDataProvider<DocFile> {

    private _onDidChangeTreeData: vscode.EventEmitter<DocFile | undefined | void> = new vscode.EventEmitter<DocFile | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<DocFile | undefined | void> = this._onDidChangeTreeData.event;

    private docFiles: DocFile[] = [];

    constructor() {

    }

    private async getItems(): Promise<DocFile[]> {
        if (this.docFiles.length !== 0) {
            return this.docFiles;
        }
        let dir = (vscode.workspace.getConfiguration('notes').get('noteDir') as string).replace(/\\/g, '/');
        fs.readdirSync(dir).map((file: string) => {
            if (file.endsWith('.md')) {
                let filePath = path.join(dir, file);
                let firstLineName = fs.readFileSync(filePath, 'utf8').split('\n').shift() || "";
                let fileName = file;
                if (firstLineName.startsWith('/delete')) {
                    fs.unlinkSync(filePath);
                } else {
                    if (firstLineName.startsWith('#')) {
                        fileName = firstLineName.substring(2);
                        let newFilePath = path.join(dir, fileName.replace(/ /g, '_') + '.md');
                        if (newFilePath !== filePath) {
                            if (fs.existsSync(newFilePath)) {
                                let b = true;
                                for (let i = 0; b; i++) {
                                    let newFilePath = path.join(dir, fileName.replace(/ /g, '_') + i + '.md');
                                    if (fs.existsSync(newFilePath)) {
                                        b = false;
                                    }
                                }
                            }
                        }
                        fs.renameSync(filePath, newFilePath);
                        this.docFiles.unshift(new DocFile(vscode.Uri.file(newFilePath), fileName, true));
                    } else {
                        this.docFiles.push(new DocFile(vscode.Uri.file(filePath), fileName));
                    }
                }
            }
        });
        this.docFiles.sort((a: DocFile, b: DocFile) => {
            if (a.label === undefined || b.label === undefined || !a.cool || !b.cool) {
                return 0;
            }
            return a.label.toString().localeCompare(b.label.toString());
        });
        return this.docFiles;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: DocFile): vscode.TreeItem {
        return element;
    }

    getChildren(element?: DocFile): vscode.ProviderResult<DocFile[]> {
        return this.getItems();
    }
}

export class DocFile extends vscode.TreeItem {
    resourceUri?: vscode.Uri;
    command?: vscode.Command | undefined;
    cool: boolean;
    constructor(uri: vscode.Uri, fileName: string, c?: boolean) {
        super(fileName, vscode.TreeItemCollapsibleState.None);
        this.resourceUri = uri;
        this.command = { command: 'notes.openDocumentation', title: 'open', arguments: [this.resourceUri] };
        this.cool = c || false;
    }
}