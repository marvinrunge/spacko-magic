import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'spacko-magic-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.css'],
})
export class EnemyStatsComponent {
  @Input() players: string[];
  @Input() selectedPlayer: Player | undefined;
  @Input() cards = 0;
  @Output() addEnemy = new EventEmitter();
  @Output() changeEnemy = new EventEmitter<string>();

  onClickAdd() {
    this.addEnemy.emit();
  }

  onClickUsername(name: string) {
    this.changeEnemy.emit(name);
  }
}
