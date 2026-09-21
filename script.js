/* =========================================================
   GLOBALSTUDENT HUB
   MVP FRONT-END LOGIC
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeHousing();
  initializeRoommates();
  initializeCommunity();
  initializeEvents();
  initializeMessaging();
  initializeProfile();
  initializeQuickQuestions();
  initializeSavedItems();
  openInitialPage();
});


/* =========================================================
   1. NAVIGATION
   ========================================================= */

function initializeNavigation() {
  const navigationButtons = document.querySelectorAll("[data-page]");

  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const pageName = button.dataset.page;

      if (pageName) {
        showPage(pageName);
      }
    });
  });
}


function showPage(pageName) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(`page-${pageName}`);

  if (!selectedPage) {
    console.warn(`Page "${pageName}" was not found.`);
    return;
  }

  selectedPage.classList.add("active");

  updateActiveNavigation(pageName);

  window.location.hash = pageName;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


function updateActiveNavigation(pageName) {
  const navButtons = document.querySelectorAll(
    ".nav-link, .mobile-nav button"
  );

  navButtons.forEach((button) => {
    button.classList.remove("active");
  });

  document
    .querySelectorAll(`[data-page="${pageName}"]`)
    .forEach((button) => {
      button.classList.add("active");
    });
}


function openInitialPage() {
  const hash = window.location.hash.replace("#", "");

  if (hash && document.getElementById(`page-${hash}`)) {
    showPage(hash);
  } else {
    showPage("home");
  }
}


window.addEventListener("hashchange", () => {
  const pageName = window.location.hash.replace("#", "");

  if (pageName && document.getElementById(`page-${pageName}`)) {
    showPage(pageName);
  }
});


/* =========================================================
   2. LOCAL STORAGE HELPERS
   ========================================================= */

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


function getData(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    return fallback;
  }
}


/* =========================================================
   3. NOTIFICATIONS
   ========================================================= */

function showNotification(message, type = "success") {
  const oldNotification =
    document.querySelector(".globalstudent-notification");

  if (oldNotification) {
    oldNotification.remove();
  }

  const notification = document.createElement("div");

  notification.className =
    "globalstudent-notification";

  notification.textContent = message;

  notification.style.position = "fixed";
  notification.style.top = "90px";
  notification.style.right = "25px";
  notification.style.zIndex = "9999";
  notification.style.padding = "14px 18px";
  notification.style.borderRadius = "14px";
  notification.style.fontWeight = "700";
  notification.style.fontSize = "14px";
  notification.style.boxShadow =
    "0 10px 30px rgba(0,0,0,.15)";
  notification.style.transition = "all .3s ease";

  if (type === "error") {
    notification.style.background = "#fff1f1";
    notification.style.color = "#c33b3b";
  } else {
    notification.style.background = "#ffffff";
    notification.style.color = "#5b5ce2";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform =
      "translateY(-10px)";

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2500);
}


/* =========================================================
   4. HOUSING
   ========================================================= */

function initializeHousing() {
  const housingPage =
    document.getElementById("page-housing");

  if (!housingPage) return;

  const searchInput =
    housingPage.querySelector('input[type="text"]');

  const selects =
    housingPage.querySelectorAll("select");

  const searchButton =
    [...housingPage.querySelectorAll("button")]
      .find(
        (button) =>
          button.textContent.trim().toLowerCase() ===
          "search"
      );

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      filterHousing();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterHousing();
    });
  }

  selects.forEach((select) => {
    select.addEventListener("change", () => {
      filterHousing();
    });
  });

  const housingCards =
    housingPage.querySelectorAll(".card");

  housingCards.forEach((card, index) => {
    setupHousingCard(card, index);
  });
}


function filterHousing() {
  const housingPage =
    document.getElementById("page-housing");

  if (!housingPage) return;

  const searchInput =
    housingPage.querySelector('input[type="text"]');

  const query =
    searchInput?.value
      .trim()
      .toLowerCase() || "";

  const cards =
    housingPage.querySelectorAll(".card");

  cards.forEach((card) => {
    const text =
      card.textContent.toLowerCase();

    const matchesSearch =
      !query || text.includes(query);

    card.style.display =
      matchesSearch ? "" : "none";
  });
}


function setupHousingCard(card, index) {
  const heart =
    [...card.querySelectorAll("span")]
      .find((span) =>
        span.textContent.includes("♡")
      );

  if (heart) {
    heart.style.cursor = "pointer";

    heart.addEventListener("click", () => {
      toggleSavedHousing(card, heart, index);
    });
  }

  const viewButton =
    [...card.querySelectorAll("button")]
      .find((button) =>
        button.textContent
          .toLowerCase()
          .includes("view apartment")
      );

  if (viewButton) {
    viewButton.addEventListener("click", () => {
      openApartmentModal(card);
    });
  }
}


function toggleSavedHousing(card, heart, index) {
  let savedHousing =
    getData("globalstudent_saved_housing", []);

  const title =
    card.querySelector("h3")?.textContent ||
    `Apartment ${index + 1}`;

  const alreadySaved =
    savedHousing.includes(title);

  if (alreadySaved) {
    savedHousing =
      savedHousing.filter(
        (item) => item !== title
      );

    heart.textContent = "♡";

    showNotification(
      `${title} removed from saved listings.`
    );
  } else {
    savedHousing.push(title);

    heart.textContent = "♥";

    showNotification(
      `${title} saved!`
    );
  }

  saveData(
    "globalstudent_saved_housing",
    savedHousing
  );
}


function initializeSavedItems() {
  const savedHousing =
    getData("globalstudent_saved_housing", []);

  const housingPage =
    document.getElementById("page-housing");

  if (!housingPage) return;

  housingPage
    .querySelectorAll(".card")
    .forEach((card) => {
      const title =
        card.querySelector("h3")?.textContent;

      const heart =
        [...card.querySelectorAll("span")]
          .find((span) =>
            ["♡", "♥"].includes(
              span.textContent.trim()
            )
          );

      if (
        title &&
        heart &&
        savedHousing.includes(title)
      ) {
        heart.textContent = "♥";
      }
    });
}


function openApartmentModal(card) {
  const existing =
    document.getElementById(
      "apartment-modal"
    );

  if (existing) {
    existing.remove();
  }

  const title =
    card.querySelector("h3")?.textContent ||
    "Student Apartment";

  const price =
    card.querySelector(".price")?.textContent ||
    "";

  const paragraphs =
    [...card.querySelectorAll("p")]
      .map((p) => p.textContent.trim());

  const modal =
    document.createElement("div");

  modal.id = "apartment-modal";

  modal.innerHTML = `
    <div class="apartment-modal-content">

      <button
        id="closeApartmentModal"
        class="apartment-modal-close"
      >
        ×
      </button>

      <h2>${title}</h2>

      <p>${paragraphs[0] || ""}</p>

      <h3 style="margin:15px 0">
        ${price}
      </h3>

      <div style="
        background:#f7f8fc;
        padding:18px;
        border-radius:16px;
        margin:18px 0;
      ">

        <strong>
          🛡 Safety & Verification
        </strong>

        <p style="margin-top:8px">
          ✓ Property information checked
        </p>

        <p>
          ✓ Landlord identity verified
        </p>

        <p>
          ✓ Student-friendly listing
        </p>

      </div>

      <h3>
        Potential Roommates for This Apartment
      </h3>

      <div style="
        margin-top:14px;
        line-height:2;
      ">
        <div>👩 Amina — <strong>94% compatible</strong></div>
        <div>👨 Daniel — <strong>89% compatible</strong></div>
        <div>👩 Sara — <strong>84% compatible</strong></div>
      </div>

      <div style="
        display:flex;
        gap:10px;
        margin-top:20px;
        flex-wrap:wrap;
      ">

        <button
          id="apartmentRoommates"
          class="btn btn-primary"
        >
          View Roommates
        </button>

        <button
          id="saveApartmentModal"
          class="btn btn-outline"
        >
          Save Apartment
        </button>

      </div>

    </div>
  `;

  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background =
    "rgba(20,20,35,.55)";
  modal.style.zIndex = "9998";
  modal.style.display = "grid";
  modal.style.placeItems = "center";
  modal.style.padding = "20px";

  const content =
    modal.querySelector(
      ".apartment-modal-content"
    );

  content.style.background = "white";
  content.style.width =
    "min(600px, 100%)";
  content.style.maxHeight = "90vh";
  content.style.overflowY = "auto";
  content.style.borderRadius = "25px";
  content.style.padding = "28px";
  content.style.position = "relative";

  const close =
    modal.querySelector(
      ".apartment-modal-close"
    );

  close.style.position = "absolute";
  close.style.right = "18px";
  close.style.top = "14px";
  close.style.border = "0";
  close.style.background = "transparent";
  close.style.fontSize = "30px";
  close.style.cursor = "pointer";

  document.body.appendChild(modal);

  document
    .getElementById("closeApartmentModal")
    .addEventListener("click", () => {
      modal.remove();
    });

  document
    .getElementById("apartmentRoommates")
    .addEventListener("click", () => {
      modal.remove();
      showPage("roommates");
    });

  document
    .getElementById("saveApartmentModal")
    .addEventListener("click", () => {
      showNotification(
        `${title} saved to your housing list.`
      );
    });

  modal.addEventListener(
    "click",
    (event) => {
      if (event.target === modal) {
        modal.remove();
      }
    }
  );
}


/* =========================================================
   5. ROOMMATE MATCHING
   ========================================================= */

function initializeRoommates() {
  const page =
    document.getElementById(
      "page-roommates"
    );

  if (!page) return;

  const cards =
    page.querySelectorAll(
      ".roommate-card"
    );

  cards.forEach((card) => {
    const buttons =
      card.querySelectorAll("button");

    buttons.forEach((button) => {
      const text =
        button.textContent
          .trim()
          .toLowerCase();

      if (text.includes("like")) {
        button.addEventListener(
          "click",
          () =>
            likeRoommate(card, button)
        );
      }

      if (text.includes("pass")) {
        button.addEventListener(
          "click",
          () => passRoommate(card)
        );
      }

      if (
        text.includes("view profile")
      ) {
        button.addEventListener(
          "click",
          () =>
            openRoommateProfile(card)
        );
      }
    });
  });

  const filters =
    page.querySelectorAll("select");

  filters.forEach((filter) => {
    filter.addEventListener(
      "change",
      filterRoommates
    );
  });
}


function likeRoommate(card, button) {
  const name =
    card.querySelector("h3")
      ?.textContent || "Student";

  const liked =
    button.dataset.liked === "true";

  if (liked) {
    button.dataset.liked = "false";
    button.textContent = "♡ Like";

    showNotification(
      `${name} removed from your matches.`
    );
  } else {
    button.dataset.liked = "true";
    button.textContent = "♥ Liked";

    showNotification(
      `${name} added to your matches!`
    );
  }
}


function passRoommate(card) {
  card.style.transition =
    "all .3s ease";

  card.style.opacity = "0";
  card.style.transform =
    "translateX(-30px)";

  setTimeout(() => {
    card.style.display = "none";
  }, 300);
}


function filterRoommates() {
  const page =
    document.getElementById(
      "page-roommates"
    );

  if (!page) return;

  const selects =
    [...page.querySelectorAll("select")];

  const selectedValues =
    selects
      .map((select) =>
        select.value
          .trim()
          .toLowerCase()
      )
      .filter(
        (value) =>
          !value.includes("all ") &&
          !value.includes("any ") &&
          value !== "sleep schedule" &&
          value !==
            "smoking preference"
      );

  const cards =
    page.querySelectorAll(
      ".roommate-card"
    );

  cards.forEach((card) => {
    const text =
      card.textContent.toLowerCase();

    const matches =
      selectedValues.every(
        (value) =>
          text.includes(value) ||
          value === ""
      );

    card.style.display =
      matches ? "" : "none";
  });
}


function openRoommateProfile(card) {
  const name =
    card.querySelector("h3")
      ?.textContent || "Student";

  const score =
    card.querySelector(
      ".compatibility"
    )?.textContent || "";

  const description =
    [...card.querySelectorAll("p")]
      .map((p) => p.textContent)
      .join(" · ");

  const matchItems =
    [...card.querySelectorAll(
      ".match-list div"
    )]
      .map(
        (item) =>
          `<p>${item.textContent}</p>`
      )
      .join("");

  const modal =
    document.createElement("div");

  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background =
    "rgba(20,20,35,.55)";
  modal.style.zIndex = "9999";
  modal.style.display = "grid";
  modal.style.placeItems = "center";
  modal.style.padding = "20px";

  modal.innerHTML = `
    <div style="
      background:white;
      padding:30px;
      width:min(500px,100%);
      border-radius:24px;
      position:relative;
    ">

      <button
        class="close-roommate"
        style="
          position:absolute;
          top:15px;
          right:18px;
          border:0;
          background:none;
          font-size:28px;
          cursor:pointer;
        "
      >
        ×
      </button>

      <div style="
        font-size:14px;
        color:#737789;
      ">
        Roommate Match
      </div>

      <h2 style="margin-top:5px">
        ${name}
      </h2>

      <div style="
        font-size:28px;
        font-weight:900;
        color:#16a56b;
        margin:10px 0;
      ">
        ${score} Compatible
      </div>

      <p>${description}</p>

      <div style="
        margin:20px 0;
        line-height:1.8;
      ">
        ${matchItems}
      </div>

      <button
        class="btn btn-primary roommate-message"
      >
        Message ${name}
      </button>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector(
      ".close-roommate"
    )
    .addEventListener(
      "click",
      () => modal.remove()
    );

  modal
    .querySelector(
      ".roommate-message"
    )
    .addEventListener(
      "click",
      () => {
        modal.remove();
        showPage("messages");
      }
    );
}


/* =========================================================
   6. COMMUNITY
   ========================================================= */

function initializeCommunity() {
  const page =
    document.getElementById(
      "page-community"
    );

  if (!page) return;

  const createPostButton =
    [...page.querySelectorAll("button")]
      .find((button) =>
        button.textContent
          .toLowerCase()
          .includes("create post")
      );

  if (createPostButton) {
    createPostButton.addEventListener(
      "click",
      openCreatePost
    );
  }

  setupCommunityLikes();

  const categories =
    page.querySelectorAll(".badge");

  categories.forEach((category) => {
    category.style.cursor = "pointer";

    category.addEventListener(
      "click",
      () => {
        categories.forEach(
          (item) =>
            item.classList.remove(
              "badge-blue"
            )
        );

        category.classList.add(
          "badge-blue"
        );

        showNotification(
          `Showing: ${category.textContent.trim()}`
        );
      }
    );
  });
}


function setupCommunityLikes() {
  document
    .querySelectorAll(
      "#page-community .post"
    )
    .forEach((post) => {
      const like =
        [...post.querySelectorAll(
          ".post-meta span"
        )]
          .find((span) =>
            span.textContent
              .trim()
              .startsWith("♡")
          );

      if (!like) return;

      like.style.cursor = "pointer";

      like.addEventListener(
        "click",
        () => {
          const number =
            parseInt(
              like.textContent.match(
                /\d+/
              )?.[0] || "0"
            );

          const liked =
            like.dataset.liked ===
            "true";

          if (liked) {
            like.dataset.liked =
              "false";

            like.textContent =
              `♡ ${Math.max(
                0,
                number - 1
              )}`;
          } else {
            like.dataset.liked =
              "true";

            like.textContent =
              `♥ ${number + 1}`;
          }
        }
      );
    });
}


function openCreatePost() {
  const text =
    prompt(
      "What would you like to share with the GlobalStudent community?"
    );

  if (!text || !text.trim()) {
    return;
  }

  const communityGrid =
    document.querySelector(
      "#page-community .grid-2"
    );

  if (!communityGrid) return;

  const post =
    document.createElement(
      "article"
    );

  post.className = "card post";

  post.innerHTML = `
    <div class="post-author">

      <div
        class="small-avatar"
        style="
          display:grid;
          place-items:center;
          background:#5b5ce2;
          color:white;
          font-weight:800;
        "
      >
        Y
      </div>

      <div>
        <strong>Yasmin Aipanova</strong>
        <p>Just now</p>
      </div>

    </div>

    <p class="post-text">
      ${escapeHTML(text)}
    </p>

    <div class="post-meta">
      <span style="cursor:pointer">
        ♡ 0
      </span>

      <span>
        💬 0 comments
      </span>
    </div>
  `;

  communityGrid.prepend(post);

  setupCommunityLikes();

  showNotification(
    "Your post was published!"
  );
}


function escapeHTML(text) {
  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


/* =========================================================
   7. EVENTS
   ========================================================= */

function initializeEvents() {
  const eventCards =
    document.querySelectorAll(
      "#page-events .event-card"
    );

  eventCards.forEach((card) => {
    const eventName =
      card.querySelector("h3")
        ?.textContent ||
      "Student Event";

    const buttons =
      card.querySelectorAll("button");

    buttons.forEach((button) => {
      const text =
        button.textContent
          .trim()
          .toLowerCase();

      if (
        text.includes("join event")
      ) {
        button.addEventListener(
          "click",
          () => {
            const joined =
              button.dataset.joined ===
              "true";

            if (joined) {
              button.dataset.joined =
                "false";

              button.textContent =
                "Join Event";

              showNotification(
                `You left ${eventName}.`
              );
            } else {
              button.dataset.joined =
                "true";

              button.textContent =
                "✓ Joined";

              showNotification(
                `You're going to ${eventName}!`
              );
            }
          }
        );
      }

      if (text === "save") {
        button.addEventListener(
          "click",
          () => {
            const saved =
              button.dataset.saved ===
              "true";

            if (saved) {
              button.dataset.saved =
                "false";

              button.textContent =
                "Save";
            } else {
              button.dataset.saved =
                "true";

              button.textContent =
                "✓ Saved";

              showNotification(
                `${eventName} saved.`
              );
            }
          }
        );
      }
    });
  });
}


/* =========================================================
   8. MESSAGING
   ========================================================= */

function initializeMessaging() {
  const input =
    document.getElementById(
      "messageInput"
    );

  if (!input) return;

  input.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    }
  );

  const conversations =
    document.querySelectorAll(
      ".conversation"
    );

  conversations.forEach(
    (conversation) => {
      conversation.addEventListener(
        "click",
        () => {
          conversations.forEach(
            (item) =>
              item.classList.remove(
                "active"
              )
          );

          conversation.classList.add(
            "active"
          );

          const name =
            conversation.querySelector(
              "strong"
            )?.textContent;

          const chatHeader =
            document.querySelector(
              ".chat-header"
            );

          if (
            name &&
            chatHeader
          ) {
            chatHeader.textContent =
              name;
          }
        }
      );
    }
  );
}


function sendMessage() {
  const input =
    document.getElementById(
      "messageInput"
    );

  const chatBody =
    document.querySelector(
      ".chat-body"
    );

  if (!input || !chatBody) {
    return;
  }

  const message =
    input.value.trim();

  if (!message) {
    return;
  }

  const bubble =
    document.createElement("div");

  bubble.className =
    "bubble mine";

  bubble.textContent = message;

  chatBody.appendChild(bubble);

  input.value = "";

  chatBody.scrollTop =
    chatBody.scrollHeight;

  setTimeout(() => {
    createAutomaticReply();
  }, 900);
}


window.sendMessage = sendMessage;


function createAutomaticReply() {
  const chatBody =
    document.querySelector(
      ".chat-body"
    );

  if (!chatBody) return;

  const replies = [
    "That sounds good to me 😊",
    "Yes! I think our lifestyles are pretty compatible.",
    "I'm also looking for a place close to the university.",
    "Great! Maybe we can check some apartments together.",
  ];

  const reply =
    replies[
      Math.floor(
        Math.random() *
          replies.length
      )
    ];

  const bubble =
    document.createElement("
