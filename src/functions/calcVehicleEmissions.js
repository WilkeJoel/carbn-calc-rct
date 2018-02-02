import calcVehicleExhaust from './calcVehicleExhaust.js';
import { calcMilesPerYear } from '../utils.js';

import { g_MAINTENANCE_NOT_DO_FACTOR } from '../Constants.js';

export default function calcVehicleEmissions(miles, select, mpg, maintSelect){

	if (select === "Per Week") {                           // convert miles per week to miles per year first
		miles = calcMilesPerYear(miles);
	}
	
	let exhaust = calcVehicleExhaust(miles,mpg);
	
	if (maintSelect === "Do Not Do") {
		exhaust = exhaust * g_MAINTENANCE_NOT_DO_FACTOR;
	}

	return exhaust;
}