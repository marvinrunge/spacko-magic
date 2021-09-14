import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'spacko-magic-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css'],
})
export class PlayerStatsComponent {
  @Input() player: Player;
  @Output() playerUpdated = new EventEmitter<Player>();

  changeLife(life: any) {
    const player = { ...this.player, life };
    this.playerUpdated.emit(player);
  }

  changePoison(poison: any) {
    const player = { ...this.player, poison };
    this.playerUpdated.emit(player);
  }

  changeEnergy(energy: any) {
    const player = { ...this.player, energy };
    this.playerUpdated.emit(player);
  }

  changeOther(other: any) {
    const player = { ...this.player, other };
    this.playerUpdated.emit(player);
  }
}
