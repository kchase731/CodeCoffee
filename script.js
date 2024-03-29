// ============= Product Class ===================///

class Product {
    constructor(name, price, category, description, url) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.url = url;
    }

}

// ============= Cart Class ===================///

class Cart {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;

    }

}

let productlist = [];
let cartList = [];
let i = 0;
let t = 0;
let subtotal = [];
let subT = 0;
let tax = 0;
let total = 0;
let totalsObj = [];



// =================Products ==================//

addProduct("Iced Coffee", 3, "drinks", "This is an iced coffee",'images/IcedCoffee.png');
addProduct("Hot Coffee", 3, "drinks", "This is a hot black coffee",'images/HotCoffee.png');
addProduct("Vanilla Latte", 5, "drinks", "This is a hot vanilla latte",'images/VanillaLatte.png');
addProduct("Carmel Latte", 5, "drinks", "This is a hot carmel latte",'images/CarmelLatte.png');
addProduct("Cold Brew", 4, "drinks", "This is a cold brew coffee",'images/ColdBrew.png');
addProduct("Blueberry Muffin", 3, "snacks", "This is a blueberry muffin",'images/BlueberryMuffin.png');
addProduct("Poppy Muffin", 3, "snacks", "poppyseed muffin",'images/PoppyseedMuffin.png');
addProduct("Espresso shot", 3, "espresso", "This is an espresso shot",'images/EspressoShot.png');
addProduct("Chai Tea Latte", 4, "drinks", "This is a hot chai tea latte",'images/ChaiTea.png');
addProduct("Iced Tea", 3, "drinks", "This is a cold iced tea",'images/IcedTea.png');
// addProduct("Green Tea", 4, "cold drinks", "This is a cold green tea",'https://via.placeholder.com/150');
// addProduct("Crossiant", 3, "snacks", "This is a crossiant",'https://via.placeholder.com/150');



// ================ Items Loop ===================//

for (i; i <= productlist.length; i++) {

    createProductCard(i);
}
// ================ CartItems Loop ===================//

// for (t; t<=cartList.length; t++){

//     createCartItem(t);
// }


// ========FUNCTIONS ============//
function addProduct(name, category, description, price, url) {

    productlist.push(new Product(name, category, description, price, url));
}

function createProductCard(i) {
    // console.log(i);
    let productCard =
        `
    <div class="card" >
    <img src="${productlist[i].url}" height="120px" width="150px" class="card-img-top" alt="...">
    <div class="card-body">
    <h6 class="card-title">${productlist[i].name}</h6>
    <p class="card-text">${productlist[i].description}</p>
    <p class="card-text" align="center" style="font-weight: 800; color: green">$${productlist[i].price}</p>
    <p style="font-size:small">Category:&nbsp;&nbsp;<span class="badge badge-dark">${productlist[i].category}</span></p>
    <a href="#" onclick="addToCart('${productlist[i].name}','${productlist[i].description}','${productlist[i].price}')" class="btn-sm btn-primary" align="center" style="display: block">Add to Cart</a>
    </div>`;
    document.getElementById('productCards').innerHTML += productCard;


}

function createCartItem(t) {
    let cartItem =
        `   <tr id="itemid${t}">
            <th scope="row"><a href="#" onclick="removeCartItem(${t})"<i class="fa fa-minus-square"></i></a></th>
            <td>${cartList[t].name}</td>
            <td>${cartList[t].description}</td>
            <td style="color: green">$${cartList[t].price}</td>
        </tr>`;
    document.getElementById('CartItems').innerHTML += cartItem;


}

function addToCart(name, description, price) {

    let t = cartList.length;
    cartList.push(new Cart(name, description, Number(price)));
    createCartItem(t);
    cartMath();
    // console.log(cartList);


}

function removeCartItem(t){
    cartList.splice(t, 1);
    document.getElementById(`itemid${t}`).remove();
    if (cartList.length === 0){
        subT = 0;
        tax = 0;
        total = 0;

        document.getElementById("subtotal").innerHTML = "$ " + subT;
        document.getElementById("tax").innerHTML = "$ " + tax;
        document.getElementById("total").innerHTML = "$ " + total;

    } else {
    
    
    cartMath();
    
}

}

function itemsInCart(t) {

    t = 0;
    for (t; t <= cartList.length; t++) {

        createCartItem(t);

    }

}

// ================ Cart Math===================//


function cartMath(){
    s = 0;
    subT = 0;
    tax = 0;
    let total = 0;



    for (s; s <= cartList.length; s++){

        subT = subT + cartList[s].price;
        tax = subT * 0.06;
        total = tax + subT;
        
        showTotals(tax.toFixed(2), subT.toFixed(2), total.toFixed(2));
        

    }
    
}


// ================ Show Checkout Fields ===================//

function showTotals(tax, subT, total) {

    totalsObj = [tax, subT, total];

    document.getElementById("subtotal").innerHTML = "$ " + subT;
    document.getElementById("tax").innerHTML = "$ " + tax;
    document.getElementById("total").innerHTML = "$ " + total;

    return totalsObj;

}

// ====== Payment Method Options - Selecting a payment on the dropdown ====== //

let paymentOption = document.getElementById("CheckOutOptions").value;
document.getElementById("CheckOutOptions").addEventListener("change", paymentMethod());

function paymentMethod() {
    let paymentOption = document.getElementById("CheckOutOptions").value;

    if (paymentOption === "----") {
        document.getElementById("CashCheckOut").className = "CashCheckOutNone";
        document.getElementById("CreditCheckOut").className = "CreditCheckOutNone";

    } else if (paymentOption === "Credit Card") {
        document.getElementById("CashCheckOut").className = "CashCheckOutNone";
        document.getElementById("CreditCheckOut").className = "CreditCheckOut";
    } else if (paymentOption === "Cash") {
        document.getElementById("CashCheckOut").className = "CashCheckOut";
        document.getElementById("CreditCheckOut").className = "CreditCheckOutNone";
    }
}










paymentMethod();
// console.log();

function amountDue(totalsObj){
    let amountEntered = document.getElementById("amountPaid");
    let amountPaid = Number(amountEntered.value);
    let amountDue = Number(totalsObj[2]);
    // let total = cartMath();
    if (amountPaid >= amountDue) {
        let changeDue = amountPaid - amountDue;
        document.getElementById("changeDue").innerHTML = "$ " + changeDue.toFixed(2);
        // console.log("Change Amount: " + changeDue);

    }

    // console.log("something");
}