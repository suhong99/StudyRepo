import { User } from '@clerk/nextjs/server';
import { Instance } from 'simple-peer';

export type SocketUser = {
  userId: string;
  socketId: string;
  profile: User;
};

export type OngoingCall = {
  participants: Participants;
  isRinging: boolean;
};

export type Participants = {
  caller: SocketUser;
  receiver: SocketUser;
};

export type PeerData = {
  peerConnection: Instance;
  stream: MediaStream | undefined;
  partipantUser: SocketUser;
};
