'use client';

import { useEffect, useRef } from 'react';

interface iVideoContainer {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
}

const VideoContainer = ({
  stream,
  isLocalStream,
  inOnCall,
}: iVideoContainer) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      className="rounded border w-[800px]"
      autoPlay
      playsInline
      muted={isLocalStream}
      ref={videoRef}
    />
  );
};

export default VideoContainer;
