// Home-made JavaScript for adding icons for specific elements

/** Iconify the navigation bar controls. */
function iconifyNavbar()
{
    // Search bar
    var searchIcon = document.createElement("span");
    searchIcon.id = "search";
    searchIcon.classList.add("material-symbols-outlined");
    searchIcon.textContent = "search";

    // Post button
    var postIcon = document.createElement("span");
    postIcon.id = "post";
    postIcon.classList.add("material-symbols-outlined");
    postIcon.textContent = "edit_square";

    // Account button
    var accIcon = document.createElement("span");
    accIcon.id = "account";
    accIcon.classList.add("material-symbols-outlined");
    accIcon.textContent = "person";

    // Then we add the icons.
    document.querySelector('input[name="search"]').parentElement.insertBefore(searchIcon, document.querySelector('input[name="search"]'));
    document.querySelector('button#post').insertBefore(postIcon, document.querySelector('button#post').firstChild);
    document.querySelector('button#account').insertBefore(accIcon, document.querySelector('button#account').firstChild);
}

/** Iconify categories in home page */
function iconifyCategories()
{
    // I'll hard code them instead since atm we'll just show the most common look of the home page.
    const iconArray = {
        "community": "group",
        "services": "volunteer_activism",
        "discussion-forums": "forum",
        "gigs": "work_history",         // Apparently, in British English translation in the site, it translates to "temp jobs"
        "housing": "home",
        "for-sale": "sell",
        "jobs": "work",
        "resumes": "article_person"
    }

    for (var category of document.querySelectorAll("div.collapsible-header"))
    {
        var catIcon = document.createElement("span");
        catIcon.classList.add("material-symbols-outlined");
        catIcon.textContent = iconArray[category.id];

        category.querySelector("button.collapsible-header-title").insertBefore(catIcon, category.querySelector("button.collapsible-header-title").firstChild);

        // Also let's add in the arrows while we're at it.
        if (!category.classList.contains("single"))
        {
            var arrowIcon = document.createElement("span");
            arrowIcon.classList.add("material-symbols-outlined");
            arrowIcon.id = "collapsible-arrow";
            arrowIcon.textContent = "arrow_drop_down";

            category.querySelector("button.collapsible-header-title").appendChild(arrowIcon, category.querySelector("button.collapsible-header-title").lastChild);
        }
    }
}