// Home-made JavaScript for adding icons for specific elements

/** Adds a magnifying lens icon to the search bar. */
async function searchIcon()
{
    var icon = document.createElement("span");
    icon.id = "search";
    icon.classList.add("material-symbols-outlined");
    icon.textContent = "search";

    const searchBox = document.querySelector('input[name="search"]');
    searchBox.parentElement.insertBefore(icon, searchBox);
}