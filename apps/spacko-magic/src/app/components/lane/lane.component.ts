import {
  AfterContentChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input, Output,
  ViewChild
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
  @Input() touch: boolean;
  @Input() openCardAmount?: number;
  @Output() actionTriggered = new EventEmitter<{
    card?: Card;
    actionType: string;
  }>();

  showScrollButtons = false;
  timer: any;

  scrollTo(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.scroll.nativeElement.scrollLeft -= 3;
    } else if (direction === 'right') {
      this.scroll.nativeElement.scrollLeft += 3;
    }
    this.timer = setTimeout(() => {
      this.scrollTo(direction);
    }, 10);
  }

  triggerAction(event: { card?: Card; actionType: string }) {
    this.actionTriggered.emit({
      card: event.card,
      actionType: event.actionType,
    });
  }

  ngAfterContentChecked() {
    this.showScrollButtons = !!(
      this.scroll?.nativeElement &&
      this.scroll.nativeElement.clientWidth >= window.innerWidth
    );
  }

  stopTimer(timer:number) {
    clearTimeout(timer);
  }
}
