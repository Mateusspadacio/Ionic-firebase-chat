import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, onlyFirst: boolean = false) {
    if (onlyFirst) {
      return this.firstWordUpperCase(value);
    } else {
      let words: string[] = value.split(' ');
      let wordConcat: string = '';
      words.forEach(w => {
        wordConcat += this.firstWordUpperCase(w) + ' ';
      });
      return wordConcat;
    }
  }

  private firstWordUpperCase(word: string): string {
    return word.charAt(0).toLocaleUpperCase() + word.substring(1).toLocaleLowerCase();
  }
}
