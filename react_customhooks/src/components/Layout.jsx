import { Link, Outlet } from 'react-router';

const Layout = () => {
return (
<> <header> <h1>My Media App</h1>


    <nav>
      <Link to="/">Home</Link>{' | '}
      <Link to="/profile">Profile</Link>{' | '}
      <Link to="/upload">Upload</Link>
    </nav>
  </header>

  <Outlet />
</>


);
};

export default Layout;
