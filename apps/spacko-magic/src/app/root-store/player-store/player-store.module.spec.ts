import { PlayerStoreModule } from './player-store.module';

describe('PlayerStoreModule', () => {
  let playerStoreModule: PlayerStoreModule;

  beforeEach(() => {
    playerStoreModule = new PlayerStoreModule();
  });

  it('should create an instance', () => {
    expect(playerStoreModule).toBeTruthy();
  });
});
