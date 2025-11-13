// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

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
    // Ambil semua anggota
    const querySnapshot = await getDocs(collection(db, "anggota"));
    let foundUser = null;

    querySnapshot.forEach((docSnap) => {
      const user = docSnap.data();
      if (
        (user.email === emailInput || user.nomor_anggota === emailInput) &&
        user.password === passwordInput
      ) {
        foundUser = { ...user, id: docSnap.id };
      }
    });

    if (foundUser) {
      sessionStorage.setItem("userData", JSON.stringify(foundUser));
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Email / nomor anggota atau password salah!";
    }
  } catch (error) {
    console.error(error);
    errorMsg.textContent = "Terjadi kesalahan koneksi.";
  }
});
