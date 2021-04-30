import * as vscode from 'vscode';
import calc from './calc';

export function activate({ subscriptions }: vscode.ExtensionContext) {
	console.log('active');
	const commentCounter = new CommentCounter();
	commentCounter.register(subscriptions);
	commentCounter.show();
	console.log('actived');
}

class CommentCounter {
	private statusBarItem: vscode.StatusBarItem;

	constructor() {
		this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
		this.calculate = this.calculate.bind(this);
		console.log('constructor');
	}

	register(subscriptions: any) {
		subscriptions.push(this.statusBarItem);
		// register some listener that make sure the status bar
		// item always up-to-date
		subscriptions.push(vscode.window.onDidChangeActiveTextEditor(this.calculate));
		subscriptions.push(vscode.workspace.onDidChangeTextDocument(this.calculate));
		console.log('constructor');
	}

	show() {
		this.statusBarItem.show();
		this.calculate();
		console.log('show');
	}

	async calculate() {
		if (vscode.window.activeTextEditor) {
			const path = vscode.window.activeTextEditor.document.fileName;
			try {
				const { blank, code, comment } = await calc(path);
				const totalLines = code + comment + blank;
				let percent = '0';
				if (totalLines > 0) {
					percent = (100 * comment / totalLines).toFixed(2);
				}
				console.log('calculate', totalLines);

				this.statusBarItem.text = `Comments: ${comment}/${totalLines}, ${percent}%`;
			} catch (e) {
				console.error('error: ', e);
				console.log('calculate e', e);
			}
		}
	}
}