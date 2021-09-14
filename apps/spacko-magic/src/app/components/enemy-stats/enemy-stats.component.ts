import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'spacko-magic-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.css'],
})
export class EnemyStatsComponent {
  @Input() player: Player;
  @Input() cards = 0;
  @Output() addEnemy = new EventEmitter();

  onClick() {
    this.addEnemy.emit();
  }
}
