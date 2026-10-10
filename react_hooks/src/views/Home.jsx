import { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import fetchData from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // Haetaan mediat API:sta
        const media = await fetchData(
          `${import.meta.env.VITE_MEDIA_API}/media`,
        );

        // Haetaan jokaisen median omistajan tiedot
        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const user = await fetchData(
              `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`,
            );

            return {
              ...item,
              username: user.username,
            };
          }),
        );

        // Tallennetaan mediat käyttäjänimineen
        setMediaArray(mediaWithUsers);
        console.log(mediaWithUsers);
      } catch (error) {
        console.error(
          'Could not fetch media or users:',
          error,
        );
      }
    };

    getMedia();
  }, []);

  return (
    <main>
      <h2>My Media</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Size</th>
              <th>Type</th>
              <th>Owner</th>
            </tr>
          </thead>

          <tbody>
            {mediaArray.map((item) => (
              <MediaRow
                key={item.media_id}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Home;
