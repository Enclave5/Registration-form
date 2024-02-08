import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';

const fieldScheme = yup.object().shape({
	email: yup
		.string()
		.email('Не верно введенный Email')
		.matches(/^[\w._-]+@[\w._-]+\.[comru]*$/, 'Не верно введенный Email'),
	password: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Пароль должен состоять из латинских букв, цифр и нижнего подчеркивания',
		)
		.max(20, 'Пароль не дожен привышать 20 символов')
		.min(8, 'Пароль не дожен быть меньше 8 символов'),
	passwordRepead: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Пароль должен состоять из латинских букв, цифр и нижнего подчеркивания',
		)
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.max(20, 'Пароль не дожен привышать 20 символов')
		.min(8, 'Пароль не дожен быть меньше 8 символов'),
});

export function Yup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRepead: '',
		},
		resolver: yupResolver(fieldScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passwordRepeadError = errors.passwordRepead?.message;

	const submitButtonRef = useRef(null);

	const onSubmit = (formData) => {
		// if (repeatPassword !== password) {
		// 	return setErrorMessage('Пароли должны совпадать');
		// }
		console.log(formData);
	};

	return (
		<div className={styles.yup}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.container}>
					<h2 className={styles.h2}>Зарегистрироваться</h2>

					<div className={styles.divForm}>
						<label>Email</label>
						<input
							className={styles.emailInput}
							type="email"
							name="email"
							{...register('email')}
						/>
						{emailError && <div className={styles.yupErrorMessage}>{emailError}</div>}
					</div>
					<div className={styles.divForm}>
						<label>Пароль</label>
						<input
							className={styles.passwordInput}
							type="password"
							name="password"
							{...register('password')}
						/>
						{passwordError && (
							<div className={styles.yupErrorMessage}>{passwordError}</div>
						)}
					</div>
					<div className={styles.divForm}>
						<label>Повторите пароль</label>
						<input
							className={styles.repeatPasswordInput}
							type="password"
							name="Repeat password"
							{...register('passwordRepead')}
						/>
						{passwordRepeadError && (
							<div className={styles.yupErrorMessage}>{passwordRepeadError}</div>
						)}
					</div>
					<div className={styles.divButton}>
						<button
							ref={submitButtonRef}
							type="submit"
							disabled={!!emailError || !!passwordError || !!passwordRepeadError}
							className={styles.button}
						>
							Зарегистрироваться
						</button>
					</div>
				</div>
				<div>C использованием React Hook Form и Yup</div>
			</form>
		</div>
	);
}
