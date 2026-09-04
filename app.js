
// Mobile menu toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}
 
// 30 Total Products Dataset categorized into Sale, New Arrivals, and Top Sellers
const allProducts = [
    { name: "Chocolate Cupcakes", price: 4.50, category: "Top Sellers", img: "./images/cupcake1.jpeg" },
    { name: " Espresso Macarons", price: 12.99, category: "Sale", img: "./images/macaron1.jpeg" },
    { name: "Tiramisu Croissant", price: 2.80, category: "New Arrivals", img: "./images/croissant3.jpeg" },
    { name: "Snickers Ice Cream Cake", price: 24.00, category: "Top Sellers", img: "./images/icecake.jpeg" },
    { name: "White & Dark Piping Glazes", price: 3.20, category: "Sale", img: "./images/donut1.jpeg" },

    { name: "Galaxy Macarons",title:"Galaxy Macarons", price: 5.10, category: "New Arrivals", img: "./images/macaron4.jpeg" },
    { name: " Chocolate Hazelnut Crepe European Cake", price: 24.50, category: "Top Sellers", img: "./images/Europeancake.jpeg" },
    { name: "Rainbow Vanilla Cup Cakes", price: 6.20, category: "Sale", img: "./images/cupcake3.jpeg" },
    { name: "Vanilla and Buttercream Cake Pops", price: 3.90, category: "New Arrivals", img: "./images/cakepops3.jpeg" },
    { name: "bite-sized Mini Croissants", price: 14.50, category: "Top Sellers", img: "./images/croissant1.jpeg" },

    { name: "Blue Velvet Cake Pops", price: 4.10, category: "Sale", img: "./images/cakepops1.jpeg" },
    { name: "Royal Marsala Elegant Cake", price: 5.50, category: "New Arrivals", img: "./images/moderncake.jpeg" },
    { name: "Dark Chocolate Macarons", price: 6.90, category: "Top Sellers", img: "./images/macaron2.jpeg" },
    { name: "Berry & Cream Croissant ", price: 12.00, category: "Sale", img: "./images/croissant2.jpeg" },
    { name: "Blueberry mint cupcakes ", price: 3.75, category: "New Arrivals", img: "./images/cupcake2.jpeg" },

    { name: "Pistachio Croissant", price: 3.50, category: "Top Sellers", img: "./images/croissant4.jpeg" },
    { name: "Custom Donuts", price: 4.25, category: "Sale", img: "./images/donut5.jpeg" },
    { name: "gourmet cupcakes", price: 5.20, category: "New Arrivals", img: "./images/cupcake4.jpeg" },
    { name: "MAC&MELT Special Branded Macarons", price: 4.80, category: "Top Sellers", img: "./images/macaron3.jpeg" },
    { name: "Deep Dark Chocolate Cake", price: 30.00, category: "Sale", img: "./images/customcake2.jpeg" },

    { name: "Custom Cake Pops", price: 3.75, category: "New Arrivals", img: "./images/cakepops5.jpeg" },
    { name: "Gourmet Celebration Cupcakes", price: 4.40, category: "Top Sellers", img: "./images/cupcake5.jpeg" },
    { name: "Artisanal Donuts", price: 4.90, category: "Sale", img: "./images/donut3.jpeg" },
    { name: "Rich Chocolate Hazelnut Croissant", price: 8.90, category: "New Arrivals", img: "./images/croissant5.jpeg" },
    { name: "White & Dark Chocolate Cake Pops", price: 10.50, category: "Top Sellers", img: "./images/cakepops4.jpeg" },

    { name: "Pastel Macarons", price: 5.10, category: "New Arrivals", img: "./images/macaron5.jpeg" },
    { name: "Gourmet Chocolate Donuts", price: 19.50, category: "Top Sellers", img: "./images/jellycake.jpeg" },
    { name: "Colorful Cake Pops", price: 6.20, category: "Sale", img: "./images/donut2.jpeg" },
    { name: "Strawberry & Vanilla Donuts", price: 14.90, category: "New Arrivals", img: "./images/cakepops2.jpeg" },
    { name: "Ocean Island Jelly Cake", price: 14.50, category: "Top Sellers", img: "./images/donut4.jpeg" },

];

let currentFilter = 'All';
let currentBatchIndex = 0;
const itemsPerView = 10;

function getFilteredProducts() {
    if (currentFilter === 'All') return allProducts;
    return allProducts.filter(p => p.category === currentFilter);
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filtered = getFilteredProducts();
    const maxIndex = Math.max(0, filtered.length - itemsPerView);
    if (currentBatchIndex > maxIndex) currentBatchIndex = maxIndex;

    const currentItems = filtered.slice(currentBatchIndex, currentBatchIndex + itemsPerView);

    grid.innerHTML = currentItems.map(p => `
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-mint/60 flex flex-col">
            <div class="h-44 overflow-hidden relative">
                <img src="${p.img}?auto=format&fit=crop&q=80&w=400" alt="${p.name}" title="${p.name}" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 bg-bubbleGum text-white text-xs px-2.5 py-1 rounded-full font-bold">${p.category}</span>
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="font-serif font-bold text-brandDark text-base mb-1 truncate">${p.name}</h3>
                    <p class="text-bubbleGum font-bold text-sm mb-3">$${p.price.toFixed(2)} USD</p>
                </div>
                
                <!-- Direct Product Card Quantity Picker & Add to Cart Section -->
                <div class="flex items-center space-x-2">
                    <div class="flex items-center border border-mint rounded-xl overflow-hidden bg-candyFloss/30">
                        <button onclick="adjustCardQty('${p.name}', -1)" class="px-2.5 py-2 text-brandDark hover:bg-mint transition-colors font-bold text-xs">-</button>
                        <span id="qty-${p.name.replace(/[^a-zA-Z0-9]/g, '')}" class="px-2 text-xs font-semibold">1</span>
                        <button onclick="adjustCardQty('${p.name}', 1)" class="px-2.5 py-2 text-brandDark hover:bg-mint transition-colors font-bold text-xs">+</button>
                    </div>
                    <button onclick="addSelectedToCart('${p.name}', ${p.price}, '${p.img}')" class="flex-1 bg-mint hover:bg-bubbleGum text-brandDark hover:text-white font-semibold py-2 px-3 rounded-xl transition-colors text-xs text-center shadow-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function slideProducts(direction) {
    const filtered = getFilteredProducts();
    const maxBatch = Math.max(0, filtered.length - itemsPerView);
    currentBatchIndex += direction * itemsPerView;
    if (currentBatchIndex > maxBatch) currentBatchIndex = 0;
    if (currentBatchIndex < 0) currentBatchIndex = maxBatch;
    renderProducts();
}

function filterProducts(category) {
    currentFilter = category;
    currentBatchIndex = 0;
    
    document.querySelectorAll('.product-tab').forEach(tab => {
        if (tab.innerText.toLowerCase() === category.toLowerCase()) {
            tab.classList.remove('text-gray-500');
            tab.classList.add('text-bubbleGum', 'border-b-2', 'border-bubbleGum');
        } else {
            tab.classList.remove('text-bubbleGum', 'border-b-2', 'border-bubbleGum');
            tab.classList.add('text-gray-500');
        }
    });

    renderProducts();
}

// Track temporary card quantities before adding to cart
const cardQuantities = {};

function adjustCardQty(name, amount) {
    const key = name.replace(/[^a-zA-Z0-9]/g, '');
    if (!cardQuantities[name]) cardQuantities[name] = 1;
    cardQuantities[name] += amount;
    if (cardQuantities[name] < 1) cardQuantities[name] = 1;
    
    const span = document.getElementById(`qty-${key}`);
    if (span) span.innerText = cardQuantities[name];
}

// Shopping Cart Logic with Quantity Controls (+ / -) inside Cart & Product Cards
let cart = [];

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('hidden');
}

function addSelectedToCart(name, price, img) {
    const qtyToAdd = cardQuantities[name] || 1;
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += qtyToAdd;
    } else {
        cart.push({ name, price, img, quantity: qtyToAdd });
    }
    
    // Reset card quantity counter back to 1 after adding
    cardQuantities[name] = 1;
    const key = name.replace(/[^a-zA-Z0-9]/g, '');
    const span = document.getElementById(`qty-${key}`);
    if (span) span.innerText = 1;

    updateCartUI();
    toggleCart();
}

// Fallback direct button (e.g. for offers / premium cards)
function addToCart(name, price, img) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }
    updateCartUI();
    toggleCart();
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const totalElement = document.getElementById('cart-total');

    badge.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is currently empty.</p>';
        totalElement.innerText = '$0.00 USD';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        return `
            <div class="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-mint/40 gap-3">
                <img src="${item.img}" class="w-14 h-14 object-cover rounded-xl shrink-0">
                <div class="flex-1 min-w-0">
                    <h4 class="font-serif font-bold text-xs text-brandDark truncate">${item.name}</h4>
                    <p class="text-xs text-bubbleGum font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="flex items-center space-x-2 mt-1">
                        <button onclick="changeQuantity(${index}, -1)" class="w-6 h-6 bg-mint/50 hover:bg-bubbleGum hover:text-white rounded-md flex items-center justify-center text-xs font-bold transition-colors">-</button>
                        <span class="text-xs font-semibold">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" class="w-6 h-6 bg-mint/50 hover:bg-bubbleGum hover:text-white rounded-md flex items-center justify-center text-xs font-bold transition-colors">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-gray-400 hover:text-bubbleGum p-2 transition-colors shrink-0" title="Remove item">
                    <i class="fa-solid fa-xmark text-base"></i>
                </button>
            </div>
        `;
    }).join('');

    totalElement.innerText = `$${total.toFixed(2)} USD`;
}

// Initial product load on start
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});