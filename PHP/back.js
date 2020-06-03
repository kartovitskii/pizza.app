$(document).ready(function() {
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
                    res += "<div onclick='addToCart(" + pizzas.id[i] + ")' class='price__button'><i class='fas fa-shopping-cart'></i></div>";
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

let cartArr = []; //массив с ID блюда и его кол-вом
let countShop = Number($(".cart-button__count").text());
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
    cartArr.splice(elem, 1);
    countShop--;
    $(".cart-button__count").text(countShop);
    addToBucket();
}

function addToBucket() {
    $('.modal-cart__container').empty()
    $('.modal-cart__container').append(function() {
        let res = '';
        for(let i = 0; i < cartArr.length; i++) {
            res += pizzasArr[i][2] + " | " + cartArr[i][1] + " | " + pizzasArr[i][5] + " <p onclick='deleteElemCart(" + i + ")'>Del</p>";
        }
        return res;
    })
}