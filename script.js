// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4Dm7zr7_Q6UrgUIlqP4wMskKTSolT-lY",
  authDomain: "web-kta-asdi.firebaseapp.com",
  projectId: "web-kta-asdi",
  storageBucket: "web-kta-asdi.firebasestorage.app",
  messagingSenderId: "212623097403",
  appId: "1:212623097403:web:b97a7ed3af6aed5070a61e",
  measurementId: "G-2MD17KWVHJ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi login
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "Memeriksa data...";
  
  try {
    const querySnapshot = await getDocs(collection(db, "anggota"));
    let userFound = false;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        (data.email === emailInput || data.nomor_anggota === emailInput) &&
        data.password === passwordInput
      ) {
        userFound = true;
        sessionStorage.setItem("userData", JSON.stringify(data));
        window.location.href = "dashboard.html";
      }
    });

    if (!userFound) {
      errorMsg.textContent = "Email atau nomor anggota salah!";
    }
  } catch (error) {
    errorMsg.textContent = "Terjadi kesalahan koneksi.";
    console.error(error);
  }
});
