export function airportWithMostTraffic(flights: string[][]): string | undefined {
    const depMap: Map<string, number> = new Map();
    const arrMap: Map<string, number> = new Map();
    for(const flight of flights) {
        const [dep, arr] = flight;
        const arrCount = arrMap.get(arr) || 0;
        arrMap.set(arr, arrCount+1);
        const depCount = depMap.get(dep) || 0;
        depMap.set(dep, depCount+1);
    }

    const allCities = new Set(...arrMap.keys(),...depMap.keys());
    let maxTraffic = 0;
    let maxTrafficCity: string | undefined = undefined;
    for(const city of allCities) {
        const cityTraffic = (arrMap.get(city) || 0 )+ (depMap.get(city) || 0);
        if(cityTraffic > maxTraffic) {
            maxTraffic = cityTraffic;
            maxTrafficCity = city;
        }
    }

    return maxTrafficCity;
}