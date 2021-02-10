import { Recipe } from './../../bean/Recipe';
import { FormatTimeService } from './../../service/formatTime.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-recipe',
  templateUrl: './dialog-recipe.component.html',
  styleUrls: ['./dialog-recipe.component.scss']
})
export class DialogRecipeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formatTimeService: FormatTimeService,
    public dialogRef: MatDialogRef<DialogRecipeComponent>,
  ) { }

  ngOnInit(): void {
  }

  getFormatTime(timeToFormat: number): string {
    return this.formatTimeService.getFormatTimeService(timeToFormat);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  counter(i: number) {
    return new Array(i);
  }

}
