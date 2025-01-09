import * as fs from "fs";
import * as readline from "readline";
import { BinaryHeap } from "../dataTypes/heap";

type HeapType = {
	timeInMillis: BigInt;
	line: string;
	filePath: string;
};
export async function mergeSortedFiles(
	filePaths: Array<string>,
	outputFilePath: string,
): Promise<void> {
	const heap = new BinaryHeap<HeapType>(
		(a, b) => a.timeInMillis < b.timeInMillis,
	);
	const pathToReaderMap: Map<string, readline.Interface> = new Map();

	filePaths.forEach(async (fp) => {
		const reader = readline.createInterface({
			input: fs.createReadStream(fp),
			crlfDelay: Infinity,
		});
		pathToReaderMap.set(fp, reader);
		const firstLine = await getNextLine(reader);
		if (firstLine != null) {
			const firstItem = await createHeapItem(reader, fp);
			if (firstItem != null) {
				heap.insert(firstItem);
			}
		}
	});
	const writeStream = fs.createWriteStream(outputFilePath);
	while (heap.size() > 0) {
		const nextHeapItem = heap.extract();
		if (nextHeapItem != null) {
			writeStream.write(`${nextHeapItem.line}\n`);
			const thisReader = pathToReaderMap.get(nextHeapItem.filePath);
			if (thisReader != null) {
				const itemToInsert = await createHeapItem(
					thisReader,
					nextHeapItem.filePath,
				);
				if (itemToInsert != null) {
					heap.insert(itemToInsert);
				}
			}
		}
	}

	writeStream.close();
	pathToReaderMap.forEach((value) => value.close());
}

// Utility function to get the next line from a file
async function getNextLine(reader: readline.Interface): Promise<string | null> {
	return new Promise((resolve) => {
		reader.once("line", (line) => resolve(line));
		reader.once("close", () => resolve(null));
	});
}

async function createHeapItem(
	reader: readline.Interface,
	filePath: string,
): Promise<HeapType | undefined> {
	const nextLine = await getNextLine(reader);
	if (nextLine != null) {
		const tokens = nextLine.split(",");
		const timeInMillis = BigInt(tokens[0]);
		return { timeInMillis, line: nextLine, filePath };
	}

	return undefined;
}
