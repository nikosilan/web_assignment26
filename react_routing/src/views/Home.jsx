import MediaRow from '../components/MediaRow';

const mediaArray = [
{
media_id: 8,
user_id: 5,
filename:
'https://placehold.co/1200x800?text=Picture+1',
thumbnail:
'https://placehold.co/320x240?text=Thumbnail+1',
filesize: 170469,
media_type: 'image/jpeg',
title: 'Picture 1',
description: 'This is a placeholder picture.',
created_at: '2024-01-07T20:49:34.000Z',
},
{
media_id: 9,
user_id: 7,
filename:
'https://placehold.co/800x600?text=Picture+2',
thumbnail:
'https://placehold.co/320x240?text=Thumbnail+2',
filesize: 1002912,
media_type: 'image/jpeg',
title: 'Picture 2',
description: 'Another placeholder picture.',
created_at: '2024-01-07T21:32:27.000Z',
},
{
media_id: 17,
user_id: 2,
filename:
'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
thumbnail:
'https://placehold.co/320x240?text=Video',
filesize: 1236616,
media_type: 'video/mp4',
title: 'Flower video',
description: 'A sample video.',
created_at: '2024-01-07T20:48:13.000Z',
},
];

const Home = () => {
return ( <main> <h2>My Media</h2>


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
        </tr>
      </thead>

      <tbody>
        {mediaArray.map((item) => (
          <MediaRow key={item.media_id} item={item} />
        ))}
      </tbody>
    </table>
  </div>
</main>


);
};

export default Home;
