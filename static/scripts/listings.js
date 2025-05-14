// listings.js
// Computes the number of days elapsed from the posting time until now
function getDaysAgo(postTimeCreated) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const now = new Date();
    const postingTime = new Date(postTimeCreated);
    return Math.floor((now - postingTime) / millisecondsPerDay);
}

// Once the DOM is fully loaded, update all elements with a posting time
document.addEventListener("DOMContentLoaded", () => {
    // contains a data attribute "data-posting-time" with an ISO date string.
    const postingElements = document.querySelectorAll(".card-text[data-posting-time]");

    postingElements.forEach(el => {
        const postingTime = new Date(el.getAttribute("data-posting-time"));
        const now = new Date();
        const diffMs = now - postingTime;

        const msPerMinute = 60 * 1000;
        const msPerHour = 60 * msPerMinute;
        const msPerDay = 24 * msPerHour;

        let timeText = '';

        if (diffMs >= msPerDay) {
            const daysAgo = Math.floor(diffMs / msPerDay);
            timeText = `Posted: ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
        } else if (diffMs >= msPerHour) {
            const hoursAgo = Math.floor(diffMs / msPerHour);
            timeText = `Posted: ${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffMs >= msPerMinute) {
            const minutesAgo = Math.floor(diffMs / msPerMinute);
            timeText = `Posted: ${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            const secondsAgo = Math.floor(diffMs / 1000);
            timeText = `Posted: ${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
        }

        el.textContent = timeText;
    });
});