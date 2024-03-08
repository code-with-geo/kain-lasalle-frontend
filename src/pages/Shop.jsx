import React from "react";
import styled from "styled-components";
import { PRODUCTS } from "../Products";
import { Items } from "../components/Items";

const Container = styled.div`
	margin: auto;
	max-width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 100%;
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
`;
function Shop() {
	return (
		<>
			<Container>
				<Wrapper>
					{PRODUCTS.map((product) => {
						return <Items data={product} />;
					})}
				</Wrapper>
			</Container>
		</>
	);
}

export default Shop;
