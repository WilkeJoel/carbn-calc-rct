import calcVehicleExhaust from './calcVehicleExhaust.js';
import { calcMilesPerYear } from '../utils.js';

export default function calcVehicleEmissions(miles, select, mpg){
	//var miles = scrubInputText(mileChecker);               //  check for non number related characters
	//miles = stripCommas(miles);
	
	if (select === "Per Week") {                           // convert miles per week to miles per year first
		miles = calcMilesPerYear(miles);
	}

	//var mpg = scrubInputText(mpgChecker);
	//mpg = stripCommas(mpg);
	
	return calcVehicleExhaust(miles,mpg);
	/*
	if (maintCurrentSelect == "Do Not Do") {
		exhaust = exhaust * 1.04;
	}
	else{
		exhaust = 0;
	}
*/
}