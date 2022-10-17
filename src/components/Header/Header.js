import React from 'react';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import { Redirect } from 'react-router-dom';
import './Header.css';

export default function Header() {

  const { user, setUser } = useUserContext();

  const handleSignout = async () => {
    await signOut();
    setUser(null);
  };

  if (!user) return <Redirect to="/auth/sign-in" />;

  return (
    <section className="header-container">
      { user && (
        <div className="header-wrapper">
          <ul className="header">
            <li className="list-item">
              <a className="header-logo" href="/">tally-ho</a>
            </li>
            <li className="list-item">
              <a href="/new-trip">new trip</a>
            </li>
            <li className="list-item">
              <a href="/">back home</a>
            </li>
            <li className="list-item">
              <span className="header-email" key={ user.id }>signed in as: { user.email }</span>
            </li>
            <li className="list-item">
              <button className="header-signout" onClick={ handleSignout }>signout</button>
            </li>

            <li className="list-item">

            </li>
          </ul>
        </div>
      )}
    </section>
  );
}