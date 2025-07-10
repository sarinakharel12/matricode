
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDmVCNtXOn4hIC3cERam4PUrTYSLKYjwc0",
  authDomain: "matricodeauth.firebaseapp.com",
  projectId: "matricodeauth",
  storageBucket: "matricodeauth.firebasestorage.app",
  messagingSenderId: "90165101312",
  appId: "1:90165101312:web:aac8312f717ffc195569e5"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const journalList = document.getElementById("journalList");

window.showForm = function () {
  document.getElementById("formSection").style.display = "block";
}

window.hideForm = function () {
  document.getElementById("formSection").style.display = "none";
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("author").value = "";
}

window.submitJournal = async function () {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const author = document.getElementById("author").value.trim() || "Anonymous";

  if (!title || !content) {
    alert("Please enter both title and content.");
    return;
  }

  try {
    await addDoc(collection(db, "journals"), {
      title,
      content,
      author,
      timestamp: Date.now()
    });

    alert("Journal submitted!");
    hideForm();
    loadJournals();
  } catch (error) {
    console.error("Error submitting journal:", error);
    alert("Failed to submit journal.");
  }
};

async function loadJournals() {
  journalList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "journals"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const entry = document.createElement("div");
    entry.className = "journal-entry";
    entry.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <div class="author">- ${data.author}</div>
    `;
    journalList.appendChild(entry);
  });
}

loadJournals();
