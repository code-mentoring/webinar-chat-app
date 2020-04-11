import './signup.page.scss';

import React, { useRef, FormEvent, useState } from 'react';
import { api } from '../../lib/API';
import { Redirect } from 'react-router';

export const SignupPage = () => {
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>();
  const [loggedIn, setLoggedIn] = useState(false);

  const signup = async (e: FormEvent) => {
    e.preventDefault();

    // Reset the error on multiple login attempts
    setError(false);

    await api.signup(
      firstName.current!.value!,
      lastName.current!.value!,
      email.current!.value!,
      password.current!.value!
    );

    const data = await api.login(email.current!.value!, password.current!.value!);

    // If no token, set error to true
    if (!data) setError(true);
    setLoggedIn(true);
    localStorage.setItem('token', data.token);
  };

  if (loggedIn) return <Redirect to="/" />;

  return <main className="login">
    <form onSubmit={signup}>
      <h1>Signup to Chat app</h1>
      {error && <span className="error">Could not signup</span>}
      <input ref={firstName} type="text" name="firstName" placeholder="First name" />
      <input ref={lastName} type="text" name="lastName" placeholder="Last name" />
      <input ref={email} type="text" name="email" placeholder="Email" />
      <input ref={password} type="password" name="password" placeholder="Password" />
      <button>Login</button>
    </form>
  </main>;
};
