import {
	g_AVG_FUEL_OIL_PRICE_PER_GALLON,
	g_FUEL_OIL_EMISSIONS_FACTOR,
	g_NUM_MONTHS_PER_YEAR
} from '../Constants.js';

export default function calcFuelOil(inputVal, optionSelect) {
	if (optionSelect == "Dollars") {
	  return (inputVal / g_AVG_FUEL_OIL_PRICE_PER_GALLON) * g_FUEL_OIL_EMISSIONS_FACTOR * g_NUM_MONTHS_PER_YEAR;
	}
	else if (optionSelect == "Gallons") {
	  return g_FUEL_OIL_EMISSIONS_FACTOR * inputVal * g_NUM_MONTHS_PER_YEAR;
	}
}