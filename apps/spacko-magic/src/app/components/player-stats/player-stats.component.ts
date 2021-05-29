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

  addLife() {
    const life = this.player.life + 1;
    const player = { ...this.player, life };
    this.playerUpdated.emit(player);
  }

  addPoison() {
    const poison = this.player.poison + 1;
    const player = { ...this.player, poison };
    this.playerUpdated.emit(player);
  }

  addEnergy() {
    const energy = this.player.energy + 1;
    const player = { ...this.player, energy };
    this.playerUpdated.emit(player);
  }

  addOther() {
    const other = this.player.other + 1;
    const player = { ...this.player, other };
    this.playerUpdated.emit(player);
  }

  removeLife() {
    if (this.player.life > 0) {
      const life = this.player.life - 1;
      const player = { ...this.player, life };
      this.playerUpdated.emit(player);
    }
  }

  removePoison() {
    if (this.player.poison > 0) {
      const poison = this.player.poison - 1;
      const player = { ...this.player, poison };
      this.playerUpdated.emit(player);
    }
  }

  removeEnergy() {
    if (this.player.energy > 0) {
      const energy = this.player.energy - 1;
      const player = { ...this.player, energy };
      this.playerUpdated.emit(player);
    }
  }

  removeOther() {
    if (this.player.other > 0) {
      const other = this.player.other - 1;
      const player = { ...this.player, other };
      this.playerUpdated.emit(player);
    }
  }
}
