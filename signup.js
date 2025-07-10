import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmVCNtXOn4hIC3cERam4PUrTYSLKYjwc0",
  authDomain: "matricodeauth.firebaseapp.com",
  projectId: "matricodeauth",
  storageBucket: "matricodeauth.firebasestorage.app",
  messagingSenderId: "90165101312",
  appId: "1:90165101312:web:aac8312f717ffc195569e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signupBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("userEmail", user.email);
    alert("Signup successful!");
    window.location.href = "home.html"; 
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
});
