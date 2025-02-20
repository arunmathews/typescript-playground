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
		const maybeNode = this.searchHelper(word);
		if (maybeNode == null) {
			return false;
		}

		return maybeNode.wordEnd;
	}

	private searchHelper(prefix: string): TrieNode | undefined {
		let current = this.root;
		for (const char of prefix) {
			if (!current.children.has(char)) {
				return undefined;
			}
			current = current.children.get(char)!;
		}
		return current;
	}

	collectAllWords(): Array<string> {
		let res: Array<string> = [];

		this.accumWordsHelper(this.root, "", res);

		return res;
	}

	searchResults(prefix: string): Array<String> {
		let res: Array<string> = [];
		const maybeNode = this.searchHelper(prefix);
		if (maybeNode == null) {
			return res;
		}
		this.accumWordsHelper(maybeNode, prefix, res);

		return res;
	}

	private accumWordsHelper(
		node: TrieNode,
		prefix: string,
		results: Array<string>,
	): void {
		if (node.wordEnd === true) {
			results.push(prefix);
		}
		for (const [char, child] of node.children) {
			this.accumWordsHelper(child, prefix + char, results);
		}
	}
}
