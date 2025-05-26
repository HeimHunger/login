
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://qqhrtpbazuupayhvelrm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...snw' // gekürzt
);

document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const meta = user.user_metadata || {};
  document.getElementById("checkoutEmail").value = user.email;
  document.getElementById("checkoutAddress").value = meta.street + " " + meta.house_number + ", " + meta.zip + " " + meta.city;

  const button = document.getElementById("submitCheckout");
  if (button) {
    button.addEventListener("click", () => {
      const code = Math.floor(1000 + Math.random() * 9000);
      const email = document.getElementById("checkoutEmail").value;
      const address = document.getElementById("checkoutAddress").value;
      const msg = `Hallo! Deine Bestellung war erfolgreich. Abholcode: ${code}. Adresse: ${address}`;
      console.log("E-Mail an:", email, msg);
      document.getElementById("successMessage").style.display = "block";
      setTimeout(() => {
        document.getElementById("checkoutModal").style.display = "none";
        document.getElementById("mealModal").style.display = "none";
      }, 2500);
    });
  }
});
