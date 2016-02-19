var monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
var days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];
function getMonth(year, month) {//translate number format of the month to word
    var whatMonth = "";
    for (var i = 0; i < monthsArray.length; i++) {
        if (month === i) {
            whatMonth = monthsArray[i];
        }
    }
    return year + " " + whatMonth;
}
function showCalendar(year, month) {//show calendar to the year-month date
    var calendar = document.getElementById("table");
    var nowDate = document.getElementById("yearMonth");
    nowDate.innerHTML = getMonth(year, month);
    var table = "<tr id='days'>";
    for (var k = 0; k < days.length; k++) {
        table += "<th>" + days[k] + "</th>";
    }
    table += "</tr><tr>";
    var date = new Date(year, month);
    var day = date.getDay() - 1;//find the first day of the month
    if (day < 0) {
        day = 6;
    }
    for (var i = 0; i < day; i++) {//add empty cells if month does not start from monday
        table += "<td></td>";
    }

    for (var j = day; j < (32 - new Date(year, month, 32).getDate() + day); j++) {//fiil calendar with dates
        table += "<td class='dates'>" + date.getDate() + "</td>";
        if (j % 7 === 6) {
            table += "</tr><tr>";
        }
        date.setDate(date.getDate() + 1);
    }
    table += "</tr></table>";
    calendar.innerHTML = table;//show calendar
    active(month, year);
}
function active(month, year) {//show nowadays
    var date = new Date().getDate();
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function () {//add event listener to check if cell is active
            if (this.className === "btn-primary") {
                this.className = "";
            } else {
                for (var j = 0; j < cells.length; j++) {
                    if (cells[j].className === "btn-primary") {
                        cells[j].className = "";
                    }
                }
                this.className = "btn-primary";
            }
        });
        cells[i].addEventListener("mouseover", function () {
            this.style.cursor = "pointer";
        });
        if (Number(cells[i].innerHTML) === Number(date) && month === new Date().getMonth() && year === new Date().getFullYear()) {//check if the active date of this month exists
            cells[i].className = "btn-primary";
        }
    }
}
showCalendar(new Date().getFullYear(), new Date().getMonth());

var globalYear = new Date();//create global year and month to remember them becouse they will be cleaned only when the window closed
var globalMonth = new Date();

function next() {//show next month calendar
    if (globalMonth.getMonth() === 11) {//check if it is December to chnge the year whem click next again
        globalMonth.setMonth(0);//set month
        globalYear.setFullYear(globalYear.getFullYear() + 1);//set year
    } else {
        globalMonth.setMonth(globalMonth.getMonth() + 1);
    }
    showCalendar(globalYear.getFullYear(), globalMonth.getMonth());//invoke base function to show calendar
}
function previous() {//show previous month calendar
    if (globalMonth.getMonth() === 0) {
        globalMonth.setMonth(11);
        globalYear.setFullYear(globalYear.getFullYear() - 1);
    } else {
        globalMonth.setMonth(globalMonth.getMonth() - 1);
    }
    showCalendar(globalYear.getFullYear(), globalMonth.getMonth());
}
