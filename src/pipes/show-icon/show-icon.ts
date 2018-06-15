import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showIcon',
})
export class ShowIconPipe implements PipeTransform {

  private imagesExtensions: string[] = ["png", "jpg", "jpeg", "gif"];

  transform(url: string, iconColor: boolean = false) {

    if (!url) {
      throw new Error('URL undefined');
    }

    let extension = url.substring(url.lastIndexOf(".") + 1, url.length).trim().toLocaleLowerCase();

    if (this.imagesExtensions.indexOf(extension) > -1) {
      return iconColor ? "orange" : "image";
    } else {

      if (iconColor) {
        switch(extension) {
          case "docx":
            return "primary";
          case "pdf":
            return "danger";
          default:
            return "black";
        }
      }

      return "document";
    }
  }
}
