import React from 'react';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useUserContext();

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <header>
      <h2><a href="/" className="logo-link">Tally Ho!</a></h2>
      { user && (
        <div>
          <p id="hello-message">Hello {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </header>
  );
}
