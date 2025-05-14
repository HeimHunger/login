import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase-Konfiguration (ersetzen mit deinem Projekt)
const SUPABASE_URL = 'https://qqhrtpbazuupayhvelrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHJ0cGJhenV1cGF5aHZlbHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjEyODgsImV4cCI6MjA2Mjc5NzI4OH0.wuT6wBQByGUwoUYyWE0cGBETE3AH2H5fYPYYFfSvznw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elemente
const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const statusDiv = document.getElementById('status');

const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Login
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Login fehlgeschlagen: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Login erfolgreich!';
  }
});

// Registrierung
registerBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Registrierung fehlgeschlagen: ' + error.

