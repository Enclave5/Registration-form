import { useRef, useState } from 'react';
import styles from './app.module.css';

export function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const submitButtonRef = useRef(null);

	const onChangePassword = ({ target }) => {
		setPassword(target.value);

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error = 'Пароль должен состоять из латинских букв, цифр и нижнего подчеркивания';
		} else if (target.value.length > 20) {
			error = 'Пароль не дожен привышать 20 символов';
		}

		setErrorMessage(error);
	};

	const onChangePasswordRepeat = ({ target }) => {
		setRepeatPassword(target.value);

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error = 'Пароль должен состоять из латинских букв, цифр и нижнего подчеркивания';
		} else if (target.value.length > 20) {
			error = 'Пароль не дожен привышать 20 символов';
		}

		if (errorMessage !== null) {
			submitButtonRef.current.focus();
		}

		setErrorMessage(error);
	};

	const onBlurPassword = ({ target }) => {
		if (target.value.length < 8) {
			setErrorMessage('Пароль не дожен быть меньше 8 символов');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (repeatPassword !== password) {
			return setErrorMessage('Пароли должны совпадать');
		} else if (!/^[\w._-]+@[\w._-]+\.[comru]*$/.test(email)) {
			return setErrorMessage('Не верно введенный Email');
		}
		console.log({ email: email, password: password, repeatPassword: repeatPassword });
		// setEmail('');
		// setPassword('');
		// setRepeatPassword('');
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<div className={styles.container}>
					<h2 className={styles.h2}>Зарегистрироваться</h2>
					{errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

					<div className={styles.divForm}>
						<label>Email</label>
						<input
							className={styles.emailInput}
							type="email"
							name="email"
							value={email}
							onChange={({ target }) => setEmail(target.value)}
						/>
					</div>
					<div className={styles.divForm}>
						<label>Пароль</label>
						<input
							className={styles.passwordInput}
							type="password"
							name="password"
							value={password}
							onChange={onChangePassword}
							onBlur={onBlurPassword}
						/>
					</div>
					<div className={styles.divForm}>
						<label>Повторите пароль</label>
						<input
							className={styles.repeatPasswordInput}
							type="password"
							name="Repeat password"
							value={repeatPassword}
							onChange={onChangePasswordRepeat}
							onBlur={onBlurPassword}
						/>
					</div>
					<div className={styles.divButton}>
						<button
							ref={submitButtonRef}
							type="submit"
							disabled={errorMessage !== null}
							className={styles.button}
						>
							Зарегистрироваться
						</button>
					</div>
				</div>
				<div>Без использования React Hook Form и Yup</div>
			</form>
		</div>
	);
}
