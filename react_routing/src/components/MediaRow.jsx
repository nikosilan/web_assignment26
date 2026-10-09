import PropTypes from 'prop-types';
import { Link } from 'react-router';

const MediaRow = ({ item }) => {
return ( <tr> <td>
<Link to="/single" state={{ item }}> <img
         src={item.thumbnail}
         alt={item.title}
         width="100"
       /> </Link> </td>


  <td>{item.title}</td>
  <td>{item.description}</td>
  <td>{item.created_at}</td>
  <td>{item.filesize}</td>
  <td>{item.media_type}</td>
</tr>


);
};

MediaRow.propTypes = {
item: PropTypes.object.isRequired,
};

export default MediaRow;
