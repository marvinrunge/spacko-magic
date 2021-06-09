import { Component, Input } from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'spacko-magic-enemy-stats',
  templateUrl: './enemy-stats.component.html',
  styleUrls: ['./enemy-stats.component.css'],
})
export class EnemyStatsComponent {
  @Input() player: Player;
}
