/**
 * Cute Authentication & Profile System for Dewa & Ayu Sweet Space
 * Manages separate logins for Dewa 🐻 and Ayu 🐰 with PIN protection and auto-personalization.
 */

const AUTH_STORAGE_KEY = 'dewa_ayu_current_user_v1';
const PINS_STORAGE_KEY = 'dewa_ayu_pins_v1';

// Default PINs
const DEFAULT_PINS = {
  dewa: '1234',
  ayu: '1234'
};

const USER_PROFILES = {
  dewa: {
    id: 'dewa',
    name: 'Dewa',
    title: 'Mas Dewa 🐻',
    avatar: '🐻',
    role: 'Partner & Si Ganteng',
    color: '#0284c7',
    greeting: 'Halo Mas Dewa sayang! 🐻💙 Semangat hari ini ya~',
    accentClass: 'theme-dewa'
  },
  ayu: {
    id: 'ayu',
    name: 'Ayu',
    title: 'Neng Ayu 🐰',
    avatar: '🐰',
    role: 'Partner & Si Cantik',
    color: '#f43f5e',
    greeting: 'Halo Neng Ayu cantik! 🐰💖 Semoga harimu menyenangkan~',
    accentClass: 'theme-ayu'
  }
};

class AuthManager {
  constructor() {
    this.currentUser = this.loadCurrentUser();
    this.pins = this.loadPins();
    this.listeners = [];
  }

  loadCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored && USER_PROFILES[stored]) {
        return stored;
      }
    } catch (e) {}
    return null; // Not logged in yet
  }

  loadPins() {
    try {
      const stored = localStorage.getItem(PINS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    return { ...DEFAULT_PINS };
  }

  savePins() {
    try {
      localStorage.setItem(PINS_STORAGE_KEY, JSON.stringify(this.pins));
    } catch (e) {}
  }

  onAuthChange(callback) {
    this.listeners.push(callback);
  }

  notifyAuthChange() {
    this.listeners.forEach(cb => {
      try { cb(this.getCurrentUserProfile()); } catch (e) { console.error(e); }
    });
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getCurrentUserId() {
    return this.currentUser;
  }

  getCurrentUserProfile() {
    if (!this.currentUser) return null;
    return USER_PROFILES[this.currentUser];
  }

  login(userId, enteredPin) {
    if (!USER_PROFILES[userId]) {
      return { success: false, message: 'Profil tidak ditemukan' };
    }

    const correctPin = this.pins[userId] || DEFAULT_PINS[userId];
    if (enteredPin !== correctPin) {
      return { success: false, message: 'PIN salah ya, coba lagi~ 🥺' };
    }

    this.currentUser = userId;
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, userId);
    } catch (e) {}

    this.notifyAuthChange();
    return { success: true, user: USER_PROFILES[userId] };
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
    this.notifyAuthChange();
  }

  changePin(userId, oldPin, newPin) {
    if (!this.pins[userId]) this.pins[userId] = DEFAULT_PINS[userId];
    if (this.pins[userId] !== oldPin) {
      return { success: false, message: 'PIN lama salah' };
    }
    if (!newPin || newPin.length < 4) {
      return { success: false, message: 'PIN baru minimal 4 angka' };
    }
    this.pins[userId] = newPin;
    this.savePins();
    return { success: true, message: 'PIN berhasil diubah! 🌸' };
  }
}

window.authManager = new AuthManager();
window.USER_PROFILES = USER_PROFILES;

