import PropTypes from 'prop-types';

const SingleView = ({ item, onClose }) => {
if (!item) {
return null;
}

return ( <div className="modal" onClick={onClose}>
<div className="modal-content" onClick={(event) => event.stopPropagation()}> <button onClick={onClose}>Close</button>

    {item.media_type?.startsWith('video/') ? (
      <video src={item.filename} controls autoPlay />
    ) : (
      <img src={item.filename} alt={item.title} />
    )}

    <h2>{item.title}</h2>
    <p>{item.description}</p>
  </div>
</div>


);
};

SingleView.propTypes = {
item: PropTypes.object,
onClose: PropTypes.func.isRequired,
};

export default SingleView;
