import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(description: string, amount: number = 20, delimiter?: string) {

    if (!description) {
      throw new Error('Undefined description');
    }

    if (description.length < amount) {
      return description;
    }

    if (delimiter) {
      return description.substring(0, description.indexOf(delimiter));
    }

    return description.substring(0, amount) + "...";

  }
}
