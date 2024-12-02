'use client';

import { useSocket } from '@/context/SocketContext';

const CallNotification = () => {
  const { ongoingCall } = useSocket();

  if (!ongoingCall?.isRinging) return;
  return (
    <div className="absolute bg-slate-500 bg-opacity-70 w-screen h-screen top-0 bottom-0 flex items-center justify-center">
      someone is calling
    </div>
  );
};

export default CallNotification;
