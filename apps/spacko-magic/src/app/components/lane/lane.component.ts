import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css'],
})
export class LaneComponent {
  @ViewChild('scroll') scroll: ElementRef;
  @Input() cards: Card[];
  @Input() isMiddleLane = false;
  @Input() cardHeight: number;
  @Input() cardWidth: number;
  @Input() library?: Card[];
  @Input() graveyard?: Card[];
  @Output() cardUpdated = new EventEmitter<Card>();
  @Output() cardSelected = new EventEmitter<Card>();
  @Output() shuffleClicked = new EventEmitter();

  scrollRight() {
    console.log('scrollRight', this.cardWidth);
    this.scroll.nativeElement.scrollLeft += this.cardWidth;
  }

  scrollLeft() {
    console.log('scrollLeft', this.cardWidth);
    this.scroll.nativeElement.scrollLeft -= this.cardWidth;
  }

  updateCard(card: Card) {
    console.log(card);
    this.cardUpdated.emit(card);
  }

  selectCard(card: Card) {
    this.cardSelected.emit(card);
  }

  shuffle() {
    this.shuffleClicked.emit();
  }
}
