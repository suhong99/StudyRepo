import GameConfig from '../config/gameconfig';

export default class TimerManager {
  private static instance: TimerManager;
  private fallingBlockTimer: number = 0;

  // 하나의 Timer만 인스턴스로 생성
  private constructor() {
    if (!TimerManager.instance) {
      TimerManager.instance = this;
    }
    return TimerManager.instance;
  }

  public static getInstance(): TimerManager {
    return TimerManager.instance || new TimerManager();
  }

  public init(): void {
    this.fallingBlockTimer = 0;
  }

  public update(delta: number): void {
    this.fallingBlockTimer += delta;
  }

  public checkBlockDropTime(): boolean {
    if (
      this.fallingBlockTimer > GameConfig.MainScene.TIMER_INTERVAL_BLOCK_DOWN
    ) {
      this.fallingBlockTimer = 0;
      return true;
    }
    return false;
  }
}
