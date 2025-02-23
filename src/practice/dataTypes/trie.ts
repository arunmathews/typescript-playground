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

	addWord(word: string): void {
		let current = this.root;
		for (const char of word) {
			if (current.children.has(char) === false) {
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
			if (current.children.has(char) === false) {
				return undefined;
			}
			current = current.children.get(char)!;
		}

		return current;
	}

	prefixWords(prefix: string): Array<string> {
		const maybeNode = this.searchHelper(prefix);
		if (maybeNode == null) {
			return [];
		}
		const res: Array<string> = [];

		this.collectWordsHelper(maybeNode, prefix, res);

		return res;
	}

	private collectWordsHelper(
		node: TrieNode,
		prefix: string,
		accum: Array<string>,
	): void {
		if (node.wordEnd === true) {
			accum.push(prefix);
		}
		for (const [char, child] of node.children) {
			this.collectWordsHelper(child, prefix + char, accum);
		}
	}
}
