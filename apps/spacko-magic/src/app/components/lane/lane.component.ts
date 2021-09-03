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
  @Input() isEnemyLane = false;
  @Input() cardHeight: number;
  @Input() cardWidth: number;
  @Input() cardBorderRadius: number;
  @Input() library?: Card[];
  @Input() graveyard?: Card[];
  @Input() exile?: Card[];
  @Input() mode?: string;
  @Input() showOnlyArt = false;
  @Output() actionTriggered = new EventEmitter<{ card?: Card, actionType: string }>();

  scrollRight() {
    this.scroll.nativeElement.scrollLeft += this.cardWidth * 3;
  }

  scrollLeft() {
    this.scroll.nativeElement.scrollLeft -= this.cardWidth * 3;
  }

  triggerAction(event: { card?: Card, actionType: string }) {
    this.actionTriggered.emit({ card: event.card, actionType: event.actionType });
  }
}
