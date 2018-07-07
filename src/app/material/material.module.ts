import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatSnackBarModule, MatCardModule, MatDialogModule],
  exports: [MatToolbarModule, MatButtonModule, MatSnackBarModule, MatCardModule, MatDialogModule],
})
export class MaterialModule { }
