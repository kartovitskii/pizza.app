<!DOCTYPE html>
<html lang="ru">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="icon" href="./favicon.png">
		<link rel="stylesheet" href="./assets/css/style.css">
		<link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css">

		<script src="https://kit.fontawesome.com/a4e9fd4a21.js" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
		<script type="text/javascript" src="./assets/js/script.vendors.js"></script>
		<script type="text/javascript" src="./assets/js/script.app.js"></script>
		<script src="back.js"></script>
		<title>Pizza - Il'ia Kartovitskii</title>

		<style>
			#modal-detail {
				z-index: 99999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #18160256;
    box-sizing: border-box;
    display: none;
			}
			.cart-modal-total {
				max-width: 718px;
			}
			.added {
				margin: 0;
				padding-top: 0;
			}
			.modal-cart__container {
				padding-bottom: 115px;
			}
			#modal-history {
				display: none;
			}
			.reg-input {
    width: 100%;
    height: 40px;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 3px;
    padding: 0 15px;
    line-height: 40px;
    font-size: 12px;
    box-sizing: border-box;
}
.reg-input:focus {
    border-color:rgb(66, 66, 66);
}
.reg-input-container {
    margin-top: 15px;
    font-size: 12px;
	text-align: left;
	padding: 0 25px;
}
.reg-input-container label {
    position: relative;
    left: 16px;
    top: 8px;
    background: #fff;
    padding: 0 10px;
    text-align: center;
    color: rgb(105, 105, 105);
}
.reg-button {
	height: 36px;
	line-height: 36px;
	width: calc(100% - 50px);
	margin: 15px 25px;
	text-align: center;
	border: none;
	background: #FDCB6E;
	color: #2d3436;
    font-size: 16px;
	font-weight: 600;
	border-radius: 3px;
}
.myOrders {
	margin-top: 20px;
}
#modal-go {
	display: none;
}
.free-delivery {
	text-align: right;
    padding: 0 25px;
    font-size: 14px;
    opacity: 0.6;
    margin-top: 15px;
}
		</style>
	</head>

	<body>

	<div id="modal-go" class="close-modal close-go">
			<div class="modal-cart__container">
			<div class="cart-modal-header">
			<i class="fas fa-chevron-left close-go"></i>
		</div>	
		<form method="post" action="#">
		<div class="reg-input-container">
            <label for="phoneNumSend">Number</label>
			<input id="phoneNumSend" type="number" class="reg-input">
		</div>
		<div class="reg-input-container">
            <label for="nameNum">Name</label>
			<input id="nameNum" type="text" class="reg-input">
		</div>
		<div class="reg-input-container">
            <label for="addressNum">Address</label>
			<input id="addresNum" type="text" class="reg-input">
		</div>

		<p class="free-delivery">Free Delivery</p>
		<input type="button" value="Send order" class="reg-button finishSend" id="button"> 
		</form>
	
			</div>
		</div>


	<!-- -->

	<div id="modal-history" class="close-modal close-history">
			<div class="modal-cart__container">
			<div class="cart-modal-header">
			<i class="fas fa-chevron-left close-history"></i>
		</div>	
		<form method="post" action="#">
		<div class="reg-input-container">
            <label for="phoneNum">Number</label>
			<input id="phoneNum" type="text" class="reg-input">
		</div>
		<input type="button" value="Send request" class="reg-button" id="button"> 
		</form>
		<div class="myOrders"></div>
			</div>
		</div>


		<div id="modal-detail" class="close-modal close-detail">
			<div class="modal-cart__container">
				
		<div class="cart-modal-header">
			<i class="fas fa-chevron-left close-detail"></i>
		</div>
		<div class="detail-content">
		
		</div>
	</div>

			</div>
		</div>

		<div id="modal-cart" class="close-modal">
			<div class="modal-cart__container">
				<div class="cart-modal-header">
					<i class="close-modal fas fa-chevron-left"></i>
				</div>
				<div class="cnt-cart">

				</div>
		
				<div class="cart-modal-total">
					<span class="cart-modal-total__text">Total</span><span class="cart-modal-total__price">0.00 $ <span style='font-size: 14px; position: relative; top: -1px; opacity: 0.6; font-weight: 400;'> / 0.00 €</span></span>
					<div class="cart-modal-total__button open-go">Confirm</div>
				</div>


			</div>
		</div>


		<div class="header">
			<div class="container">
				<div class="burger-button">
					<hr class="burger-button__line">
					<hr class="burger-button__line burger-button__line-center">
					<hr class="burger-button__line">
				</div>
				<div class="cart-button">
					<div class="cart-button__count">0</div>
					<i class="fas fa-shopping-cart"></i>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="block-title">
				<p class="block-title__text">Our menu</p>
				<p class="block-title__subtext">Our pizza is prepared from the freshest ingredients and with huge love</p>
			</div>
			<div class="swiper-container">
				<div class="swiper-wrapper"></div>
			</div>
		</div>
		<script src="https://unpkg.com/swiper/js/swiper.min.js"></script>

		<?
			include 'actions/preload.php'; 
		?>
	</body>
</html>