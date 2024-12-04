'use client';

import { useSocket } from '@/context/SocketContext';
import VideoContainer from './VideoContainer';
import { useCallback, useEffect, useState } from 'react';
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md';

const VideoCall = () => {
  const { localStream, peer, ongoingCall } = useSocket();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);

  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);
    }
  }, [localStream, setIsVidOn]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream, setIsMicOn]);

  const isOnCall = localStream && peer && ongoingCall ? true : false;

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];
      setIsVidOn(videoTrack.enabled);
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream, setIsMicOn, setIsVidOn]);

  return (
    <div>
      <div className="mt-4 relative">
        {localStream && (
          <VideoContainer
            stream={localStream}
            isLocalStream={true}
            isOnCall={isOnCall}
          />
        )}
        {peer && peer.stream && (
          <VideoContainer
            stream={peer.stream}
            isLocalStream={false}
            isOnCall={isOnCall}
          />
        )}
      </div>
      <div className="mt-8 flex items-center justify-center">
        <button onClick={toggleMic}>
          {isMicOn ? <MdMicOff size={28} /> : <MdMic size={28} />}
        </button>
        <button className="px-4 py-2 bg-rose-500 text-white" onClick={() => {}}>
          End Call
        </button>
        <button onClick={toggleCamera}>
          {isVidOn ? <MdVideocamOff size={28} /> : <MdVideocam size={28} />}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
