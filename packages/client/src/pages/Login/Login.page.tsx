import './login.page.scss';

import React, { useRef, FormEvent, useState } from 'react';
import { api } from '../../lib/API';
import { Redirect } from 'react-router';

export const LoginPage = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>();
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    // Reset the error on multiple login attempts
    setError(false);

    const data = await api.login(
      email.current!.value!,
      password.current!.value!
    );
    // If no token, set error to true
    if (!data) setError(true);
    setLoggedIn(true);
    localStorage.setItem('token', data.token);
  };

  if (loggedIn) return <Redirect to="/" />;

  return <main className="login">
    <form onSubmit={login}>
      <h1>Chat app</h1>
      {error && <span className="error">Incorrect login details</span>}
      <input ref={email} type="text" name="email" placeholder="Email" />
      <input ref={password} type="password" name="password" placeholder="Password" />
      <button>Login</button>
    </form>
  </main>;
};
