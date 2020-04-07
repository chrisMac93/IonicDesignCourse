import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[parallax-header]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(ionScroll)': 'onContentScroll($event)',
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ParallaxHeaderDirective {
  header: any;
  productText: any;
  productCondition: any;
  headerHeight: any;
  translateAmt: any;
  scaleAmt: any;

  constructor(public element: ElementRef, public renderer: Renderer2, private domCtrl: DomController) {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    const content = this.element.nativeElement;
    this.header = content.getElementsByClassName('header-image')[0];
    const mainContent = content.getElementsByClassName('main-content')[0];
    this.headerHeight = this.header.clientHeight;
    this.renderer.setStyle(
      mainContent,
      'border-left',
      '2px dashed olive'
    );
  }

  onWindowResize(ev: any) {
    this.headerHeight = this.header.clientHeight;
  }

  onContentScroll(ev: any) {
    if (ev) {
      this.domCtrl.write(() => {
        this.updateParallaxHeader(ev);
      });
    }
  }

  updateParallaxHeader(ev: { detail: { scrollTop: any; }; }) {
    const scrollTop = ev.detail.scrollTop;

    if (scrollTop > 0) {
      this.translateAmt = scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -scrollTop / this.headerHeight + 1;
    }

    this.renderer.setStyle(
      this.header,
      'webkitTransform',
      'translate3d(0,' + this.translateAmt + 'px,0) scale(' + this.scaleAmt + ',' + this.scaleAmt + ')'
      );
  }
}
