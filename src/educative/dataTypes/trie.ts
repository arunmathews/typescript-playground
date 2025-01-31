export class TrieNode {
	children: Map<string, TrieNode>;
	wordEnd: boolean;

	constructor() {
		this.children = new Map();
		this.wordEnd = false;
	}
}

export class Trie {
	root: TrieNode;

	constructor() {
		this.root = new TrieNode();
	}

	insert(word: string): void {
		let current = this.root;
		for (const char of word) {
			if (!current.children.has(char)) {
				current.children.set(char, new TrieNode());
			}
			current = current.children.get(char)!;
		}
		current.wordEnd = true;
	}

	search(word: string): boolean {
		let current = this.root;
		for (const char of word) {
			if (current.children.has(char)) {
				current = current.children.get(char)!;
			} else {
				return false;
			}
		}
		return current.wordEnd;
	}

	startsWith(prefix: string): boolean {
		let current = this.root;
		for (const char of prefix) {
			if (current.children.has(char)) {
				current = current.children.get(char)!;
			} else {
				return false;
			}
		}

		return true;
	}

	collectWords(): Array<string> {
		const results: Array<string> = [];
		this.collectWordsHelper(this.root, "", results);

		return results;
	}

	private collectWordsHelper(
		node: TrieNode,
		prefix: string,
		results: Array<string>,
	) {
		if (node.wordEnd) {
			results.push(prefix);
		}
		for (const [char, childNode] of node.children) {
			this.collectWordsHelper(childNode, prefix + char, results);
		}
	}

	deleteWord(word: string): boolean {
		return this.deleteWordHelper(this.root, word, 0);
	}

	private deleteWordHelper(
		node: TrieNode,
		word: string,
		depth: number,
	): boolean {
		if (depth === word.length) {
			if (!node.wordEnd) {
				return false;
			}
			node.wordEnd = false;
			return node.children.size === 0;
		}

		const char = word[depth];
		const childNode = node.children.get(char);
		if (childNode == null) {
			return false;
		} else {
			const shouldDeleteChild = this.deleteWordHelper(
				childNode,
				word,
				depth + 1,
			);
			if (shouldDeleteChild) {
				node.children.delete(char);
				return node.children.size === 0 && !node.wordEnd;
			}
			return false;
		}
	}
}
