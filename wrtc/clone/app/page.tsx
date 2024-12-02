import Callnotification from '@/components/ui/Callnotification';
import ListOnlineUsers from '@/components/ui/ListOnlineUsers';

export default function Home() {
  return (
    <div>
      <ListOnlineUsers />
      <Callnotification />
    </div>
  );
}
