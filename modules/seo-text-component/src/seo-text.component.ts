import { Input } from '@angular/core';
import { DbAbstractionLayer } from '@nodeart/dal';
import { Component, OnInit } from '@angular/core';
/**
 * `SEO text component` display SEO text block from specific url. User have to input current `url` and optional index of text in `blocks` array.
 *
 * For example:
 * ```html
 * <seo-text [url]="router.url" [indexBlock]="1"></seo-text>
 * ```
 */
@Component({
 selector: 'seo-text',
 templateUrl: './seo-text.component.html',
 styleUrls: ['./seo-text.component.scss']
})
export class SeoTextComponent implements OnInit{

    /**
     * Page url
     */
    @Input() url: string;

    /**
     * Index of text in `blocks` array
     */
    @Input() indexBlock: number = 0;

    /**
     * SEO text
     */
    private seoText: string;
    constructor(protected dal: DbAbstractionLayer) {

    }

    ngOnInit() {
        console.log(this.url, ' <> ', this.indexBlock);
        this.dal.getSeoText(this.url, this.indexBlock).subscribe(data => {
            this.seoText = data;
        });
    }

}