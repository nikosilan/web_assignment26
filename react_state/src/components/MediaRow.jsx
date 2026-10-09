import PropTypes from 'prop-types';

const MediaRow = ({ item, onSelect }) => {
return ( <tr> <td>
<button onClick={() => onSelect(item)}> <img src={item.thumbnail} alt={item.title} width="100" /> </button> </td> <td>{item.title}</td> <td>{item.description}</td> <td>{item.created_at}</td> <td>{item.filesize}</td> <td>{item.media_type}</td> </tr>
);
};

MediaRow.propTypes = {
item: PropTypes.object.isRequired,
onSelect: PropTypes.func.isRequired,
};

export default MediaRow;
