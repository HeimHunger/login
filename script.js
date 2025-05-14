import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔧 Supabase Konfiguration
const SUPABASE_URL = 'https://qqhrtpbazuupayhvelrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHJ0cGJhenV1cGF5aHZlbHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjEyODgsImV4cCI6MjA2Mjc5NzI4OH0.wuT6wBQByGUwoUYyWE0cGBETE3AH2H5fYPYYFfSvznw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Formularumschaltung (Login <-> Registrierung)
window.switchForm = (formType) => {
  document.getElementById('login-form').classList.toggle('hidden', formType !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', formType !== 'register');
  document.getElementById('status').textContent = '';
};

// Login-Formular
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const statusDiv = document.getElementById('status');

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler beim Login: ' + error.message;
  } else {
    statusDiv.style.color = 'green';
    statusDiv.textContent = 'Login erfolgreich!';
    console.log('Benutzer:', data);
  }
});

// Registrierungs-Formular
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const username = document.getElementById('register-username').value;
  const statusDiv = document.getElementById('status');

  // 1. Nutzer registrieren
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signUpError) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Fehler bei der Registrierung: ' + signUpError.message;
    return;
  }

  // 2. Benutzerprofil speichern
  const userId = signUpData.user?.id;
  if (userId) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ username })
      .eq('id', userId);

    if (profileError) {
      statusDiv.style.color = 'orange';
      statusDiv.textContent = 'Registrierung erfolgreich, aber Profil konnte nicht gespeichert werden.';
      console.error('Profil-Fehler:', profileError);
    } else {
      statusDiv.style.color = 'green';
      statusDiv.textContent = 'Registrierung erfolgreich! Bitte E-Mail bestätigen.';
    }
  }
});
