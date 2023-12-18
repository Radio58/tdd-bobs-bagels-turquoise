const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 4;
    this.priceArray = [];
    this.discountedArray = [];
    this.totalPriceArray = [];
    this.count = 0;
  }

  addToBasket(sku) {
    menu.forEach((item) => {
      if (item.sku === sku && this.basketArray.length < this.basketSize) {
        this.basketArray.push(item);
      }
    })
    return "WARNING - Basket is full";
  }

  removeItems(sku) {
    this.basketArray.forEach((item) => {
      if (item.sku === sku) {
        this.basketArray.splice(i, 1);
      }
    })
    return "That item isn't in your basket";
  }

  // checkPrice(sku) takes a string, loops through the menu array and reports the price if the string matches on an item
  checkPrice(sku) {
    menu.forEach((item) => {
      if (item.sku === sku) {
        // console.log("sku", menu[i])
        this.priceArray.push(item.price);
      }
    })
  }

  
  totalBasketPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.priceArray.length; i++) {
      totalPrice += this.priceArray[i];
    }
    totalPrice = totalPrice - this.discountedPrice();
    return Number(totalPrice.toFixed(2));
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku);
    }
    this.count = this.discountedArray.reduce((tally, sku) => {
        console.log(tally, sky)
      tally[sku] = (tally[sku] || 0) + 1;
      return tally;
    }, {});
    let totalDiscount = 0;
    const skus = Object.keys(this.count);
    for (let i = 0; i < skus.length; i++) {
      const count = this.count[skus[i]];
      const item = this.getItem(skus[i]);
      if (item.discount) {
        if (count >= item.discountTrigger) {
          totalDiscount += item.saving * Math.floor(count / item.discountTrigger);
        }
      }
    }

    return totalDiscount;
  }

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i];
      }
    }
  }

  //this discountedPrice function is now returning an object which contains
  //the name of each SKU and the amount of times it occurs

  // for (let i = 0; i < this.discountedArray.length; i++)
  // if (this.discountedArray[i].sku === ""
}

module.exports = Basket;
