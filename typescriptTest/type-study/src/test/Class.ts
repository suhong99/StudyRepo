type MarbleEventType = 'point' | 'key' | 'home';

type QueueMove = {
  operation: 'move';
  offset: number;
};

type QueueAnimate = {
  operation: 'animate';
  duration: number;
};

type QueueEvent = {
  operation: 'event';
  type: MarbleEventType;
};

type MarbleQueue = QueueMove | QueueAnimate | QueueEvent;

export class MarbleEvent {
  queue: Array<MarbleQueue>;

  constructor(queue: Array<MarbleQueue> = []) {
    this.queue = queue;
  }

  get event() {
    return this.queue[0];
  }

  enqueue(value: MarbleQueue) {
    this.queue.push(value);
  }

  dequeue() {
    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }

  hasNext<T extends MarbleQueue['operation']>(operation?: T) {
    if (this.size() <= 0) return false;
    return operation ? this.event.operation === operation : true;
  }
}
