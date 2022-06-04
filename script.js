function  Summ() {return this.amount * this.price}
function  Kcall() {return this.amount * this.kcall}
const products = {
  plainBurger: {
    name: 'Гамбургер простой',
    price: 10000,
    kcall: 500,
    amount: 0,
    SummProd: Summ,
    KcallProd: Kcall,
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    price: 20500,
    kcall: 700,
    amount: 0,
    SummProd: Summ,
    KcallProd: Kcall,
  },
  freshCombo: {
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 900,
    amount: 0,
    SummProd: Summ,
    KcallProd: Kcall,
  },
}
const extraProducts = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 300,
    kcall: 120
  },
  lettuce: {
    name: 'Салатный лист',
    price: 400,
    kcall: 30
  },
  cheese: {
    name: 'Сыр',
    price: 700,
    kcall: 90
  },
}
const cards = document.querySelectorAll('.main__product')
const addCart = document.querySelector('.addCart')
const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptOut = document.querySelector('.receipt__window-out')
const windowBtn = document.querySelector('.receipt__window-btn')

let arrProducts = []
let totalPrice = 0
let totalKcall = 0
let totalName = ''

addCart.addEventListener('click', function(){
  for(const key in products){
    const pObj = products[key]
    if(pObj.amount > 0){
      arrProducts.push(pObj)
      pObj.name += `: ${pObj.amount}`
      for(const info in pObj){
        if(pObj[info] === true){
          pObj.name += `\n${extraProducts[info].name}`
        }
      }
      pObj.name += `\nСтоимость: ${pObj.SummProd()}\nКаллорий: ${pObj.KcallProd()}`
    }
  }
  for(const i in arrProducts){
    totalPrice += arrProducts[i].SummProd()
    totalKcall += arrProducts[i].KcallProd()
    totalName += `\n${arrProducts[i].name}\n`
  }
  receiptOut.innerHTML = `Ваш заказ:\n${totalName}Каллорийность: ${totalKcall}\nСтоимость: ${totalPrice + 9000} c доставкой \nдоставка (9000)`;
  
  receipt.style.display = 'flex'
  setTimeout(function(){
    receipt.style.opacity = '1'
  }, 100)
  setTimeout(function(){
    receiptWindow.style.top = '10%'
  }, 300)
})
windowBtn.addEventListener('click', function(){
  window.location.reload()
})

cards.forEach(function(card, key){
  const cardBtns = card.querySelectorAll('.main__product-btn')
  const checkBox = card.querySelectorAll('.main__product-checkbox')
  const cardId = card.getAttribute('id')
  const productNum = card.querySelector('.main__product-num')
  const productPrice = card.querySelector('.main__product-price span')
  const productKcall = card.querySelector('.main__product-kcall span')
  const mainProductInfo = card.querySelector('.main__product-info');
  const view = document.querySelector('.view')
  const closeBtn = document.querySelector('.view__close')
  
  mainProductInfo.addEventListener('dblclick', function(){
    view.classList.add('active')
    // view.querySelector('img').setAttribute('src', mainProductInfo.querySelector('img').getAttribute('src'))
    view.querySelector('img').src = mainProductInfo.querySelector('img').getAttribute('src')
  })
  closeBtn.addEventListener('click', function(){
    view.classList.remove('active')
  })
  
  checkBox.forEach(function(check, key){
    check.addEventListener('click', function(){
      const dataExtra = check.getAttribute('data-extra')
      products[cardId][dataExtra] = check.checked;
      
      if(products[cardId][dataExtra] == true){
        products[cardId].price += extraProducts[dataExtra].price
        products[cardId].kcall += extraProducts[dataExtra].kcall
      }else{
        products[cardId].price -= extraProducts[dataExtra].price
        products[cardId].kcall -= extraProducts[dataExtra].kcall
      }
      productPrice.innerHTML = products[cardId].SummProd();
      productKcall.innerHTML = products[cardId].KcallProd();
    })
  })
  
  cardBtns.forEach(function(btn, key){
    btn.addEventListener('click', function(){
      const symbol = btn.getAttribute('data-symbol')
      
      if(symbol == '+' && products[cardId].amount < 30){
        products[cardId].amount++
      }else if(symbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--
      }
      productNum.innerHTML = products[cardId].amount;
      productPrice.innerHTML = products[cardId].SummProd();
      productKcall.innerHTML = products[cardId].KcallProd();
    })
  })
})