import { CardStoreModule } from './card-store.module';

describe('CardStoreModule', () => {
  let cardStoreModule: CardStoreModule;

  beforeEach(() => {
    cardStoreModule = new CardStoreModule();
  });

  it('should create an instance', () => {
    expect(cardStoreModule).toBeTruthy();
  });
});
