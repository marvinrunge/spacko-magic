import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css'],
})
export class LaneComponent implements AfterContentChecked {
  @ViewChild('scroll') scroll: ElementRef;
  @Input() cards: Card[];
  @Input() isMiddleLane = false;
  @Input() isEnemyLane = false;
  @Input() cardHeight: number;
  @Input() cardWidth: number;
  @Input() cardBorderRadius: number;
  @Input() library?: Card[];
  @Input() graveyard?: Card[];
  @Input() exile?: Card[];
  @Input() lands?: Card[];
  @Input() mode?: string;
  @Output() actionTriggered = new EventEmitter<{ card?: Card, actionType: string }>();

  showScrollButtons = false;

  scrollRight() {
    this.scroll.nativeElement.scrollLeft += this.cardWidth;
  }

  scrollLeft() {
    this.scroll.nativeElement.scrollLeft -= this.cardWidth;
  }

  triggerAction(event: { card?: Card, actionType: string }) {
    this.actionTriggered.emit({ card: event.card, actionType: event.actionType });
  }

  ngAfterContentChecked() {
    this.showScrollButtons = !!(this.scroll?.nativeElement && this.scroll.nativeElement.clientWidth >= window.innerWidth);
  }
}
