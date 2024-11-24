// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function getDateString(dateObj){
  let day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  let dt = zeroPad(dateObj.getDate());
  let week = day[dateObj.getDay()];
  let mon = month[dateObj.getMonth()];
  
  return `${week} ${dt} ${mon}`;
}