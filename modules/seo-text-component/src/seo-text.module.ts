import { DalModule } from '@nodeart/dal';
import { SeoTextComponent } from './seo-text.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * SEO text module
 */
@NgModule({
    imports: [CommonModule, DalModule],
    exports: [SeoTextComponent],
    declarations: [SeoTextComponent],
    providers: [],
})
export class SeoTextModule { }
