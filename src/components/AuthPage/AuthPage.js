import { useState } from 'react';
import {Redirect, useParams, NavLink } from 'react-router-dom';
import { authUser } from "../../services/auth";

export default function AuthPage() {
  const { type } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authenticateUser = async () => {
    const userResponse = await authUser(email, password, type);
    setUser(userResponse);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return;
  <>
      <div className="email-wrap">
        <input type="text" className="email" onChange={ (e) => setEmail(e.target.value) } placeholder="email"/>
      </div>
      <div className="password-wrap">
        <input type="text" className="password" onChange={ (e) => setPassword(e.target.value) } placeholder="password" />
      </div>
      <div className="button-wrap">
        <button className="auth-button">{ type }</button>
      </div>
    {
      type === 'sign-in' ?
        <NavLink className='auth-link' to='/auth/sign-up'>sign-up</NavLink> :
        <NavLink className='auth-link' to='/auth/sign-in'>sign-in</NavLink>
    }
    <h1>Please sign-in to continue:</h1>
  </>;
}