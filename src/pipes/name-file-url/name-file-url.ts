import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFileUrl',
})
export class NameFileUrlPipe implements PipeTransform {

  transform(url: string) {

    if (!url) {
      return "";
    }

    return decodeURIComponent(url.substring(url.indexOf("*Name%3A") + 8, url.lastIndexOf("%3AEndName*")));

  }
}
