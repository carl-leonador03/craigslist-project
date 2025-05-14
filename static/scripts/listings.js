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
    // Assume each element with class "card-text" that should display days ago
    // has a data attribute called "data-posting-time" containing an ISO date string.
    const postingElements = document.querySelectorAll(".card-text[data-posting-time]");

    postingElements.forEach(el => {
        const postingTime = el.getAttribute("data-posting-time");
        const daysAgo = getDaysAgo(postingTime);
        el.textContent = `Posted: ${daysAgo} days ago`;
    });
});