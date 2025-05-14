// TODO: Create a calendar table for the events calendar in the sidebar.
// class name: calendar-content (div)

const date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

const month_index = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Date.prototype.getWeekOfMonth = function () {
    var firstDay = new Date(this.setDate(1)).getDay();
    var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);
}

function populateCalendar(date) {
    if (date.getMonth() == new Date().getMonth() && date.getFullYear() <= new Date().getFullYear())
    {
        // Disable scrolling prior to the current month and year.
        document.getElementById("prev-month").disabled = true;
    }
    else {
        document.getElementById("prev-month").disabled = false;
    }

    const calendar = document.querySelector("div.event-calendar");
    const month_name = calendar.querySelector("span#month");
    const calendar_content = calendar.querySelector("div.calendar-content");

    month_name.textContent = month_index[date.getMonth()];

    calendar_content.innerHTML = null;

    const calendar_table = document.createElement("table");
    const calendar_tableheader = document.createElement("tr");

    for (var day of ["S", "M", "T", "W", "T", "F", "S"])
    {
        var dayE = document.createElement("th");
        if (day == "S")
        {
            dayE.style.color = "red";
        }

        dayE.textContent = day;

        calendar_tableheader.appendChild(dayE);
    }

    const firstWeekDay = new Date(y, date.getMonth(), 1).getDay();
    var dayCount = 0;
    const weekNo = date.getWeekOfMonth();

    calendar_table.appendChild(calendar_tableheader);

    for (var i = 0; i < weekNo; i++)
    {
        var week = document.createElement("tr")
        
        for (var j = (i > 0 ? 0 : firstWeekDay); j < (i != weekNo - 1 ? 7 : new Date(y, date.getMonth() + 1, 0).getDay() + 1); j++)
        {
            var day = document.createElement("td");

            if ((dayCount + 1) == new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear())
            {
                day.textContent = null;
                day.innerHTML = "<a href=''>" + (dayCount+1) + "</a>";
                day.classList.add("today");
            }
            else if ((dayCount + 1) < new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() >= new Date().getFullYear())
            {
                day.textContent = dayCount + 1;
            }
            else
            {
                day.textContent = null;
                day.innerHTML = "<a href=''>" + (dayCount+1) + "</a>";
            }
            
            week.appendChild(day);
            dayCount++;
        }

        if (i == 0)
        {
            for (var k = 0; k < firstWeekDay; k++)
            {
                var spacer = document.createElement("td");
                
                week.insertBefore(spacer, week.firstChild);
            }
        }

        calendar_table.appendChild(week);
    }

    calendar_content.appendChild(calendar_table);

}

function prevMonth(e) {
    const currentSelectedMonth = e.parentElement.parentElement.children[0].textContent;
    const prevDate = new Date(y, month_index.indexOf(currentSelectedMonth) - 1);

    // update the date
    d = prevDate.getDate();
    m = prevDate.getMonth();
    y = prevDate.getFullYear();

    populateCalendar(prevDate);
}

function nextMonth(e) {
    const currentSelectedMonth = e.parentElement.parentElement.children[0].textContent;
    const nextDate = new Date(y, month_index.indexOf(currentSelectedMonth) + 1);

    // update the date
    d = nextDate.getDate();
    m = nextDate.getMonth();
    y = nextDate.getFullYear();

    populateCalendar(nextDate);
}

populateCalendar(date);