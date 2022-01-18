"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickNote = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
function quickNote() {
    let dir = vscode.workspace.getConfiguration('notes').get('noteDir');
    let notePath = path.join(dir, 'note-' + (0, uuid_1.v4)() + '.md');
    if (!fs.existsSync(notePath)) {
        fs.writeFileSync(notePath, '# df');
    }
    vscode.commands.executeCommand('view.refresh');
    vscode.workspace.openTextDocument(notePath).then((doc) => {
        vscode.window.showTextDocument(doc);
    });
}
exports.quickNote = quickNote;
//# sourceMappingURL=quickNote.js.map