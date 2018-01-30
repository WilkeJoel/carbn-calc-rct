import {
	g_AVG_ELEC_PRICE_PER_KILOWATT,
	g_eFactorValue,
	g_NUM_MONTHS_PER_YEAR
} from './Constants.js';





export function calcMilesPerYear(milesPerWeek){
	return milesPerWeek * 52;
}