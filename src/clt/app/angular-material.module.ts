import { NgModule } from '@angular/core';

import { MatToolbarModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatExpansionModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatTableModule,
         MatProgressSpinnerModule,
         MatDialogModule,
         MatPaginatorModule
       } from '@angular/material';

@NgModule({
    exports:[
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatPaginatorModule
    ]
})

export class AngularMaterialModule {}