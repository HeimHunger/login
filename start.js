import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Deine Supabase-Daten
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Nutzer überprüfen
async function checkUser() {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    // Kein Benutzer → zurück zum Login
    window.location.href = 'index.html'
  } else {
    document.getElementById('user-info').textContent = `Eingeloggt als: ${user.email}`
  }
}

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = 'index.html'
})

checkUser()
