function ImgDetails(props) {
  const { urlImg } = props;
  return <img src={urlImg} alt="origin images" width={900} />;
}

export default ImgDetails;
