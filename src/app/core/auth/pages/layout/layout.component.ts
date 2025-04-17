import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    imports: [RouterModule],
    template: ` <router-outlet></router-outlet> `,
})
export default class LayoutComponent {}
