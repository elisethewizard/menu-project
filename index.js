import { menuArray } from '/data.js'

function getMenuHtml(){
    let menuHtml = ``
    menuArray.forEach(function(item) {
    menuHtml += `
<div class='menu-item'>
    <div class='item-emoji'>${item.emoji}</div>
    <div class='item-desc'>
        <p class='item-name'>${item.name}</p>
        <p>${item.ingredients}</p>
        <p class='item-price'>$${item.price}</p>
    </div>
    <button id='add-btn' data-add='${item.id}'>+</button>
</div>
`})
    return menuHtml
}

function handleAddClick(item){
    console.log('clicked')
}

// document.getElementById('add-btn').addEventListener('click', handleAddClick(e.target.dataset.add))

function render(){
    document.getElementById('menu-container').innerHTML = getMenuHtml()
}

render()