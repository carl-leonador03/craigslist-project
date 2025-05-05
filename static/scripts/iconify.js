// Home-made JavaScript for adding icons for specific elements

// An array of SVG paths for easier loading.
var icon_array = {};
const svgns = "http://www.w3.org/2000/svg";

async function fetchIcons()
{
    var icon_results = await fetch(
        "/fetch/icons"
    ).then((res) => res.json());

    for (let icon_name of Object.keys(icon_results)) {
        icon_array[icon_name] = icon_results[icon_name];
    }

    return true; // To close the async message listener channel. idk why
}

/** Adds a magnifying lens icon to the search bar. */
async function searchIcon()
{
    if (icon_array.search == undefined) {
        await fetchIcons();
    }

    var icon = document.createElement("span");
    icon.id = "search";
    icon.classList.add("material-symbols-outlined");
    icon.textContent = "search";

    const searchBox = document.querySelector('input[name="search"]');
    searchBox.parentElement.insertBefore(icon, searchBox);
    
}