import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class DocumentationDataProvider implements vscode.TreeDataProvider<DocFile> {

    private _onDidChangeTreeData: vscode.EventEmitter<DocFile | undefined | void> = new vscode.EventEmitter<DocFile | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<DocFile | undefined | void> = this._onDidChangeTreeData.event;

    private docFiles:DocFile [] = [];

	constructor() {

	}

    private async getItems(): Promise<DocFile[]> {
        if(this.docFiles.length !== 0){
            return this.docFiles;
        }
        return await vscode.workspace.findFiles('Documentation/**').then(
            (uris:vscode.Uri[])=>{
                uris.map((uri:vscode.Uri)=> {
                    this.docFiles.push(new DocFile(uri)); 
                });
            }
        ).then(()=>{
            return this.docFiles;
        });
        
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
    constructor(uri: vscode.Uri) {
        let uriParts = uri.fsPath.split('\\');
        let fileName = "";
        for(let i = 0; i < uriParts.length; i++){
            if(uriParts[i] === 'Documentation'){
                fileName = uriParts.slice(i + 1).join('/');
                break;
            }
        }
        super(fileName as string, vscode.TreeItemCollapsibleState.None);
        this.resourceUri = uri;
        this.command = { command: 'notes.openDocumentation', title: '', arguments: [uri] };
    }
}