import { menuArray } from '/data.js';
import { summaryArray } from '/data.js';

const menuEl = document.getElementById('menu');
const buyBtn = document.getElementById('buy-btn');
const paymentForm = document.getElementById('payment-form');
const closeBtn = document.getElementById('close-btn-container');
const paymentEl = document.getElementById('creditcard-popup');

document.addEventListener('click', function(e) {
    if (e.target.dataset.minus) handleMinusClick(e.target.dataset.minus);
    if (e.target.dataset.plus) handlePlusClick(e.target.dataset.plus);
})
    
function handlePlusClick(itemId) {    
    const targetItemObject = summaryArray.filter(function(item) {
        return item.id.toString() === itemId;
    })[0]
    targetItemObject.quantity++;
    targetItemObject.total = targetItemObject.quantity * targetItemObject.price;
    getOrderTotal();
    render();
}

function handleMinusClick(itemId) {
    const targetItemObject = summaryArray.filter(function(item) {
        return item.id.toString() === itemId;
    })[0]    
    if (targetItemObject.quantity > 0) {
        targetItemObject.quantity--;
        targetItemObject.total = targetItemObject.quantity * targetItemObject.price;
        getOrderTotal();
        render();        
    }
}

buyBtn.addEventListener('click', function() {
    if (getOrderTotal() > 0) {
        paymentEl.style.display = 'block';   
    }
})

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('payment-container').innerText = 'Order complete!';
})

closeBtn.addEventListener('click', function() {
    paymentEl.style.display = "none";
})

function getSummaryHtml() {
    let summaryHtml = '';
    
    summaryArray.forEach(function(item) {
        summaryHtml += `
            <li>${item.name} x${item.quantity} <span class="right-side">\$${item.quantity * item.price}</span></li>
            `
    })
    return summaryHtml;
} 

function getOrderTotal() {
    let cartTotal = 0;
    
    const total = summaryArray.forEach(function(item) {
        cartTotal += item.total;
    })
    
    return cartTotal;
}

function getMenuHtml() {
    
    let menuHtml = '';``
    
    menuArray.forEach(function(item) {
        menuHtml += `
            <div class="order">
                <p class="item-picture">${item.emoji}</p>
                <div>
                    <ul>
                        <li class="item-name">${item.name}</li>
                        <li class="item-ingredients">${item.ingredients}</li>
                        <li class="item-price">\$${item.price}</li>
                    </ul>
                </div>
                <div>
                    <i class="fa-solid fa-minus round" data-minus=${item.id}></i>
                    <i class="fa-solid fa-plus round" data-plus=${item.id}></i>
                </div>
            </div>
            `
    })
    return menuHtml;
}

function render() {
    document.getElementById('menu').innerHTML = getMenuHtml();
    document.getElementById('cart-items').innerHTML = getSummaryHtml();
    document.getElementById('buy-btn').innerText = `\$${getOrderTotal()}`;
}

render()