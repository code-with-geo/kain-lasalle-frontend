import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PRODUCTS } from "../Products";
import { ShopContext } from "../context/shop-context";
import { CartItem } from "../components/CartItem";

const Container = styled.div`
	margin: auto;
	max-width: 80%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 20px;
`;

const Label = styled.p``;

const CartItems = styled.div``;
function Cart() {
	const { cartItems } = useContext(ShopContext);
	console.log(cartItems);
	return (
		<>
			<Container>
				<Label>Your Cart</Label>

				<CartItems>
					{PRODUCTS.map((product) => {
						if (cartItems[product.id] !== 0) {
							return <CartItem data={product} />;
						}
					})}
				</CartItems>
			</Container>
		</>
	);
}

export default Cart;
