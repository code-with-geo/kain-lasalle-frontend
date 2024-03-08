import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Alert } from "@mui/material";
import { ToggleMessage } from "../components/SweetAlert.js";

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
	margin-bottom: ${(props) => props.marginBottom};
`;

const ErrorAlert = styled(Alert)`
	margin-bottom: 20px;
	width: 500px;
`;

function ResetPassword() {
	const { id, token } = useParams();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const navigate = useNavigate();

	const ResetPassword = (data, event) => {
		event.preventDefault();
		try {
			if (data.Password === data.ConfirmPassword) {
				Axios.post(`http://localhost:3001/auth/${id}/reset/${token}`, {
					password: data.Password,
				})
					.then((res) => {
						if (res.data.responsecode === "402") {
							ToggleMessage("error", res.data.message);
							navigate("/login");
						} else if (res.data.responsecode === "200") {
							ToggleMessage("success", res.data.message);
							navigate("/login");
						}
					})
					.catch((err) => {
						if (err.response) Error();
					});
			} else {
				ToggleMessage("error", "Password not match.");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Container>
				<Content>
					<Header>
						<FormTitle>reset password</FormTitle>
					</Header>
					<FormContent onSubmit={handleSubmit(ResetPassword)}>
						<Label marginBottom='20px'>Please enter your new password.</Label>
						<TextBox
							type='password'
							placeholder='Enter your new password'
							autoComplete='false'
							{...register("Password", {
								required: true,
								minLength: 8,
								maxLength: 25,
							})}
							aria-invalid={errors.Password ? "true" : "false"}
						/>
						<TextBox
							type='password'
							placeholder='Confirm password'
							autoComplete='false'
							{...register("ConfirmPassword", {
								required: true,
								minLength: 8,
								maxLength: 25,
							})}
							aria-invalid={errors.ConfirmPassword ? "true" : "false"}
						/>
						<Button type='submit' marginBottom='20px'>
							Reset
						</Button>
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
					</FormContent>
				</Content>
			</Container>
		</>
	);
}

export default ResetPassword;
