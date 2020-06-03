$(document).ready(function() {
    $('.cart-elem__plus').click(function() {

    })
    pizzasArr = [];
    $.ajax({
        url: "actions/getPizzas.php", 
        type: "GET",
        success: function(pizzas) {
            $('.swiper-wrapper').append(function() {
                let res = "";
                for(let i = 0; i < pizzas.id.length; i++) {
                    pizzasArr.push([pizzas.id[i], pizzas.url[i], pizzas.title[i], pizzas.description[i], pizzas.kkal[i], pizzas.sprice[i]]);
                    res += "<div class='swiper-slide' >";
                    res += "<div class='pizza'>";
                    res += "<div class='pizza__photo' style='background-image: url(\/assets\/img\/" + pizzas.url[i] + ")'></div>"
                    res += "<p class='pizza__title'>" + pizzas.title[i] + "</p>";
                    res += "<p class='pizza__desc'>" + pizzas.description[i] + "</p>";
                    res += "<p class='pizza__kkal'><i class='fas fa-fire pizza__kkal-logo'></i> " + pizzas.kkal[i] + " kkal</p>"; 
                    res += "<div class='price'><div class='price__text'>" + pizzas.sprice[i] + " $ / 1 pcs</div>";
                    res += "<div onclick='addToCart(" + pizzas.id[i]  + ")' class='price__button'><i class='fas fa-shopping-cart'></i></div>";
                    res += "</div>";
                    res += "</div>";
                    res += "</div>";
                }
                return res;
            })
            initSwip(); 

        }
    });
// Modal
    $('.cart-button').click(function() {
        openModal('modal-cart')
    })

    $('.close-modal').click(function() {
        closeModal('modal-cart')
    })
    .children().click(function(e){
        e.stopPropagation();
    });
    
})

function openModal(elem) {
    document.getElementById(elem).style.display="block";
    document.body.style.overflow = 'hidden';
}
function closeModal(elem) {
    document.getElementById(elem).style.display="none";
    document.body.style.overflow = 'auto';
}
// End Modal

function initSwip() {
    var swiper = new Swiper('.swiper-container', {
        width: 170,
        spaceBetween: 25,
        centeredSlides: false,
        slidesOffsetBefore: 25,
        slidesOffsetAfter: 25,
        freeMode: true
      });
    }

let cartArr = []; 
let countShop = Number($(".cart-button__count").text());
let total = 0.00;

function addToCart(id) {
    if(cartArr.length > 0) {
        for(let i = 0; i < cartArr.length; i++) {
            if(cartArr[i][0] === id) {
                cartArr[i][1]++;
                addToBucket()
                return;
            } 
        }
        cartArr.push([id, 1]);
        countShop++;
        addToBucket()
    } else {
        cartArr.push([id, 1]);
        countShop++;
        addToBucket()
    }
    console.log(cartArr);
    $(".cart-button__count").text(countShop);
}

function deleteElemCart(elem) { 
    if(countShop != 0) {
    for(let i = 0; i < cartArr.length; i++) {
            cartArr.splice(elem, 1);
            countShop--;
            $(".cart-button__count").text(countShop);
            addToBucket();
            return;
    }
}
}

function addToBucket() {
    $('.cnt-cart').empty()
    $('.cnt-cart').append(function() {
        let resp = ''
        total = 0;
        for(let i = 0; i < cartArr.length; i++) {
            let test = cartArr[i][0];
            resp += "<div class='row'><div class='col cart-elem'><div class='cart-elem__count'><div onclick='cartElemMinus("+ i +")' class='cart-elem__minus'>-</div><div class='cart-elem__count-text'>";
            resp += cartArr[i][1] + "</div><div onclick='cartElemPlus("+ i +")' class='cart-elem__plus'>+</div></div>";
            resp += "<div class='cart-elem__photo' style='background-image: url(\/assets\/img\/" + pizzasArr[i][1] + ")'></div>";
            resp += "<div class='cart-elem__text'><p class='cart-elem__title'>" + pizzasArr[test-1][2];
            resp += "</p></div><div class='cart-elem__rem'><p class='cart-elem__price'>" + Number(pizzasArr[test-1][5] * cartArr[i][1]).toFixed(2);
            resp += " $</p><p class='cart-elem__del'><i onclick='deleteElemCart(" + i + ")' class='fas fa-trash-alt'></i></p></div></div></div>";

            total = (+(total) + +((pizzasArr[test-1][5] * cartArr[i][1]).toFixed(2))).toFixed(2);
        }
        editTotal();
        return resp;
    })
}

function editTotal() {
    $('.cart-modal-total__price').empty()
    $(".cart-modal-total__price").text(total + ' $')
}

function cartElemPlus(elem) {
        cartArr[elem][1]++
        addToBucket()
}

function cartElemMinus(elem) {
    if(cartArr[elem][1] > 1) {
        cartArr[elem][1]--
        addToBucket()
    }
}