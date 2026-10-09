
import PropTypes from 'prop-types';

const MediaRow = ({ item }) => {
  return (
    <tr>
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          width="120"
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description || '-'}</td>
      <td>
        {new Date(item.created_at).toLocaleDateString('fi-FI')}
      </td>
      <td>{item.filesize.toLocaleString('fi-FI')} bytes</td>
      <td>{item.media_type}</td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MediaRow;