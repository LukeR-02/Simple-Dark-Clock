import clock from "clock"; // needed to have a clock! (see lines 10, 28)
import document from "document"; // needed to access the labels used to display values (see lines 12-16)
import { preferences } from "user-settings"; // needed to get the user preference 12h or 24h (see line 33)
import { zeroPad, } from "../common/utils"; // import user function zeroPad (see lines 38, 40, 41)
import { HeartRateSensor } from "heart-rate"; // import HR reading from sensor (see line 18)
import { battery } from "power"; // import battery level (see line 51)
import { charger } from "power"; // import charging status
import userActivity from "user-activity"; //adjusted types (matching the stats that you upload to fitbit.com, as opposed to local types)
import { today } from "user-activity";

import * as util from '../common/utils';

// Update the clock every second
clock.granularity = "seconds"; //clock is refreshing every sec. It is possible to select minutes as well

// Create DOM variables
const dateHandle = document.getElementById('dateLabel');
const timeHandle = document.getElementById("timeLabel"); 
const batteryHandle = document.getElementById("batteryLabel");
const stepsHandle = document.getElementById("stepsLabel");
const heartrateHandle = document.getElementById("heartrateLabel");

// The following block read the heart rate from your watch
const hrm = new HeartRateSensor();

hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`; // the measured HR is being sent to the heartrateHandle set at line 16
}
hrm.start();


// Update the <text> elements every tick with the current time
clock.ontick = (evt) => {
  // Date
  let thisday = new Date();
  dateHandle.text = util.getDateString(thisday);
  
  // Time
  const now = evt.date; // get the actual instant
  let hours = now.getHours(); // separate the actual hours from the instant "now"
  let mins = now.getMinutes(); // separate the actual minute from the instant "now"
  //let secs = now.getSeconds(); // separate the actual second from the instant "now"
  if (preferences.clockDisplay === "12h") { // check from your watch settings if you use 12h or 24h visualization
    // 12h format
    hours = hours % 12 || 12; 
  } else {
    // 24h format
    hours = zeroPad(hours); // when you use 24h in case hours are in one digit then I put a zero in front. i.e. 3 am -> 03
  };
  let minsZeroed = zeroPad(mins); // one digit mins get a zero in front
  //let secsZeroes = zeroPad(secs); // one digit secs get a zero in front
  timeHandle.text = `${hours}:${minsZeroed}`; // time in format hh:mm is assigned in the timeHandle defined at line 17
  
  // Activity Values: adjusted type
  let stepsValue = (today.adjusted.steps["steps"] || 0); // steps value measursed from fitbit is assigned to the variable stepsValue
  let stepsString = `${stepsValue}`; // I concatenate a the stepsValue (line above) with th string ' steps' and assign to a new variable
  stepsHandle.text = stepsString; // the string stepsString is being sent to the stepsHandle set at line 19
 
  // Battery Measurement
  let batteryValue = battery.chargeLevel; // measure the battery level and send it to the variable batteryValue
  
  // Assignment value battery
  if(charger.connected == true) {
    batteryHandle.text = `Charging: ${batteryValue}%`;
  } else {
    batteryHandle.text = `${batteryValue}%`;
  };
};