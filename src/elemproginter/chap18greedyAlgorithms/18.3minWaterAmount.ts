export function minWaterAmount(waterCap: Array<number>): number {
	let maxWaterCapInd = 0;
	let maxHeight = waterCap[0];
	for (let i = 1; i < waterCap.length; i++) {
		if (waterCap[i] > maxHeight) {
			maxHeight = waterCap[i];
			maxWaterCapInd = i;
		}
	}

	let vol = 0;
	let maxLeftCap = waterCap[0];
	for (let i = 1; i < maxWaterCapInd; i++) {
		const thisWaterCap = waterCap[i];
		if (thisWaterCap < maxLeftCap) {
			vol = vol + (maxLeftCap - thisWaterCap);
		} else {
			maxLeftCap = thisWaterCap;
		}
	}

	let maxRightCap = waterCap[waterCap.length - 1];
	for (let i = waterCap.length - 2; i > maxWaterCapInd; i--) {
		const thisWaterCap = waterCap[i];
		if (thisWaterCap < maxRightCap) {
			vol = vol + (maxRightCap - thisWaterCap);
		} else {
			maxRightCap = thisWaterCap;
		}
	}

	return vol;
}
