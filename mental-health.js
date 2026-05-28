// ===== OUR DATA: Array of resource objects =====
const resources = [
    {
        name: "Crisis Text Line",
        type: "crisis support",
        description: "Free, confidential text-based crisis support. Text HOME to 741741 anytime.",
        website: "https://www.crisistextline.org"
    },
    {
        name: "Headspace",
        type: "meditation & mindfulness",
        description: "Guided meditation and mindfulness exercises. Great for anxiety and sleep.",
        website: "https://www.headspace.com"
    },
    {
        name: "BetterHelp",
        type: "online therapy",
        description: "Connect with licensed therapists online. Affordable and flexible scheduling.",
        website: "https://www.betterhelp.com"
    },
    {
        name: "National Suicide Prevention Lifeline",
        type: "crisis support",
        description: "Call 988 to talk to someone who cares. Available 24/7, free and confidential.",
        website: "https://988lifeline.org"
    },
    {
        name: "Calm",
        type: "meditation & mindfulness",
        description: "Sleep stories, meditations, and relaxation music. Perfect before bed.",
        website: "https://www.calm.com"
    },
    {
        name: "Philippine Mental Health Association (PMHA) - Cebu Chapter",
        type: "therapy, prevention, and promotion of mental health",
        description: "A non-profit non-sectarian organization, located in Cebu City, dedicated to the promotion of mental health and prevention of mental disorders.",
        website: "https://www.facebook.com/pmhacebu/"
    }
];

function copyToClipboard(site){
    navigator.clipboard.writeText(site);
    alert("Copied to clipboard!");
}

let currentView;
let currentDisplay;

// ===== FUNCTION: Display resources on the page =====
function displayResources(resourcesToShow) {

    currentDisplay = resourcesToShow;
    // Get the container where we want to put the resources
    const container = document.getElementById("resourcesContainer");

    // Clear whatever was there before
    container.innerHTML = " ";

    // Check if we have resources to show
    if (resourcesToShow.length === 0){
        container.innerHTML = `
            <p class="no-results">No resources to show</p>
        `
    }

    // LOOP through each resource and create HTML for it
    resourcesToShow.forEach(resource => {
        // Create a new div for this resource card
        const card = document.createElement("div");

        let favorites = getFavorites();
        const isSaved = favorites.includes(resource.name);

        const btnText = isSaved ? "Remove" : "Save"
        
        // Put the resource info inside the card
        card.innerHTML = `
            <h3>${resource.name}</h3>
            <span class="resource-type">${resource.type}</span>
            <p class="resource-description">${resource.description}</p>
            <a href="${resource.website}" target="_blank" class="resource-link">Visit Website →</a>
            <button class="copyLink-btn" onclick="copyToClipboard('${resource.website}')">Copy link</button>
            <button class="fav-btn" onclick="toggleFavorites('${resource.name}')">${btnText}</button>
        `;
        
        // Add this card to the container
        container.appendChild(card);
    });
}

// ===== DISPLAY ALL RESOURCES WHEN PAGE LOADS =====
displayResources(resources);

// ===== EVENT LISTENER: When user types in search box =====
document.getElementById("searchInput").addEventListener("input", function(event) {
    // Get what the user typed
    const searchTerm = event.target.value.toLowerCase();

    // TODO: Filter the resources array based on searchTerm
    let filteredRes = resources.filter((resource) => 
        resource.name.toLowerCase().trim().includes(searchTerm) || resource.type.toLowerCase().trim().includes(searchTerm)
    );
    // Then display only the filtered results
    // For now, let's display all resources (you'll change this!)
    displayResources(filteredRes);
});

// GET FAVORITES 
function getFavorites(){
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

// SAVE FAVORITES
function saveFavorites(arr){
    const saved = JSON.stringify(arr);

    localStorage.setItem('favorites', saved);
}

// TOGGLe FAVORITES
function toggleFavorites(resourceName){
    //get obj contains all favs
    let favorites = getFavorites();

    // check if name in list or not yet
    if (favorites.includes(resourceName)){
        favorites = favorites.filter(
            (favorite) => favorite !== resourceName
        )
    } else {
        favorites.push(resourceName)
    }

    // save to storage
    saveFavorites(favorites);

    // check view then determine visibility/display of card/resource
    if (currentView){
        seeFavorites();
    } else {
        displayResources(currentDisplay);
    }
}

// SEE FAVORITES

function seeFavorites(){
    currentView = true;
    let favorites = getFavorites();

    let favoriteRes = resources.filter(
        (resource) => favorites.includes(resource.name)
    )

    displayResources(favoriteRes);

    document.querySelector('.favBtn').style.display = "none"
    document.querySelector('.homeBtn').style.display = "block"
}

// HOME
function backToHome(resourcesToShow){
    currentView = false;
    displayResources(resourcesToShow);

    document.querySelector('.homeBtn').style.display = "none"
    document.querySelector('.favBtn').style.display = "block"
}