import * as vscode from 'vscode';
import { helloWorld } from './commands/helloworld';
import { quickNote } from './commands/quickNote';
import { openDocumentation } from './commands/openDocumentation';
import { DocumentationDataProvider } from './dataProvider/documentationDataProvider';
import { QuickDocDataProvider } from './dataProvider/quickDocDataProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('notes.helloWorld', helloWorld));
	context.subscriptions.push(vscode.commands.registerCommand('notes.quickNote', quickNote));
	context.subscriptions.push(vscode.commands.registerCommand('notes.openDocumentation', openDocumentation));
	const documentationDataProvider = new DocumentationDataProvider();
	vscode.window.registerTreeDataProvider('documentation', documentationDataProvider);
	const quickDocDataProvider = new QuickDocDataProvider();
	vscode.window.registerTreeDataProvider('quicknote', quickDocDataProvider);
	context.subscriptions.push(vscode.commands.registerCommand('view.refresh',  () => { quickDocDataProvider.refresh();}));

}

// this method is called when your extension is deactivated
export function deactivate() {}
