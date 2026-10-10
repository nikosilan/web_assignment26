import { Link, useLocation, useNavigate } from 'react-router';

const Single = () => {
const location = useLocation();
const navigate = useNavigate();
const item = location.state?.item;

if (!item) {
return ( <main> <h2>Media not found</h2> <Link to="/">Back to Home</Link> </main>
);
}

return ( <main className="single-view">
<button onClick={() => navigate(-1)}>Back</button>


  {item.media_type?.startsWith('video/') ? (
    <video
      src={item.filename}
      controls
      autoPlay
      style={{ maxWidth: '100%' }}
    />
  ) : (
    <img
      src={item.filename}
      alt={item.title}
      style={{ maxWidth: '100%' }}
    />
  )}

  <h2>{item.title}</h2>
  <p>{item.description}</p>
</main>


);
};

export default Single;
