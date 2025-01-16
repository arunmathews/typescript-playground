interface EventWithType {
	eventType: "begin" | "end";
	time: Date;
}

export function maxConcurrentEvents(events: Array<[Date, Date]>): number {
	const eventTypesArray = new Array<EventWithType>();
	events.forEach((ev) => {
		const [begin, end] = ev;
		eventTypesArray.push(
			{ eventType: "begin", time: begin },
			{ eventType: "end", time: end },
		);
	});

	eventTypesArray.sort((f, s) => {
		if (f.time < s.time) {
			return -1;
		} else if (f.time > s.time) {
			return 1;
		} else if (f.eventType === "end") {
			return -1;
		} else {
			return 1;
		}
	});

	console.log(eventTypesArray);
	let maxConcEvents = 0;
	let currentConcEvents = 0;
	for (const eventWithType of eventTypesArray) {
		if (eventWithType.eventType === "begin") {
			currentConcEvents++;
			maxConcEvents = Math.max(currentConcEvents, maxConcEvents);
		} else {
			currentConcEvents--;
		}
	}

	return maxConcEvents;
}
