import Callnotification from '@/components/ui/CallNotification';
import ListOnlineUsers from '@/components/ui/ListOnlineUsers';

export default function Home() {
  return (
    <div>
      <ListOnlineUsers />
      <Callnotification />
    </div>
  );
}
