import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Card } from '../../interfaces/card';

/** additional entity state properties */
export interface CardState extends EntityState<Card> {
  isLoading: boolean;
  error?: any;
  selectedCardId?: string;
  activeAttachCardId?: string;
}

/** function to determine which field to use as a ID inside the store */
export function selectCardId(card: Card): string {
  return String(card._id);
}

export const cardAdapter: EntityAdapter<Card> = createEntityAdapter<Card>({
  selectId: selectCardId
});

export const initialCardState: CardState = cardAdapter.getInitialState(
  {
    isLoading: false,
    error: undefined,
    selectedCardId: undefined
  }
);

/** use some of the selectors implemented by the ngrx store library */
const {
  selectAll
} = cardAdapter.getSelectors();

export const selectAllCards = selectAll;
