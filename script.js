import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🛠 Supabase Config – Bitte deine Daten eintragen
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById('login-form');
const statusDiv = document.getElementById('status');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    statusDiv.textContent = 'Fehler: ' + error.message;
  } else {
    statusDiv.style.color = '#00ff00';
    statusDiv.textContent = 'Login erfolgreich!';
    console.log('Benutzer:', data);
  }
});
