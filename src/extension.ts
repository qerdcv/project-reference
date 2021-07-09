// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "project-reference" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('project-reference.copyReference', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		};
		const document = editor.document;
		const filetype = document.languageId;
		const activePosition = editor.selection.active;
		let file = document.fileName;
		let path;
		if (file) {
			file = vscode.workspace.asRelativePath(file);
			const textAtLine = document.lineAt(activePosition.line).text;
			if (filetype === 'python' && /^(def|class) (.+):$/.test(textAtLine)) {
				file = file.replace(/\//g, '.').replace(/\.py/, '');
				textAtLine.split(' ')[1].replace(/(\(|\:).*/, '');
				path = `${file}.${textAtLine.split(' ')[1].replace(/(\(|\:).*/, '')}`;
			} else {
				path = `${file}:${activePosition.line + 1}`;
			}
			if (path) {
				vscode.window.setStatusBarMessage('Copied!');
				setTimeout(() => vscode.window.setStatusBarMessage(''), 2000);
				vscode.env.clipboard.writeText(path);
			}
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
