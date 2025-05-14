import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🛠 Supabase-Konfiguration – bitte mit deinen Daten ersetzen
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elemente
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const statusDiv = document.getElementById('status');

// Login-Button
document.getElementById('login-btn').addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler beim Login: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Login erfolgreich!';
    console.log('Login-Daten:', data);
  }
});

// Registrierungs-Button
document.getElementById('register-btn').addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const { error, data } = await supabase.auth.signUp({ email, password });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler bei der Registrierung: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Registrierung erfolgreich! Bitte E-Mail bestätigen.';
    console.log('Registrierungs-Daten:', data);
  }
});
