import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    imports: [RouterModule],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
