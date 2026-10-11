import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/apiHooks';

const Home = () => {
  const { mediaArray } = useMedia();

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
