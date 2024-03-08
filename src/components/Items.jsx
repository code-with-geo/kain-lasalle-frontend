import React, { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "../context/shop-context";

const Container = styled.div`
	padding: 20px;
`;

const Card = styled.div`
	padding: 15px;
	display: flex;
	flex-direction: column;
	border-radius: 12px;
	align-items: center;
	justify-content: center;
	box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
`;

const Images = styled.img`
	height: 200px;
	width: 200px;
	margin-bottom: 10px;
`;

const Label = styled.p`
	color: ${(props) => props.color};
	font-weight: ${(props) => props.fontWeight};
	font-size: ${(props) => props.fontSize};
	margin-bottom: ${(props) => props.marginBottom};
`;

const Button = styled.button`
	line-height: 2;
	padding: 10px;
	border-radius: 5px;
	border-style: none;
	background-color: #b0c5a4;
	color: #fff;
	cursor: pointer;
`;

export const Items = (props) => {
	const { id, productName, price, productImage } = props.data;
	const { addToCart, cartItems } = useContext(ShopContext);
	const cartItemAmount = cartItems[id];
	return (
		<>
			<Container>
				<Card>
					<Images src={productImage} />
					<Label color='#8c8c8c' fontWeight='600' fontSize='15px'>
						{productName}
					</Label>
					<Label
						color='#8c8c8c'
						fontWeight='400'
						fontSize='13px'
						marginBottom='10px'>
						PHP {price}
					</Label>
					<Button onClick={() => addToCart(id)}>
						Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
					</Button>
				</Card>
			</Container>
		</>
	);
};
