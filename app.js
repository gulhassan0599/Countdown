// Array of month names
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

// Array of weekday names
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

// Select the elements for displaying the giveaway date and the countdown values
const giveaway = document.querySelector(".giveaway");
const deadlineTimes = document.querySelectorAll(".deadline-formate h4");
const deadlineBox = document.querySelector(".deadline");

// Get the current date and time
const current_date = new Date();
const currentYear = current_date.getFullYear();
const currentMonth = current_date.getMonth();
const currentDate = current_date.getDate();

// Set the future date for the countdown (10 days from the current date)
const future_date = new Date(currentYear, currentMonth, currentDate + 10, 11, 30, 45);
const futureTime = future_date.getTime();
const futureYear = future_date.getFullYear();
const futureMonth = months[future_date.getMonth()];
const futureWeekday = weekdays[future_date.getDay()];
const futureDate = future_date.getDate();
const futureHours = future_date.getHours();
const futureMinutes = future_date.getMinutes();

// Display the future giveaway end date on the page
giveaway.textContent = `Giveaway ends on ${futureWeekday}, ${futureDate} ${futureMonth} ${futureYear} ${futureHours}:${futureMinutes}am`;

// Function to calculate and display the remaining time
function countdownTime() {
    // Get the current time (updated on each tick)
    const currentTime = new Date().getTime();
    
    // Calculate the remaining time in milliseconds
    const remainingTime = futureTime - currentTime;

    // Constants for time calculations (in milliseconds)
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // Calculate the remaining days, hours, minutes, and seconds
    const day = Math.floor(remainingTime / oneDay);
    const hours = Math.floor((remainingTime % oneDay) / oneHour);
    const minutes = Math.floor((remainingTime % oneHour) / oneMinute);
    const seconds = Math.floor((remainingTime % oneMinute) / 1000);

    // Store the calculated time values in an array
    const value = [day, hours, minutes, seconds];

    // Update the countdown display with the formatted values
    deadlineTimes.forEach(function (deadlineTime, index) {
        deadlineTime.textContent = formate(value[index]);
    });

    // Function to format the time values (add leading zero if less than 10)
    function formate(deadlineTime) {
        return deadlineTime < 10 ? `0${deadlineTime}` : deadlineTime;
    };

    // Check if the remaining time is less than 0 (countdown has ended)
    if (remainingTime < 0) {
        // Stop the countdown interval
        clearInterval(countdown);
        deadlineBox.innerHTML = `<h3> sorry, this giveaway has expired! </h3>`;
    };
};

// Set the countdown to update every 1 second
let countdown = setInterval(countdownTime, 1000);

// Initial call to display the countdown immediately
countdownTime();