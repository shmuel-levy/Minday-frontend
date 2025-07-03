import { useRef } from 'react';

// one shared variable for the whole module
let currentPlaying = null;

export function AiVideoCard({ poster, src, title, blurb, comingSoon }) {
  const vid = useRef(null);

  /* ---------- helpers ---------- */
  const play = () => {
    // stop whatever was playing before
    if (currentPlaying && currentPlaying !== vid.current) {
      resetVideo(currentPlaying);
    }
    currentPlaying = vid.current;
    vid.current?.play();
  };

  const reset = () => {
    resetVideo(vid.current);
    currentPlaying = null;
  };

  /* ---------- jsx ---------- */
  return (
    <div className="ai-card" onMouseEnter={play} onMouseLeave={reset}>
      <video
        ref={vid}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
      />

      <div className="ai-copy">
        {comingSoon && <span className="pill">Coming&nbsp;Soon</span>}
        <h3>
          {title}
          <span className="spark">
            <img src="https://dapulse-res.cloudinary.com/image/upload/v1741871808/aistars.png" />
          </span>
        </h3>
        <p>{blurb}</p>
      </div>
    </div>
  );
}

/* util – pause, rewind, and make the poster visible again */
function resetVideo(el) {
  if (!el) return;
  el.pause();
  el.currentTime = 0;
  el.load();            // forces browser to show poster frame
}