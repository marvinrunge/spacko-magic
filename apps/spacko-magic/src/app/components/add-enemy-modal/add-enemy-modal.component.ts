import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { Player } from '../../interfaces/player';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'spacko-magic-add-enemy-modal',
  templateUrl: './add-enemy-modal.component.html',
  styleUrls: ['./add-enemy-modal.component.css'],
})
export class AddEnemyModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEnemyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public enemyName: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEnter(): void {
    this.dialogRef.close(this.enemyName);
  }
}
