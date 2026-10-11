import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = () => {
    console.log(inputs);
    // Rekisteröinti lisätään myöhemmin.
  };

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doRegister, initValues);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            id="registeruser"
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            id="registeremail"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            id="registerpassword"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
