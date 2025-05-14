import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 👉 Hier deine Supabase-Daten eintragen
const SUPABASE_URL = 'https://qqhrtpbazuupayhvelrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaHJ0cGJhenV1cGF5aHZlbHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjEyODgsImV4cCI6MjA2Mjc5NzI4OH0.wuT6wBQByGUwoUYyWE0cGBETE3AH2H5fYPYYFfSvznw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById('login-form');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Login fehlgeschlagen: ' + error.message;
  } else {
    statusDiv.style.color = 'lightgreen';
    statusDiv.textContent = 'Login erfolgreich!';
    console.log('Login-Daten:', data);
  }
});
