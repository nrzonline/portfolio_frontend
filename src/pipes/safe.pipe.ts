import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Pipe({
	name: 'safe'
})


export class SafePipe implements PipeTransform {
	public constructor(private domSanitizer: DomSanitizer) {}

	public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type){
			case 'html':
				return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
			case 'style':
				return this.domSanitizer.bypassSecurityTrustStyle(value);
			case 'script':
				return this.domSanitizer.bypassSecurityTrustScript(value);
			case 'url':
				return this.domSanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl':
				return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
			default:
				throw new Error(`Unable to bypass security for invalid type: ${type}`);
		}
	}
}
