// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDJDj1gI4K9lxh9hK-jdjBZk3HdV2q_29s",
  authDomain: "uplyft-chatbot-ad599.firebaseapp.com",
  projectId: "uplyft-chatbot-ad599",
  storageBucket: "uplyft-chatbot-ad599.firebasestorage.app",
  messagingSenderId: "212216394601",
  appId: "1:212216394601:web:f0861920bfe473f52543f8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    })
    .catch(error => {
      document.getElementById("error").innerText = error.message;
    });
}
