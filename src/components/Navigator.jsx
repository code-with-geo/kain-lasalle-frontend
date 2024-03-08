import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const Container = styled.div`
	position: sticky;
	z-index: 999;
	top: 0px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	height: 80px;
	background-color: #b0c5a4;
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	justify-content: right;
	align-items: center;
`;

const List = styled.ul`
	margin-right: 20px;
	display: flex;
	list-style: none;
`;

const ListItem = styled.li`
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Links = styled(Link)`
	color: #ffff;
	text-transform: uppercase;
	text-decoration: none;
`;

const Button = styled.button`
	padding: 10px;
	line-height: 2;
	background-color: #b0c5a4;
	border: none;
	cursor: pointer;
	color: #fff;
`;

export const TopNav = () => {
	const [cookies, setCookies] = useCookies(["access_token"]);

	const logout = () => {
		setCookies("access_token", "");
		window.localStorage.clear();
	};

	return (
		<>
			<Container>
				<Left></Left>
				<Right>
					{!cookies.access_token ? (
						<List>
							<ListItem>
								<Links to='/'>home</Links>
							</ListItem>
							<ListItem>
								<Links to='/shop'>shop</Links>
							</ListItem>
							<ListItem>
								<Links to='/about'>about</Links>
							</ListItem>
							<ListItem>
								<Links to='/login'>login</Links>
							</ListItem>
						</List>
					) : (
						<List>
							<ListItem>
								<Links to='/'>home</Links>
							</ListItem>
							<ListItem>
								<Links to='/shop'>shop</Links>
							</ListItem>
							<ListItem>
								<Links to='/cart'>cart</Links>
							</ListItem>
							<ListItem>
								<Button onClick={logout}>Logout</Button>
							</ListItem>
						</List>
					)}
				</Right>
			</Container>
		</>
	);
};
