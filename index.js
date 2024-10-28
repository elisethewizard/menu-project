import { menuArray } from '/data.js'
const menuContainer = document.getElementById('menu-container')
const checkoutContainer = document.getElementById('checkout-container')
const paymentForm = document.getElementById('payment-form')
let allItemsAddedArr = []
let totalPrice

function renderMenu(){
    let menuHtml = ``
    menuArray.forEach(function(menuItem) {
        menuHtml += `
<div class='menu-item'>
    <div class='item-emoji'>${menuItem.emoji}</div>
    <div class='item-desc'>
        <p class='item-name no-margin'>${menuItem.name}</p>
        <p class='item-ingr no-margin'>${menuItem.ingredients}</p>
        <h3 class='price no-margin'>$${menuItem.price}</h3>
    </div>
    <button id='${menuItem.id}' data-add='${menuItem.name}'> + </button>
</div>
`})
    menuContainer.innerHTML = menuHtml
}

document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        addToOrder(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove)
    }
})

function addToOrder(addedItemName){
    const addedItemObj = menuArray.filter(function(obj){
        return obj.name === addedItemName 
    })[0]
    allItemsAddedArr.push(addedItemObj)
    renderOrder()
}

 function renderOrder(){
    const total = allItemsAddedArr.reduce((total, current) => total + current.price)
     
    const addedItemsHtml = allItemsAddedArr.map(element => {
         return `
            <div class="checkout-item">
            <div class='iteml'>
                <p class='item-name no-margin'>${element.name}</p>
                <button id='remove-${element.id}' data-remove='${element.name}'>remove</button>
            </div>
            <h3 class='price no-margin'>$${element.price}</h3>
         </div>`}).join('')
     
    const orderHtml = `
         <p id='title'>Your order</p>
         <div id='checkout-items'>${addedItemsHtml}</div>
         <div id='total'>
             <p class='no-margin'>Total price:</p>
             <h3 class='price no-margin'>$${calculateTotal()}</h3>
         </div>
        <button id='complete-order-btn' class='btn-lime'>Complete order</button>`
    checkoutContainer.innerHTML = orderHtml
    document.getElementById('complete-order-btn').addEventListener('click', function(){
        paymentForm.style.display = 'block'
    })
}

 function removeFromOrder(removeName){
     allItemsAddedArr = allItemsAddedArr.filter(function(obj){
         return (obj.name != removeName)
    })
    if (allItemsAddedArr.length){
        renderOrder()
    } else {
        checkoutContainer.innerHTML = ``
    }
 }

function calculateTotal(){
    totalPrice = 0
    allItemsAddedArr.forEach(function(obj){
        totalPrice+= obj.price
    })
    return totalPrice
}  

renderMenu()

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const orderFormData = new FormData(paymentForm)
    const name = orderFormData.get('pay-name')
    const cardNumber = orderFormData.get('pay-card')
    const cvv = orderFormData.get('pay-cvv')
    console.log(`The order for ${name} (payment info: ${cardNumber}, ${cvv}) consists of ${allItemsAddedArr.map(obj => obj.name).join(', ')}.`)
    renderPaymentFinished(name)
})

function renderPaymentFinished(name){
    paymentForm.style.display = 'none'
    checkoutContainer.innerHTML = `<h1 id='thanks'>Thanks, ${name}! Your order is on its way!</h1>`
}