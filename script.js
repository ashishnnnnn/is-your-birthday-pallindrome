function ispallindrome(string) {
  var char_of_str = string.split("");
  char_of_str = char_of_str.reverse();
  var new_string = char_of_str.join("");
  return new_string === string;
}

function modify_dates(date) {
  var new_date = { day: "", month: "", year: "" };
  if (date.day < 10) {
    new_date.day = "0" + date.day;
  } else {
    new_date.day = date.day.toString();
  }
  if (date.month < 10) {
    new_date.month = "0" + date.month;
  } else {
    new_date.month = date.month.toString();
  }
  new_date.year = date.year.toString();
  return new_date;
}

function allformats(dates) {
  var date = modify_dates(dates);
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function check_palindrom_for_all_dates(date) {
  var array = allformats(date);
  palindrome = false;
  for (let i = 0; i < array.length; i++) {
    if (ispallindrome(array[i])) {
      palindrome = true;
      break;
    }
  }
  return palindrome;
}

function is_leap_year(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function next_date(date) {
  var month_date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  if (is_leap_year(year)) {
    if (month === 2) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > month_date[month - 1]) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > month_date[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    day = 1;
    month = 1;
    year++;
  }
  var date1 = {
    day: day,
    month: month,
    year: year,
  };
  return date1;
}

function pre_date(date) {
  var day = date.day;
  var month = date.month;
  var year = date.year;
  day -= 1;
  var month_date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (is_leap_year(year)) {
    if (month === 3) {
      if (day <= 0) {
        day = 29;
        month--;
      }
    } else {
      if (day <= 0) {
        if (month === 1) {
          day = 31;
          month--;
        } else {
          day = month_date[month - 2];
          month--;
        }
      }
    }
  } else {
    if (day <= 0) {
      if (month === 1) {
        day = 31;
        month--;
      } else {
        day = month_date[month - 2];
        month--;
      }
    }
  }
  if (month <= 0) {
    month = 12;
    year--;
  }
  var date1 = {
    day: day,
    month: month,
    year: year,
  };
  return date1;
}

function next_palindrome_date(date) {
  var date1 = next_date(date);
  var curr1 = 0;
  while (1) {
    curr1++;
    if (check_palindrom_for_all_dates(date1)) {
      break;
    } else {
      date1 = next_date(date1);
    }
  }
  var date2 = pre_date(date);
  var curr2 = 0;
  while (1) {
    curr2++;
    if (check_palindrom_for_all_dates(date2)) {
      break;
    } else {
      date2 = pre_date(date2);
    }
  }
  if (curr1 <= curr2) {
    return [curr1, date1];
  } else {
    return [curr2, date2];
  }
}

var date_selection = document.querySelector(".entry");
var button = document.querySelector(".check");
var message = document.querySelector(".message");

button.addEventListener("click", function () {
  var temp_date_value = date_selection.value;
  if (temp_date_value == "") {
    message.innerText = "You have not selected your birthday";
    message.style.color = "red";
    return;
  }
  if (temp_date_value !== "") {
    var separation_of_dates = temp_date_value.split("-");
    var date = {
      day: Number(separation_of_dates[2]),
      month: Number(separation_of_dates[1]),
      year: Number(separation_of_dates[0]),
    };
    if (check_palindrom_for_all_dates(date)) {
      message.style.color = "green";
      message.innerText = "Hurray!! Your Birthday Is palindrome";
    } else {
      var day = next_palindrome_date(date)[1].day;
      var month = next_palindrome_date(date)[1].month;
      var year = next_palindrome_date(date)[1].year;
      var count = next_palindrome_date(date)[0];
      message.style.color = "red";
      message.innerText =
        "Sorry you missed the pallindromic birthday   " +
        day +
        " - " +
        month +
        " - " +
        year +
        " by " +
        count +
        " days";
    }
  }
});
