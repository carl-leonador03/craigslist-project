// Markdown Editor
function applyMarkdown(startTag, endTag) {
    const textarea = document.getElementById('markdown-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + startTag + selectedText + endTag + text.substring(end);
    textarea.value = newText;
}

function applyHeading(level) {
    const textarea = document.getElementById('markdown-editor');
    const start = textarea.selectionStart;
    const text = textarea.value;
    const newText = text.substring(0, start) + '#'.repeat(level) + ' ' + text.substring(start);
    textarea.value = newText;
}

function insertLink() {
    const url = prompt('Enter the URL:');
    if (url) {
        applyMarkdown('[', `](${url})`);
    }
}

function insertImage() {
    const url = prompt('Enter the image URL:');
    if (url) {
        applyMarkdown('![', `](${url})`);
    }
}

// Categories / Types
const typeOptions = {
    community: [
        { value: "activities", text: "Activities" },
        { value: "artists", text: "Artists" },
        { value: "childcare", text: "Childcare" },
        { value: "classes", text: "Classes" },
        { value: "events", text: "Events" },
        { value: "general", text: "General" },
        { value: "groups", text: "Groups" },
        { value: "local_news", text: "Local News" },
        { value: "lost_found", text: "Lost+Found" },
        { value: "missed_connections", text: "Missed Connections" },
        { value: "musicians", text: "Musicians" },
        { value: "pets", text: "Pets" },
        { value: "politics", text: "Politics" },
        { value: "rants_raves", text: "Rants & Raves" },
        { value: "rideshare", text: "Rideshare" },
        { value: "volunteers", text: "Volunteers" }
    ],
    services: [
        { value: "automotive", text: "Automotive" },
        { value: "beauty", text: "Beauty" },
        { value: "cell_mobile", text: "Cell/Mobile" },
        { value: "computer", text: "Computer" },
        { value: "creative", text: "Creative" },
        { value: "cycle", text: "Cycle" },
        { value: "event", text: "Event" },
        { value: "farm_garden", text: "Farm+Garden" },
        { value: "financial", text: "Financial" },
        { value: "health_well", text: "Health/Well" },
        { value: "household", text: "Household" },
        { value: "labor_move", text: "Labor/Move" },
        { value: "legal", text: "Legal" },
        { value: "lessons", text: "Lessons" },
        { value: "marine", text: "Marine" },
        { value: "pet", text: "Pet" },
        { value: "real_estate", text: "Real Estate" },
        { value: "skilled_trade", text: "Skilled Trade" },
        { value: "sm_biz_ads", text: "Small Biz Ads" },
        { value: "travel_vac", text: "Travel/Vac" },
        { value: "write_ed_tran", text: "Write/Ed/Tran" }
    ],
    housing: [
        { value: "apts_using", text: "Apartments Using" },
        { value: "housing_swap", text: "Housing Swap" },
        { value: "housing_wanted", text: "Housing Wanted" },
        { value: "office_commercial", text: "Office Commercial" },
        { value: "parking_storage", text: "Parking Storage" },
        { value: "real_estate_for_sale", text: "Real Estate for Sale" },
        { value: "rooms_shared", text: "Rooms Shared" },
        { value: "rooms_wanted", text: "Rooms Wanted" },
        { value: "sublets_temporary", text: "Sublets Temporary" },
        { value: "vacation_rentals", text: "Vacation Rentals" }
    ],
    for_sale: [
        { value: "antiques", text: "Antiques" },
        { value: "appliances", text: "Appliances" },
        { value: "arts_crafts", text: "Arts+Crafts" },
        { value: "atv_utv_snow", text: "ATV/UTV/Snow" },
        { value: "auto_parts", text: "Auto Parts" },
        { value: "aviation", text: "Aviation" },
        { value: "baby_kid", text: "Baby+Kid" },
        { value: "barter", text: "Barter" },
        { value: "beauty_health", text: "Beauty+Health" },
        { value: "bike_parts", text: "Bike Parts" },
        { value: "bikes", text: "Bikes" },
        { value: "boat_parts", text: "Boat Parts" },
        { value: "boats", text: "Boats" },
        { value: "books", text: "Books" },
        { value: "business", text: "Business" },
        { value: "cars_trucks", text: "Cars+Trucks" },
        { value: "cds_dvd_vhs", text: "CDs/DVD/VHS" },
        { value: "cell_phones", text: "Cell Phones" },
        { value: "clothes_accessories", text: "Clothes+Accessories" },
        { value: "collectibles", text: "Collectibles" },
        { value: "computer_parts", text: "Computer Parts" },
        { value: "computers", text: "Computers" },
        { value: "electronics", text: "Electronics" },
        { value: "farm_garden", text: "Farm+Garden" },
        { value: "free", text: "Free" },
        { value: "furniture", text: "Furniture" },
        { value: "garage_sale", text: "Garage Sale" },
        { value: "general", text: "General" },
        { value: "heavy_equip", text: "Heavy Equipment" },
        { value: "household", text: "Household" },
        { value: "jewelry", text: "Jewelry" },
        { value: "materials", text: "Materials" },
        { value: "motorcycle_parts", text: "Motorcycle Parts" },
        { value: "motorcycles", text: "Motorcycles" },
        { value: "music_instr", text: "Music Instruments" },
        { value: "photo_video", text: "Photo+Video" },
        { value: "rvs_camp", text: "RVs+Camp" },
        { value: "sporting", text: "Sporting" },
        { value: "tickets", text: "Tickets" },
        { value: "tools", text: "Tools" },
        { value: "toys_games", text: "Toys+Games" },
        { value: "trailers", text: "Trailers" },
        { value: "video_gaming", text: "Video Gaming" },
        { value: "wanted", text: "Wanted" },
        { value: "wheels_tires", text: "Wheels+Tires" }
    ],
    jobs: [
        { value: "accounting_finance", text: "Accounting+Finance" },
        { value: "admin_office", text: "Admin / Office" },
        { value: "arch_engineering", text: "Architecture / Engineering" },
        { value: "art_media_design", text: "Art / Media / Design" },
        { value: "biotech_science", text: "Biotech / Science" },
        { value: "business_mgmt", text: "Business / Management" },
        { value: "customer_service", text: "Customer Service" },
        { value: "education", text: "Education" },
        { value: "etc_misc", text: "Etc / Misc" },
        { value: "food_bev_hosp", text: "Food / Beverage / Hospitality" },
        { value: "general_labor", text: "General Labor" },
        { value: "government", text: "Government" },
        { value: "human_resources", text: "Human Resources" },
        { value: "legal_paralegal", text: "Legal / Paralegal" },
        { value: "manufacturing", text: "Manufacturing" },
        { value: "marketing_pr_ad", text: "Marketing / PR / Advertising" },
        { value: "medical_health", text: "Medical / Health" },
        { value: "nonprofit_sector", text: "Nonprofit Sector" },
        { value: "real_estate", text: "Real Estate" },
        { value: "retail_wholesale", text: "Retail / Wholesale" },
        { value: "sales_biz_dev", text: "Sales / Business Development" },
        { value: "salon_spa_fitness", text: "Salon / Spa / Fitness" },
        { value: "security", text: "Security" },
        { value: "skilled_trade_craft", text: "Skilled Trade / Craft" },
        { value: "software_qa_dba", text: "Software / QA / DBA" },
        { value: "systems_network", text: "Systems / Network" },
        { value: "technical_support", text: "Technical Support" },
        { value: "transport", text: "Transport" },
        { value: "tv_film_video", text: "TV / Film / Video" },
        { value: "web_info_design", text: "Web / Info Design" },
        { value: "writing_editing", text: "Writing / Editing" }
    ],
    resumes: [
        { value: "resumes", text: "Resumes" }
    ]
};

function updateTypeOptions() {
    const categorySelect = document.getElementById("category");
    const typeSelect = document.getElementById("type");
    const selectedCategory = categorySelect.value;

    // Clear existing options
    typeSelect.innerHTML = '<option value="" disabled selected>Select a type</option>';

    // Populate new options
    if (typeOptions[selectedCategory]) {
        typeOptions[selectedCategory].forEach(option => {
            const opt = document.createElement("option");
            opt.value = option.value;
            opt.textContent = option.text;
            typeSelect.appendChild(opt);
        });
    }
}

// Preview Markdown
const markdownEditor = document.getElementById('markdown-editor');
const markdownPreview = document.getElementById('markdown-preview');

markdownEditor.addEventListener('input', () => {
    const markdownText = markdownEditor.value;

    // Send the Markdown content to the server for conversion
    fetch('/preview-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: markdownText }),
    })
        .then(response => response.json())
        .then(data => {
            markdownPreview.innerHTML = data.html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});