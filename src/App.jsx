import { useEffect, useState } from "react";
import "./App.css";

function App() {
	console.log("render");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("Email cannot be empty");
	const [passwordError, setPasswordError] = useState(
		"Password cannot be empty"
	);
	const [emailIsDirty, setEmailIsDirty] = useState(false);
	const [passwordIsDirty, setPasswordIsDirty] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		console.log("useeffect");
		if (emailError || passwordError) {
			setFormIsValid(false);
		} else {
			setFormIsValid(true);
		}
	}, [emailError, passwordError]);

	const onEmailChange = (e) => {
		setEmail(e.target.value);
		setEmailIsDirty(false);

		const validEmailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

		if (!validEmailRegex.test(e.target.value)) {
			setEmailError("Email is not valid");

			if (!e.target.value) {
				setEmailError("Email cannot be empty");
			}
		} else {
			setEmailError("");
		}
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
		setPasswordIsDirty(false);

		const passwordLength = e.target.value.length;

		if (passwordLength < 3 || passwordLength > 8) {
			setPasswordError(
				"Password must conatain at least 3 and at most 8 characters"
			);

			if (!passwordLength) {
				setPasswordError("Password cannot be empty");
			}
		} else {
			setPasswordError("");
		}
	};

	const showValidationResult = (e) => {
		console.log("showValidationResult");
		console.log(e);
		if (e.type === "submit" && !formIsValid) {
			e.preventDefault();
			setEmailIsDirty(true);
			setPasswordIsDirty(true);
		}

		switch (e.target.name) {
			case "email":
				setEmailIsDirty(true);
				break;
			case "password":
				setPasswordIsDirty(true);
				break;
			default:
			// do nothing
		}
	};

	return (
		<div className="app">
			<form className="form" onSubmit={showValidationResult}>
				<div className="title">Sign up</div>
				<div className="input-container">
					{emailIsDirty && emailError && (
						<div className="error-message">{emailError}</div>
					)}
					<input
						className="input"
						name="email"
						type="text"
						placeholder="Enter your email"
						value={email}
						onChange={onEmailChange}
						onBlur={showValidationResult}
					/>
				</div>
				<div className="input-container">
					{passwordIsDirty && passwordError && (
						<div className="error-message">{passwordError}</div>
					)}
					<input
						className="input"
						name="password"
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={onPasswordChange}
						onBlur={showValidationResult}
					/>
				</div>
				<button
					className="btn-submit"
					type="submit"
					// disabled={!formIsValid}
				>
					Sign up
				</button>
			</form>
		</div>
	);
}

export default App;
