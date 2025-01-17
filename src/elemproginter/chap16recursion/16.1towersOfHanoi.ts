type TowerName = "P1" | "P2" | "P3";

export function towersOfHanoi(
	count: number,
	fromTower: TowerName,
	toTower: TowerName,
) {
	towersOfHanoiHelper(count, fromTower, toTower, "P3");
}

function towersOfHanoiHelper(
	count: number,
	fromTower: TowerName,
	toTower: TowerName,
	spareTower: TowerName,
): void {
	if (count === 0) {
		return;
	}
	towersOfHanoiHelper(count - 1, fromTower, spareTower, toTower);
	console.log(`Move ${count}th brick from ${fromTower} to ${toTower}`);
	towersOfHanoiHelper(count - 1, spareTower, toTower, fromTower);
}
