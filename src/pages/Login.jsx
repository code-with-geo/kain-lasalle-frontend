import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Alert } from "@mui/material";
import { ToggleMessage } from "../components/SweetAlert.js";
import { useCookies } from "react-cookie";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 100px);
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #fff;
	border-radius: 5px;
	width: 350px;
	height: 350px;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
`;

const FormTitle = styled.p`
	color: #8c8c8c;
	font-size: 20px;
	font-weight: 600;
	text-transform: uppercase;
`;

const FormContent = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Label = styled.p`
	font-size: 12px;
	color: #8c8c8c;
	display: flex;
	align-items: center;
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-right: ${(props) => props.marginRight};
`;

const TextBox = styled.input`
	height: 40px;
	width: 250px;
	line-height: 28px;
	margin-bottom: 10px;
	padding: 0 1rem;
	border: 2px solid transparent;
	border-radius: 5px;
	outline: none;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);
	transition: 0.3s ease;
	border-color: #e2e8ec;

	::placeholder {
		color: #9e9ea7;
	}

	:focus {
		outline: none;
		border-color: #b0c5a4;
		background-color: #fff;
	}
`;

const Button = styled.button`
	padding: 10px;
	margin-top: 10px;
	width: 175px;
	height: 40px;
	background-color: #b0c5a4;
	border: none;
	cursor: pointer;
	color: #fff;
`;

const PageLinks = styled(Link)`
	color: #8c8c8c;
	text-decoration: none;
	font-size: 12px;
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
`;

const ErrorAlert = styled(Alert)`
	margin-bottom: 20px;
	width: 500px;
`;

function Login() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const navigate = useNavigate();
	const [_, setCookies] = useCookies(["access_token"]);

	const login = (data, event) => {
		event.preventDefault();
		try {
			Axios.post("http://localhost:3001/auth/login", {
				email: data.Email,
				password: data.Password,
			}).then((res) => {
				if (res.data.responsecode === "402") {
					ToggleMessage("error", res.data.message);
				} else if (res.data.responsecode === "200") {
					ToggleMessage("success", res.data.message);
					setCookies("access_token", res.data.token);
					window.localStorage.setItem("userID", res.data.userID);
					navigate("/");
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Container>
				<Content>
					<Header>
						<FormTitle>LOGIN</FormTitle>
					</Header>
					<FormContent onSubmit={handleSubmit(login)}>
						<TextBox
							type='text'
							placeholder='Enter your email'
							autoComplete='false'
							{...register("Email", {
								required: true,
								pattern:
									/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							})}
							aria-invalid={errors.Email ? "true" : "false"}
						/>
						<TextBox
							type='password'
							placeholder='Enter your password'
							autoComplete='false'
							{...register("Password", {
								required: true,
								minLength: 8,
								maxLength: 25,
							})}
							aria-invalid={errors.Password ? "true" : "false"}
						/>
						<Button type='submit'>Login</Button>
					</FormContent>

					<PageLinks marginRight='170px' marginTop='20px' to='/forgot'>
						Forget password?
					</PageLinks>
					<Label marginTop='20px' marginBottom='20px'>
						New member?{" "}
						<PageLinks marginLeft='5px' to='/signup'>
							Sign up
						</PageLinks>
					</Label>
					{errors.Email?.type === "required" && (
						<ErrorAlert severity='error' role='alert'>
							Email is required
						</ErrorAlert>
					)}
					{errors.Email?.type === "pattern" && (
						<ErrorAlert severity='error' role='alert'>
							Invalid email
						</ErrorAlert>
					)}
					{errors.Password?.type === "required" && (
						<ErrorAlert severity='error' role='alert'>
							Password is required
						</ErrorAlert>
					)}
					{errors.Password?.type === "minLength" && (
						<ErrorAlert severity='error' role='alert'>
							Password is minimum of 8 characters
						</ErrorAlert>
					)}
					{errors.Password?.type === "maxLength" && (
						<ErrorAlert severity='error' role='alert'>
							Password is maximum of 25 characters
						</ErrorAlert>
					)}
				</Content>
			</Container>
		</>
	);
}

export default Login;
