/* =========================================
   GLOBALSTUDENT HUB — JAVASCRIPT
   ========================================= */

/* ---------- BASIC DATA ---------- */

const state = {
    currentPage: "home",
    savedHousing: [],
    likedRoommates: [],
    passedRoommates: [],
    messages: [],
    profileProgress: 75
};


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    state.currentPage = pageName;

    /* Desktop navigation */

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === pageName) {
            item.classList.add("active");
        }
    });

    /* Mobile navigation */

    document.querySelectorAll(".mobile-nav-item").forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === pageName) {
            item.classList.add("active");
        }
    });

    /* Change topbar title */

    const titles = {
        home: "Home",
        housing: "Find Housing",
        roommates: "Find Roommates",
        community: "Community",
        events: "Events",
        guides: "Astana Guides",
        messages: "Messages",
        profile: "My Profile",
        saved: "Saved"
    };

    const titleElement = document.querySelector(".topbar-title");

    if (titleElement) {
        titleElement.textContent = titles[pageName] || "GlobalStudent Hub";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   NAVIGATION CLICK EVENTS
   ========================================= */

document.addEventListener("click", function(event) {

    const navItem = event.target.closest("[data-page]");

    if (navItem) {

        const page = navItem.dataset.page;

        if (page) {
            showPage(page);
        }
    }

});


/* =========================================
   HERO BUTTONS
   ========================================= */

document.addEventListener("click", function(event) {

    const button = event.target.closest("[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    if (action === "housing") {
        showPage("housing");
    }

    if (action === "roommates") {
        showPage("roommates");
    }

    if (action === "community") {
        showPage("community");
    }

    if (action === "events") {
        showPage("events");
    }

    if (action === "profile") {
        showPage("profile");
    }

});


/* =========================================
   TOAST NOTIFICATION
   ========================================= */

function showToast(message) {

    const existingToast = document.querySelector(".toast");

    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);
}


/* =========================================
   SAVE HOUSING
   ========================================= */

document.addEventListener("click", function(event) {

    const favoriteButton = event.target.closest(".favorite-button");

    if (!favoriteButton) return;

    const housingCard = favoriteButton.closest(".housing-card");

    if (!housingCard) return;

    const titleElement = housingCard.querySelector(".housing-title");

    if (!titleElement) return;

    const title = titleElement.textContent.trim();

    const index = state.savedHousing.indexOf(title);

    if (index === -1) {

        state.savedHousing.push(title);

        favoriteButton.textContent = "♥";

        showToast("Apartment saved ❤️");

    } else {

        state.savedHousing.splice(index, 1);

        favoriteButton.textContent = "♡";

        showToast("Apartment removed from saved");

    }

});


/* =========================================
   ROOMMATE LIKE / PASS
   ========================================= */

document.addEventListener("click", function(event) {

    const button = event.target.closest("[data-roommate-action]");

    if (!button) return;

    const card = button.closest(".roommate-card");

    if (!card) return;

    const nameElement = card.querySelector(".roommate-name");

    if (!nameElement) return;

    const name = nameElement.textContent.trim();

    const action = button.dataset.roommateAction;

    if (action === "like") {

        if (!state.likedRoommates.includes(name)) {
            state.likedRoommates.push(name);
        }

        button.textContent = "Liked ✓";

        button.classList.add("btn-secondary");

        showToast(`${name} was added to your matches`);

    }

    if (action === "pass") {

        if (!state.passedRoommates.includes(name)) {
            state.passedRoommates.push(name);
        }

        card.style.opacity = "0.45";

        showToast("Profile passed");

    }

});


/* =========================================
   MESSAGE BUTTON
   ========================================= */

document.addEventListener("click", function(event) {

    const button = event.target.closest("[data-message]");

    if (!button) return;

    const name = button.dataset.message;

    showPage("messages");

    showToast(`You can now message ${name}`);

});


/* =========================================
   SEARCH HOUSING
   ========================================= */

const housingSearch = document.querySelector("#housingSearch");

if (housingSearch) {

    housingSearch.addEventListener("input", function() {

        const searchValue = this.value.toLowerCase().trim();

        const cards = document.querySelectorAll(
            "#housing .housing-card"
        );

        cards.forEach(card => {

            const text = card.textContent.toLowerCase();

            if (text.includes(searchValue)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =========================================
   GENERIC SEARCH
   ========================================= */

document.addEventListener("input", function(event) {

    if (!event.target.matches("[data-search]")) return;

    const searchValue = event.target.value.toLowerCase().trim();

    const targetSelector = event.target.dataset.search;

    const items = document.querySelectorAll(targetSelector);

    items.forEach(item => {

        const text = item.textContent.toLowerCase();

        item.style.display =
            text.includes(searchValue) ? "" : "none";

    });

});


/* =========================================
   FILTERS
   ========================================= */

document.addEventListener("change", function(event) {

    const filter = event.target.closest("[data-filter]");

    if (!filter) return;

    const filterType = filter.dataset.filter;

    const value = filter.value.toLowerCase();

    const cards = document.querySelectorAll(
        `[data-filter-item="${filterType}"]`
    );

    cards.forEach(card => {

        const cardValue =
            card.dataset.filterValue?.toLowerCase() || "";

        if (!value || value === "all") {

            card.style.display = "";

        } else if (cardValue.includes(value)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


/* =========================================
   VERIFIED ONLY FILTER
   ========================================= */

document.addEventListener("change", function(event) {

    if (!event.target.matches("#verifiedOnly")) return;

    const checked = event.target.checked;

    const cards = document.querySelectorAll(
        "#housing .housing-card"
    );

    cards.forEach(card => {

        const verified =
            card.querySelector(".verified");

        if (!checked) {

            card.style.display = "";

            return;
        }

        card.style.display =
            verified ? "" : "none";

    });

});


/* =========================================
   EVENT JOIN BUTTON
   ========================================= */

document.addEventListener("click", function(event) {

    const button = event.target.closest("[data-event-join]");

    if (!button) return;

    const eventName =
        button.dataset.eventJoin;

    if (button.classList.contains("joined")) {

        button.classList.remove("joined");

        button.textContent = "Join";

        showToast("You left the event");

    } else {

        button.classList.add("joined");

        button.textContent = "Joined ✓";

        showToast(`You're going to ${eventName} 🎉`);

    }

});


/* =========================================
   COMMUNITY LIKE
   ========================================= */

document.addEventListener("click", function(event) {

    const button = event.target.closest("[data-like-post]");

    if (!button) return;

    const countElement =
        button.querySelector(".like-count");

    if (!countElement) return;

    let count =
        parseInt(countElement.textContent) || 0;

    if (button.classList.contains("liked")) {

        count--;

        button.classList.remove("liked");

    } else {

        count++;

        button.classList.add("liked");

    }

    countElement.textContent = count;

});


/* =========================================
   PROFILE PROGRESS
   ========================================= */

function updateProfileProgress() {

    const progressBars =
        document.querySelectorAll(".progress-fill");

    progressBars.forEach(bar => {

        bar.style.width =
            `${state.profileProgress}%`;

    });

    const progressNumbers =
        document.querySelectorAll("[data-progress-number]");

    progressNumbers.forEach(number => {

        number.textContent =
            `${state.profileProgress}%`;

    });

}


/* =========================================
   PROFILE COMPLETION
   ========================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("[data-complete-profile]");

    if (!button) return;

    state.profileProgress = 100;

    updateProfileProgress();

    button.textContent = "Profile completed ✓";

    button.disabled = true;

    showToast("Your profile is complete 🎉");

});


/* =========================================
   QUICK ACTIONS
   ========================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest(".quick-action");

    if (!button) return;

    const page =
        button.dataset.page;

    if (page) {
        showPage(page);
    }

});


/* =========================================
   CREATE COMMUNITY POST
   ========================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("#createPostButton");

    if (!button) return;

    const input =
        document.querySelector("#postInput");

    if (!input) return;

    const text =
        input.value.trim();

    if (!text) {

        showToast("Write something first");

        return;
    }

    const feed =
        document.querySelector("#communityFeed");

    if (!feed) return;

    const post =
        document.createElement("div");

    post.className = "card post-card";

    post.innerHTML = `
        <div class="post-header">
            <img
                class="post-avatar"
                src="https://i.pravatar.cc/100?img=47"
                alt="Yasmin"
            >

            <div>
                <div class="post-author">
                    Yasmin Aipanova
                </div>

                <div class="post-time">
                    Just now
                </div>
            </div>
        </div>

        <div class="post-content">
            ${escapeHTML(text)}
        </div>

        <div class="post-actions">

            <span
                class="post-action"
                data-like-post
            >
                ♡
                <span class="like-count">0</span>
            </span>

            <span class="post-action">
                💬 Comment
            </span>

            <span class="post-action">
                ↗ Share
            </span>

        </div>
    `;

    feed.prepend(post);

    input.value = "";

    showToast("Post published ✓");

});


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   CHAT
   ========================================= */

document.addEventListener("click", function(event) {

    const conversation =
        event.target.closest(".conversation");

    if (!conversation) return;

    document.querySelectorAll(".conversation")
        .forEach(item => {
            item.classList.remove("active");
        });

    conversation.classList.add("active");

    const name =
        conversation.querySelector(
            ".conversation-name"
        );

    const chatName =
        document.querySelector("#chatName");

    if (name && chatName) {
        chatName.textContent =
            name.textContent;
    }

});


/* =========================================
   SEND MESSAGE
   ========================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("#sendMessage");

    if (!button) return;

    sendMessage();

});


document.addEventListener("keydown", function(event) {

    if (
        event.target.matches("#messageInput") &&
        event.key === "Enter"
    ) {

        event.preventDefault();

        sendMessage();

    }

});


function sendMessage() {

    const input =
        document.querySelector("#messageInput");

    const messages =
        document.querySelector("#chatMessages");

    if (!input || !messages) return;

    const text =
        input.value.trim();

    if (!text) return;

    const message =
        document.createElement("div");

    message.className =
        "message sent";

    message.textContent =
        text;

    messages.appendChild(message);

    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;

    state.messages.push(text);

    setTimeout(() => {

        const reply =
            document.createElement("div");

        reply.className =
            "message received";

        reply.textContent =
            "Thanks! I'll get back to you soon 😊";

        messages.appendChild(reply);

        messages.scrollTop =
            messages.scrollHeight;

    }, 900);

}


/* =========================================
   GUIDE CARD
   ========================================= */

document.addEventListener("click", function(event) {

    const guide =
        event.target.closest("[data-guide]");

    if (!guide) return;

    const guideName =
        guide.dataset.guide;

    showToast(`Opening ${guideName} guide`);

});


/* =========================================
   SAVED PAGE
   ========================================= */

function renderSavedHousing() {

    const container =
        document.querySelector("#savedHousing");

    if (!container) return;

    if (state.savedHousing.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ♡
                </div>

                <h3>
                    No saved apartments yet
                </h3>

                <p>
                    Save apartments you like and
                    find them here later.
                </p>

            </div>
        `;

        return;
    }

    container.innerHTML = "";

    state.savedHousing.forEach(title => {

        const item =
            document.createElement("div");

        item.className = "card card-body";

        item.innerHTML = `
            <div class="card-title">
                ${escapeHTML(title)}
            </div>

            <div class="card-subtitle">
                Saved apartment
            </div>
        `;

        container.appendChild(item);

    });

}


/* =========================================
   REFRESH SAVED PAGE
   ========================================= */

document.addEventListener("click", function(event) {

    const savedButton =
        event.target.closest("[data-page='saved']");

    if (!savedButton) return;

    renderSavedHousing();

});


/* =========================================
   MOBILE MENU
   ========================================= */

const mobileMenuButton =
    document.querySelector("#mobileMenuButton");

const mobileOverlay =
    document.querySelector(".mobile-overlay");

if (mobileMenuButton && mobileOverlay) {

    mobileMenuButton.addEventListener(
        "click",
        function() {

            mobileOverlay.classList.toggle("active");

        }
    );

}


/* =========================================
   CLOSE MOBILE MENU
   ========================================= */

document.addEventListener("click", function(event) {

    if (
        event.target.matches(".mobile-overlay")
    ) {

        event.target.classList.remove("active");

    }

});


/* =========================================
   FAVORITE BUTTON ANIMATION
   ========================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest(".favorite-button");

    if (!button) return;

    button.style.transform = "scale(1.2)";

    setTimeout(() => {

        button.style.transform = "";

    }, 180);

});


/* =========================================
   SIMPLE MODAL
   ========================================= */

function openModal(title, content) {

    const oldModal =
        document.querySelector(".custom-modal");

    if (oldModal) {
        oldModal.remove();
    }

    const modal =
        document.createElement("div");

    modal.className = "custom-modal";

    modal.innerHTML = `
        <div class="modal-overlay">

            <div class="modal-box">

                <button
                    class="modal-close"
                    aria-label="Close"
                >
                    ×
                </button>

                <h2>
                    ${escapeHTML(title)}
                </h2>

                <div class="modal-content">
                    ${content}
                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    modal
        .querySelector(".modal-close")
        .addEventListener("click", () => {
            modal.remove();
        });

    modal
        .querySelector(".modal-overlay")
        .addEventListener("click", event => {

            if (
                event.target.classList.contains(
                    "modal-overlay"
                )
            ) {
                modal.remove();
            }

        });

}


/* =========================================
   INITIALIZE
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

        updateProfileProgress();

        console.log(
            "GlobalStudent Hub loaded successfully 🚀"
        );

    }
);
