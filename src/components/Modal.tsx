import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/actions";
import { auth } from "../redux/actions";
const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const [inputLogin, setInputLogin] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
    const [emailWarning, setEmailWarning] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [passwordlValid, setPasswordValid] = useState<boolean>(false);

    const login = {
        value: inputLogin,
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        touched: false,
    };
    const password = {
        value: inputPassword,
        type: "password",
        label: "password",
        errorMessage: "Минимум 6 символов",
        touched: false,
    };
    const regEx = (): boolean => {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
        return re.test(String(inputLogin).toLocaleLowerCase());
    };
    const validatePassword = (): void => {
        if (inputPassword.length > 4) {
            setPasswordValid(true);
        }
        if (password.touched && !passwordlValid) {
            setPasswordWarning(true);
            return;
        }
        setPasswordWarning(false);
    };
    const validateEmail = (): void => {
        if (regEx()) {
            setEmailValid(true);
        }
        if (login.touched && !emailValid) {
            setEmailWarning(true);
            return;
        }
        setEmailWarning(false);
    };
    const enterHandler = (): void => {
        dispatch(auth(inputLogin, inputPassword, true));
    };
    const closeModalHandler = (): void => {
        dispatch(closeModal());
    };
    const loginInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        login.touched = true;
        validateEmail();
        setInputLogin(event.target.value);
    };
    const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        password.touched = true;
        validatePassword();
        setInputPassword(event.target.value);
    };

    const overlayСloseModalHandler = (event: any): void => {
        if (event.target.dataset.exit) {
            closeModalHandler();
        }
    };
    const registerHandler = (): void => {
        dispatch(auth(inputLogin, inputPassword, false));
    };

    const checkDisabled = (): void => {
        if (emailValid && passwordlValid) {
            setDisabled(false);
        }
    };
    useEffect(() => {
        checkDisabled();
        validateEmail();
    }, [emailValid]);
    useEffect(() => {
        checkDisabled();
        validatePassword();
    }, [passwordlValid]);

    return (
        <div className="overlay" data-exit="true" onClick={overlayСloseModalHandler}>
            <div className="mmodal">
                <div className="mmodal__title">
                    <h2>Авотризация</h2>
                </div>
                <div className="mmodal__content">
                    <form onSubmit={closeModalHandler}>
                        <p className="mmodal__input">
                            <label htmlFor="login">Email</label>
                            <input id="login" type="text" value={login.value} onChange={loginInputHandler} />
                            {emailWarning ? <span className="warning">{login.errorMessage}</span> : null}
                        </p>
                        <p className="mmodal__input">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password.value}
                                onChange={passwordInputHandler}
                            />
                            {passwordWarning ? <span className="warning">{password.errorMessage}</span> : null}
                        </p>
                    </form>
                </div>
                <div className="mmodal__footer">
                    <button className="btn" onClick={enterHandler} disabled={disabled}>
                        Войти
                    </button>
                    <button className="btn" onClick={registerHandler} disabled={disabled}>
                        Регистрация
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
