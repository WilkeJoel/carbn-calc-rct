import {
	g_AVG_NAT_GAS_PRICE_PER_THOUSAND_CUBIC_FEET,
	g_NAT_GAS_CUBIC_FEET_EMISSIONS_FACTOR,
	g_NAT_GAS_THERMS_EMISSIONS_FACTOR,
	g_NUM_MONTHS_PER_YEAR
} from '../Constants.js';

export default function calcNaturalGas(inputVal, optionSelect) {
	if (optionSelect == "Dollars") {
		return (inputVal / g_AVG_NAT_GAS_PRICE_PER_THOUSAND_CUBIC_FEET) * g_NAT_GAS_CUBIC_FEET_EMISSIONS_FACTOR * g_NUM_MONTHS_PER_YEAR;
	}
	else if (optionSelect == "Thousand Cubic Feet") {
		return g_NAT_GAS_CUBIC_FEET_EMISSIONS_FACTOR * inputVal * g_NUM_MONTHS_PER_YEAR;
	}
	else if (optionSelect == "Therms") {
		return g_NAT_GAS_THERMS_EMISSIONS_FACTOR * inputVal * g_NUM_MONTHS_PER_YEAR;
	}
}