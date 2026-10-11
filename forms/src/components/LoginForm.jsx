import useForm from '../hooks/formHooks';

const LoginForm = () => {
  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = () => {
    console.log(inputs);
    // Kirjautuminen lisätään myöhemmin.
  };

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
