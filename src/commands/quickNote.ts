import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 }  from 'uuid';

export function quickNote() {
    let dir = vscode.workspace.getConfiguration('notes').get('noteDir') as string;
    let notePath = path.join(dir, 'note-' + uuidv4() + '.md'); 
    if(!fs.existsSync(notePath)){
        fs.writeFileSync(notePath, '# df');
    }
    vscode.commands.executeCommand('view.refresh');
    vscode.workspace. openTextDocument(notePath).then((doc) => {
        vscode.window.showTextDocument(doc);
    });
}