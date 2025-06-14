let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addMedication() {
  const med = prompt("Enter medication name:");
  const price = parseInt(prompt("Enter price:"), 10);
  if (med && price) {
    cart.push({ name: med, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalSpan = document.getElementById("total");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    cartItems.innerHTML += `<p>${item.name} - ₦${item.price}</p>`;
  });
  totalSpan.textContent = total;
}
function checkoutWhatsApp() {
  const text = cart.map(item => item.name + " - ₦" + item.price).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  window.open(`https://wa.me/?text=Order:%0A${text}%0ATotal: ₦${total}`);
}
function checkoutEmail() {
  const text = cart.map(item => item.name + " - ₦" + item.price).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  window.location.href = `mailto:?subject=MedSwift Order&body=Order:%0A${text}%0ATotal: ₦${total}`;
}
function verifyAccess() {
  const input = document.getElementById("adminPass").value;
  if (input === "medswift123") {
    localStorage.setItem("access", "granted");
    location.reload();
  } else {
    alert("Access Denied!");
  }
}
window.onload = function() {
  if (localStorage.getItem("access") !== "granted") {
    document.getElementById("loginPanel").style.display = "block";
    document.getElementById("cartSection").style.display = "none";
  } else {
    renderCart();
  }
};
