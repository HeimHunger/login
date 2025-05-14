import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 👉 Deine Supabase-Daten eintragen:
const SUPABASE_URL = 'https://qqhrtpbazuupayhvelrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHJ0cGJhenV1cGF5aHZlbHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjEyODgsImV4cCI6MjA2Mjc5NzI4OH0.wuT6wBQByGUwoUYyWE0cGBETE3AH2H5fYPYYFfSvznw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Login-Formular & Statusanzeige
const loginForm = document.getElementById('login-form');
const statusDiv = document.getElementById('status');

// Login-Funktion
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler beim Login: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Login erfolgreich!';
    console.log('Login-Daten:', data);
  }
});

// 👉 Registrierungs-Button dynamisch hinzufügen
const registerBtn = document.createElement('button');
registerBtn.textContent = 'Registrieren';
registerBtn.style.marginTop = '10px';
registerBtn.type = 'button';
loginForm.appendChild(registerBtn);

// Registrierungs-Logik
registerBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler bei der Registrierung: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Registrierung erfolgreich! Bitte E-Mail bestätigen.';
    console.log('Registrierungs-Daten:', data);
  }
});

