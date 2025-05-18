import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://qqhrtpbazuupayhvelrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHJ0cGJhenV1cGF5aHZlbHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjEyODgsImV4cCI6MjA2Mjc5NzI4OH0.wuT6wBQByGUwoUYyWE0cGBETE3AH2H5fYPYYFfSvznw';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elemente
const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const statusDiv = document.getElementById('status');
const resetLink = document.getElementById('reset-link');

const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Login
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

  if (loginError) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Login fehlgeschlagen: ' + loginError.message;
    return;
  }

  statusDiv.style.color = 'lightgreen';
  statusDiv.textContent = 'Login erfolgreich! Weiterleitung...';

  // Session abwarten, bevor weitergeleitet wird
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (!sessionError && sessionData.session) {
    window.location.href = 'start.html';
  } else {
    statusDiv.style.color = 'orange';
    statusDiv.textContent = 'Login war erfolgreich, aber keine aktive Session gefunden.';
  }
});

// Registrierung
registerBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const { error: signUpError } = await supabase.auth.signUp({ email, password });

  if (signUpError) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Registrierung fehlgeschlagen: ' + signUpError.message;
    return;
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    statusDiv.style.color = 'orange';
    statusDiv.textContent = 'Registriert, aber Login fehlgeschlagen: ' + signInError.message;
    return;
  }

  statusDiv.style.color = 'lightgreen';
  statusDiv.textContent = 'Registrierung & Login erfolgreich! Weiterleitung...';

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (!sessionError && sessionData.session) {
    window.location.href = 'start.html';
  } else {
    statusDiv.textContent = 'Registrierung erfolgreich, aber keine aktive Session gefunden.';
  }
});

// Passwort vergessen
resetLink.addEventListener('click', async () => {
  const email = emailInput.value;
  if (!email) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Bitte gib zuerst deine E-Mail ein.';
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://login-chi-blond.vercel.app/index.html',
  });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler beim Senden des Links: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Passwort-Reset-Link gesendet!';
  }
});
