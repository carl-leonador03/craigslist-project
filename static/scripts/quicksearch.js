const categories = {
    "community": "com",
    "activities": "act",
    "artists": "art",
    "childcare": "chc",
    "classes": "cls",
    "events": "events",
    "general": "gen",
    "groups": "grps",
    "local news": "lnws",
    "lost+found": "lfnd",
    "missed connections": "mcon",
    "musicians": "mus",
    "pets": "pets",
    "politics": "pols",
    "rants & raves": "rnrs",
    "rideshare": "rdsh",
    "volunteers": "vols",
    "services": "srvc",
    "automotive": "auto",
    "beauty": "bty",
    "cell/mobile": "cell",
    "computer": "comp",
    "creative": "crtv",
    "cycle": "cyc",
    "event": "evnt",
    "farm+garden": "fng",
    "financial": "fncl",
    "health/well": "hlth",
    "household": "hshd",
    "labor/move": "lbmv",
    "legal": "lgl",
    "lessons": "lssn",
    "marine": "mrne",
    "pet": "pet",
    "real estate": "rles",
    "skilled trade": "sktr",
    "sm biz ads": "sbad",
    "travel/vac": "trvc",
    "write/ed/tran": "wetr",
    "discussion forums": "dsfr",
    "apple": "apl",
    "art": "art",
    "atheist": "aths",
    "autos": "autos",
    "beauty": "bety",
    "bikes": "bkes",
    "celebs": "clbs",
    "comp": "compd",
    "cosmos": "csms",
    "diet": "diet",
    "divorce": "dvrc",
    "dying": "dyin",
    "eco": "eco",
    "feedbk": "fdbk",
    "film": "film",
    "fixit": "fxit",
    "food": "food",
    "frugal": "frgl",
    "gaming": "gmng",
    "garden": "grdn",
    "haiku": "haik",
    "help": "help",
    "history": "hist",
    "housing": "hsing",
    "jobs": "jobs",
    "jokes": "joks",
    "legal": "legl",
    "manners": "mnnrs",
    "marriage": "mrrge",
    "money": "mny",
    "music": "musc",
    "open": "open",
    "parent": "prnt",
    "pets": "pets",
    "philos": "phls",
    "photo": "phts",
    "politics": "pols",
    "psych": "psyc",
    "recover": "rcvr",
    "religion": "rel",
    "rofo": "rofo",
    "science": "scnc",
    "spirit": "sprt",
    "sports": "spor",
    "super": "super",
    "tax": "tax",
    "travel": "trvl",
    "tv": "tv",
    "vegan": "vegn",
    "words": "words",
    "writing": "wrtng",
    "housing": "housing-listings",
    "apts / housing": "housing-listings",
    "housing swap": "housing-listings",
    "housing wanted": "housing-listings",
    "office / commercial": "housing-listings",
    "parking / storage": "housing-listings",
    "real estate for sale": "housing-listings",
    "rooms / shared": "housing-listings",
    "rooms wanted": "housing-listings",
    "sublets / temporary": "housing-listings",
    "vacation rentals": "housing-listings",
    "for sale": "listing",
    "antiques": "listing",
    "appliances": "listing",
    "arts+crafts": "listing",
    "atv/utv/sno": "listing",
    "auto parts": "listing",
    "aviation": "listing",
    "baby+kid": "listing",
    "barter": "listing",
    "beauty+hlth": "listing",
    "bike parts": "listing",
    "bikes": "listing",
    "boat parts": "listing",
    "boats": "listing",
    "books": "listing",
    "business": "listing",
    "cars+trucks": "listing",
    "cds/dvd/vhs": "listing",
    "cell phones": "listing",
    "clothes+acc": "listing",
    "collectibles": "listing",
    "computer parts": "listing",
    "computers": "listing",
    "electronics": "listing",
    "farm+garden": "listing",
    "free": "listing",
    "furniture": "listing",
    "garage sale": "listing",
    "general": "listing",
    "heavy equip": "listing",
    "household": "listing",
    "jewerly": "listing",
    "materials": "listing",
    "motorcycle parts": "listing",
    "motorcycles": "listing",
    "music instr": "listing",
    "photo+video": "listing",
    "rvs+camp": "listing",
    "sporting": "listing",
    "tickets": "listing",
    "tools": "listing",
    "toys+games": "listing",
    "trailers": "listing",
    "video gaming": "listing",
    "wanted": "listing",
    "wheels+tires": "listing",
    "jobs": "listing",
    "accounting+finance": "listing",
    "admin / office": "listing",
    "arch / engineering": "listing",
    "art / media / design": "listing",
    "biotech / science": "listing",
    "business / mgmt": "listing",
    "customer service": "listing",
    "education": "listing",
    "etc / misc": "listing",
    "food / bev / hosp": "listing",
    "general labor": "listing",
    "government": "listing",
    "human resources": "listing",
    "legal / paralegal": "listing",
    "manufacturing": "listing",
    "marketing / pr / ad": "listing",
    "medical / health": "listing",
    "nonprofit sector": "listing",
    "real estate": "listing",
    "retail / wholesale": "listing",
    "sales / biz dev": "listing",
    "salon / spa / fitness": "listing",
    "security": "listing",
    "skilled trade / craft": "listing",
    "software / qa / dba": "listing",
    "systems / network": "listing",
    "technical support": "listing",
    "transport": "listing",
    "tv / film / video": "listing",
    "web / info design": "listing",
    "writing / editing": "listing"
}

var dim = document.querySelector("div.dim");

document.querySelector('input[name="search"]').addEventListener("input",
    async function (e) {
        if (e.target.value != "")
        {
            document.querySelector("div.results").style.display = "flex";
            fetchQuicks(e);
        } else {
            document.querySelector("div.results").style.display = "none";
        }
    }
)

document.querySelector('input[name="search"]').addEventListener("focus",
    function (e) {
        dim.style.backgroundColor = "#000000aa";
        dim.style.display = "block";

        if (e.target.value != "")
        {
            document.querySelector("div.results").style.display = "flex";
            fetchQuicks(e);
        }
            
    }
)

document.querySelector('input[name="search"]').addEventListener("blur",
    function (e) {
        if (e.target.value == "")
        {
            dim.style.backgroundColor = "#00000000";
            dim.style.display = "none";
            document.querySelector("div.results").style.display = "none";
            document.querySelector("div.results").innerHTML = null;
        }
        
    }
)

async function fetchQuicks(e) {
    const query = e.target.value;

    if (query != "")
    {

        var res = [];

        for (var c of Object.keys(categories))
        {
            if (c.includes(query))
            {
                res.push(c);
            }
        }
    }

    const searchBar = document.querySelector('input[name="search"]');
    const resultsDiv = document.querySelector("div.results");
    resultsDiv.classList.add("results");

    if (resultsDiv.innerHTML != null)
    {
        resultsDiv.innerHTML = null;
    }

    for (var r of res)
    {
        var resItem = document.createElement("a");
        resItem.href = "/"+categories[r];
        resItem.text = r;
        resultsDiv.appendChild(resItem);
    }
}