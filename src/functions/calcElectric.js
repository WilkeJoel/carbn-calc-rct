import {
	g_AVG_ELEC_PRICE_PER_KILOWATT,
	g_eFactorValue,
	g_NUM_MONTHS_PER_YEAR
} from '../Constants.js';

export default function calcElectric(inputVal, optionSelect) {
	if (optionSelect == "Dollars") {
		return (inputVal / g_AVG_ELEC_PRICE_PER_KILOWATT) * g_eFactorValue * g_NUM_MONTHS_PER_YEAR;
	}
	else if (optionSelect == "kWh") {
		return inputVal * g_eFactorValue * g_NUM_MONTHS_PER_YEAR;
	}
}