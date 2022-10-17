import { useState } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import { Button } from '@chakra-ui/react';

export default function AuthPage() {
  const { type } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useUserContext();

  const authenticateUser = async () => {
    const userResponse = await authUser(email, password, type);
    setUser(userResponse);
    setEmail('');
    setPassword('');

  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <section className="authenticate-user">
      <div className="info">

        <label className="email"><input className="email" type="text" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="email" /></label>
        <input className="password" type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } placeholder="password" />
        <Button className="sign-in" type="submit" onClick={ authenticateUser }>{ type }</Button>
        {
          type === 'sign-in' ?
            <Link className="sign-in" to='/auth/sign-up'>sign-up</Link> :
            <Link className="sign-up" to='/auth/sign-in'>sign-in</Link>
        }
      </div>
      <h1>Please sign-in to continue:</h1>
    </section>
  );
}