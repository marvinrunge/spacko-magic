import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Player } from '../../interfaces/player';

@Component({
  selector: 'spacko-magic-add-enemy-modal',
  templateUrl: './add-enemy-modal.component.html',
  styleUrls: ['./add-enemy-modal.component.css'],
})
export class AddEnemyModalComponent implements OnInit {
  @Input() players: Player[];
  @Input() selectedPlayerNames: string[] = [];

  myControl = new FormControl();
  filteredPlayers: Observable<Player[]>;

  constructor(
    public dialogRef: MatDialogRef<AddEnemyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public enemyName: string
  ) {}

  ngOnInit(): void {
    this.filteredPlayers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(): void {
    this.selectedPlayerNames.push(this.myControl.value);
    this.myControl.reset('');
  }

  remove(username: string) {
    this.selectedPlayerNames = [...this.selectedPlayerNames].filter(u => u !== username);
    this.myControl.reset('');
  }

  private _filter(username: string): Player[] {
    const filterValue = username?.toLowerCase();

    return this.players.filter(player => player.name.toLowerCase().includes(filterValue) && !this.selectedPlayerNames.includes(player.name));
  }
}
