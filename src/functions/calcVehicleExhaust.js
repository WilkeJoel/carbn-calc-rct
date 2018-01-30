import {
	g_CO2_EMITTED_PER_GALLON_OF_GASOLINE,
	g_NONCO2_EMITTED_PER_GALLON_OF_GASOLINE
} from '../Constants.js';

export default function calcVehicleExhaust(miles,mpg){
	return miles / mpg * g_CO2_EMITTED_PER_GALLON_OF_GASOLINE * g_NONCO2_EMITTED_PER_GALLON_OF_GASOLINE;
}