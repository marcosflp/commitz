const ExternalRedirect = (props) => {
  const { to } = props;
  window.location.href = to;
  return null;
};

export default ExternalRedirect;
