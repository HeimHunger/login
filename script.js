import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Formular wechseln
window.switchForm = (formType) => {
  document.getElementById('login-form').classList.toggle('hidden', formType !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', formType !== 'register');
  document.getElementById('status').textContent = '';
};

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  const statusDiv = document.getElementById('status');

  if (error) {
    statusDiv.textContent = 'Fehler beim
