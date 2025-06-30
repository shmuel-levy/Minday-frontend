import loaderGif from '../assets/img/loader.gif';


export function Loader({ size = 96, text = '' }) {
  return (
    <div className="loader-container">
      <img
        src={loaderGif}
        alt="Loading..."
        className="loader-img"
        style={{ width: size, height: size }}
      />
      {text && <div className="loader-text">{text}</div>}
    </div>
  );
} 