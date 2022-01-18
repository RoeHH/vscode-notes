import * as vscode from 'vscode';

export function openDocumentation(uri: vscode.Uri){
    vscode.commands.executeCommand('vscode.open', uri);
}