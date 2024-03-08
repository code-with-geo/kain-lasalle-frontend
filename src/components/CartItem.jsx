import React, { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "../context/shop-context";

const Container = styled.div`
	padding: 10px;
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 500px;
	border-radius: 12px;
	box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
`;

const ImageContainer = styled.div`
	padding: 10px;
`;

const Images = styled.img`
	width: 150px;
	height: 150px;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: left;
	margin-right: 20px;
`;

const Label = styled.p`
	color: ${(props) => props.color};
	font-weight: ${(props) => props.fontWeight};
	font-size: ${(props) => props.fontSize};
	margin-bottom: ${(props) => props.marginBottom};
`;

const Button = styled.button`
	line-height: 1;
	padding: 9px;
	border-style: none;
	background-color: #b0c5a4;
	color: #fff;
	cursor: pointer;
`;

const TextBox = styled.input`
	padding: 4px;
	width: 50px;
	text-align: center;
`;

const Wrapper = styled.div`
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const CartItem = (props) => {
	const { id, productName, price, productImage } = props.data;
	const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
	return (
		<>
			<Container>
				<ImageContainer>
					<Images src={productImage} />
				</ImageContainer>
				<Details>
					<Label color='#8c8c8c' fontSize='15px' fontWeight='600'>
						{productName}
					</Label>
					<Label color='#8c8c8c' fontSize='12px' fontWeight='600'>
						PHP {price}
					</Label>
					<Wrapper>
						<Button
							onClick={() => {
								removeFromCart(id);
							}}>
							-
						</Button>
						<TextBox value={cartItems[id]} />
						<Button
							onClick={() => {
								addToCart(id);
							}}>
							+
						</Button>
					</Wrapper>
				</Details>
			</Container>
		</>
	);
};
