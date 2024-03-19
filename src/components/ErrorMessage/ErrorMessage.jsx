import PropTypes from "prop-types";

export default function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️{message}</span>
    </p>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
