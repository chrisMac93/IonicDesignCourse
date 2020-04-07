import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  sources = [];
  users = [];

  slidesOpts = {
    slidesPerView: 4.5,
    freeMode: true
  }


  constructor(private data: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.data.getSportSources().subscribe(res => {
      this.sources = res;
      console.log('res: ', res);
    });

    this.data.getRandomUser().subscribe(res => {
      this.users = res;
      console.log(res);
    });
  }

  openSource(s) {
    console.log('open: ', s);
  }

  getBlockColor(source: { name: any; }) {
    return this.sanitizer.bypassSecurityTrustStyle(`--myvar: #${this.intToRGB(this.hashCode(source.name))}`);
  }
 
  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  hashCode(str: string) {
    // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
 
  intToRGB(i: number) {
    // tslint:disable-next-line: no-bitwise
    const c = (i & 0x00ffffff).toString(16).toUpperCase();
 
    return '00000'.substring(0, 6 - c.length) + c + '80';
  }
}
