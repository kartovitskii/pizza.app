$(document).ready(function() {
    $('.finishSend').click(function() {
        let numberOrder = $('#phoneNumSend').val();
        $('#phoneNumSend').val('');
    
        saveOrder(numberOrder)
    })

    pizzasArr = [];
    addArr = [];
    ordArr = [];

    $(".reg-button").bind("click", function() {
        $('.myOrders').empty()
        let number = $('#phoneNum').val();
        $('#phoneNum').val('');

        $.ajax({
                url: "actions/getOrders.php", 
                type: "POST",
                data: {number: number},
                dataType: 'json',
                success: function(orders) {
                    ordArr = [];
                    ordArr.push(orders)
                    let res = ''
                    $('.myOrders').append(function() {
                        if(ordArr[0] != null) {
                    for(i=0; i < ordArr[0].uoroder.length; i++) {
                        let reArr = ordArr[0].uoroder[i].replace(/[\"[\]"]/g, '').split(',');
                        let a = 0;
                        res += "<div style='padding-bottom: 10px; margin-right: 25px; margin-left: 25px; margin-bottom: 20px; border-bottom: 2px solid #FDCB6E;'><p style='font-weight: bold; font-size: 16 px;'>Order №" + i + "</p>";
                        for(d=0; d < reArr.length / 4; d++) {
                            let elemArr = reArr.slice(a,a+4);
                            a += 4;
                            res += "<div style='padding: 10px 0px;'><b>"+ elemArr[0] + "</b>, - " + elemArr[1] + " pcs<br>" + elemArr[2] + ", " + elemArr[3] + "</div>";
                        }
                        res += "</div>"
                    }
                    }
                    return res;
                })
                }
        })
    return false;
    });

    $.ajax({    
        url: "actions/getPizzas.php", 
        type: "GET",
        success: function(pizzas) {
            $('.swiper-wrapper').append(function() {
                let res = "";
                for(let i = 0; i < pizzas.id.length; i++) {
                    pizzasArr.push([pizzas.id[i], pizzas.url[i], pizzas.title[i], pizzas.description[i], pizzas.kkal[i], pizzas.sprice[i], pizzas.lprice[i]]);
                    res += "<div class='swiper-slide' >";
                    res += "<div class='pizza'><div onclick='openPizza(" + Number(pizzas.id[i] - 1) +")'>";
                    res += "<div class='pizza__photo' style='background-image: url(\/assets\/img\/" + pizzas.url[i] + ")'></div>"
                    res += "<p class='pizza__title'>" + pizzas.title[i] + "</p>";
                    res += "<p class='pizza__desc'>" + pizzas.description[i] + "</p>";
                    res += "<p class='pizza__kkal'><i class='fas fa-fire pizza__kkal-logo'></i> " + pizzas.kkal[i] + " kkal</p></div>"; 
                    res += "<div class='price'><div class='price__text'>" + pizzas.lprice[i] + " $ / 1 pcs</div>";
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
    
    $.ajax({
        url: "actions/getAdd.php", 
        type: "GET",
        success: function(add) {
                for(let i =0; i < add.id.length; i++) {
                    addArr.push([add.id[i], add.url[i], add.title[i], add.price[i]]);
                }
                return;
        }
    });


// Modal
$('.open-go').click(function() {
    openModal('modal-go')
    closeModal('modal-cart')
})
$('.close-go').click(function() {
    closeModal('modal-go')
    openModal('modal-cart')
})
.children().click(function(e){
    e.stopPropagation();
});






$('.burger-button').click(function() {
    openModal('modal-history')
})
$('.close-history').click(function() {
    closeModal('modal-history')
})
.children().click(function(e){
    e.stopPropagation();
});

    $('.cart-button').click(function() {
        openModal('modal-cart')
    })

    $('.close-detail').click(function() {
        closeModal('modal-detail')
        addiText = 'No additives';
        addiPrice = 0;
    })
    .children().click(function(e){
        e.stopPropagation();
    });

    $('.close-modal').click(function() {
        closeModal('modal-cart')
    })
    .children().click(function(e){
        e.stopPropagation();
    });
    
})
let countDetail = 1;
let pizzaSize = true;

function openPizza(elem) {
    $('.detail-content').empty()
    $('.detail-content').append(function() { 
        let res='';
        let i = elem;
        res += "<div class='detail-pizza'><div class='detail-pizza__image' style='background-image: url(\/assets\/img/" + pizzasArr[i][1] + ")'></div>";
        res += "<div class='detail-pizza__text'><div class='detail-pizza__title'>" + pizzasArr[i][2] + "</div>";
        res += "<div class='detail-pizza__kkal'><i class='fas fa-fire pizza__kkal-logo'></i>" + pizzasArr[i][4] + " kkal</div>";
        res += "<div class='detail-pizza__desc'>" + pizzasArr[i][3] + "</div>";
        res += "<div class='detail-pizza__count'>";
        res += "<div class='detail-pizza__minus' onclick='countDetailMinus()'>-</div><div class='detail-pizza__number'>1</div><div onclick='countDetailPlus()' class='detail-pizza__plus'>+</div></div></div>";
        res += "<div onclick='pizzaSizeF()' class='pizza-size'><span class='pizza-size__small'>Small ("+ pizzasArr[i][5] + " $)</span><span class='pizza-size__large pizza-size__active'>Large ("+ pizzasArr[i][6] + " $)</span></div>";
        res += "<p class='pizza-additives-title'>Additives</p>";
        for(a=0; a < addArr.length; a++) {
        res += "<div class='additives'>";
        res += "<div class='additives__photo' style='background-image: url(\/assets\/img\/" + addArr[a][1] + "'></div>";
        res += "<div class='additives__name'>" + addArr[a][2] + " <span class='additives__price'>(" + addArr[a][3] + " $)</span></div>";
        res += "<div class='additives__btn'>";
        res += "<div id='addDisactive" + a + "' onclick='additives(" + a + ")' class='additives__disact'>Add</div>";
        res += "<div id='addActive" + a + "' onclick='deleteadditives(" + a + ")' style='display: none;' class='additives__disact additives__act'><i class='fas fa-times'></i></div>";
        res += "</div></div>"
        }
        res += "<div onclick='added(" + pizzasArr[i][0] + "," + countDetail + "," + pizzaSize + ")' class='cart-modal-total added'><div class='cart-modal-total__button'>Add to cart</div></div>"

        return res;
    })
    countDetail = 1;
    openModal('modal-detail');
    $('.pizza-size').click(function() {
        if($('.pizza-size__small').hasClass('pizza-size__active')) {
            $('.pizza-size__large').addClass('pizza-size__active');
            $('.pizza-size__small').removeClass('pizza-size__active');
        } else if ($('.pizza-size__large').hasClass('pizza-size__active')) {
            $('.pizza-size__small').addClass('pizza-size__active');
            $('.pizza-size__large').removeClass('pizza-size__active');
        }
    })
}
let addiText = 'No additives';
let addiPrice = 0;
let textOrder = [];
function additives(elem) {
    if (addiText === 'No additives' && addiPrice === 0) {
        addiText = '';
        addiPrice = 0;
    }
        addiText += addArr[elem][2] + " / ";
        addiPrice = +addiPrice + +addArr[elem][3]

        $('#addDisactive' + elem).hide();
        $('#addActive' + elem).show();
        console.log(addiText);
        console.log(addiPrice);
}
function rubEurDoll() {
$.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {

    let usd = data.Valute.USD.Value.toFixed(2);
    let eur = data.Valute.EUR.Value.toFixed(2);
    let totalEur = (total * usd / eur).toFixed(2); 
    editTotal(totalEur);
});
}
function deleteadditives(elem) {
    let item = new RegExp(addArr[elem][2] + '\ \/\ ');
    if (addiText.includes(addArr[elem][2])) {
        addiText = addiText.replace(item, '');
        addiPrice = +addiPrice - +addArr[elem][3];
    }
    $('#addDisactive' + elem).show();
        $('#addActive' + elem).hide();
        console.log(addiText);
        console.log(addiPrice);
}
function countDetailPlus() {
    countDetail++
    $('.detail-pizza__number').text(countDetail);
}

function countDetailMinus() {
if(countDetail > 1) {
    countDetail--
    $('.detail-pizza__number').text(countDetail);
}
}
function pizzaSizeF() {
    pizzaSize = !pizzaSize
    console.log(pizzaSize)
}
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
            if(cartArr[i][0] === id && cartArr[i][2] === pizzaSize && cartArr[i][3] === addiText && cartArr[i][4] === addiPrice) {
                cartArr[i][1]++;
                addToBucket()
                return;
            } 
        }
        cartArr.push([id, 1, true, addiText, addiPrice]);
        countShop++;
        addToBucket()
    } else {
        cartArr.push([id, 1, true, addiText, addiPrice]);
        countShop++;
        addToBucket()
    }
    console.log(cartArr);
    $(".cart-button__count").text(countShop);
}
function added(id) {
    if(cartArr.length > 0) {
        for(let i = 0; i < cartArr.length; i++) {
            if(cartArr[i][0] === id && cartArr[i][2] === pizzaSize && cartArr[i][3] === addiText && cartArr[i][4] === addiPrice) {
                cartArr[i][1] += +countDetail;
                cartArr[i][2] = pizzaSize;
                clr();
                addToBucket()
                return;
            } 
        }
        cartArr.push([id, countDetail, pizzaSize, addiText, addiPrice]);
        clr();
        countShop++;
        addToBucket()
    } else {
        cartArr.push([id, countDetail, pizzaSize, addiText, addiPrice]);
        clr();
        countShop++;
        addToBucket()
    }
    console.log(cartArr);
    $(".cart-button__count").text(countShop);
}
function clr() {
    addiText = 'No additives';
    addiPrice = 0;
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
        textOrder = [];
        for(let i = 0; i < cartArr.length; i++) {
            let test = cartArr[i][0];
            let piSize = '(Large)';
            let piPrice = pizzasArr[test-1][6];
            if (cartArr[i][2] === false) {
                piSize = '(Small)';
                piPrice = pizzasArr[test-1][5];
            }
            resp += "<div class='row'><div class='col cart-elem'><div class='cart-elem__count'><div onclick='cartElemMinus("+ i +")' class='cart-elem__minus'>-</div><div class='cart-elem__count-text'>";
            resp += cartArr[i][1] + "</div><div onclick='cartElemPlus("+ i +")' class='cart-elem__plus'>+</div></div>";
            resp += "<div class='cart-elem__photo' style='background-image: url(\/assets\/img\/" + pizzasArr[test-1][1] + ")'></div>";
            resp += "<div class='cart-elem__text'><p class='cart-elem__title'>" + pizzasArr[test-1][2] + " " + piSize;
            resp += "</p><p style='margin-top: 5px;' class='cart-elem__price'>" + cartArr[i][3] + "</p></div><div class='cart-elem__rem'><p class='cart-elem__price'>" + Number((piPrice * cartArr[i][1]) + (cartArr[i][1] * cartArr[i][4])).toFixed(2) + "$";
            resp += "</p><p class='cart-elem__del'><i onclick='deleteElemCart(" + i + ")' class='fas fa-trash-alt'></i></p></div></div></div>";

            total = (+(total) + +(cartArr[i][1] * cartArr[i][4]) + +((piPrice * cartArr[i][1]).toFixed(2))).toFixed(2);

            textOrder.push([pizzasArr[test-1][2] + " " + piSize, cartArr[i][1], cartArr[i][3], Number((piPrice * cartArr[i][1]) + (cartArr[i][1] * cartArr[i][4])).toFixed(2) + "$"])
        }
        rubEurDoll();
        return resp;
    })
}

function editTotal(totalEur) {
    $('.cart-modal-total__price').empty()
    $(".cart-modal-total__price").html(total + " $ <span style='font-size: 14px; position: relative; top: -1px; opacity: 0.6; font-weight: 400;'> / " + totalEur + " €</span>")
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

function saveOrder(numberOrder) {
    let num = numberOrder;
    if (textOrder.length > 0 || num === '') {
        $.ajax({
            url: "actions/saveOrder.php",
            type: "POST",
            data: {num: num,  textOrder:  textOrder },
            dataType: 'json',
    } ) 
        location.reload();
    } else {
        alert('Your cart is empty!')
    }
}

