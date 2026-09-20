import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'height'
})
export class HeightPipe implements PipeTransform {

  transform(totalInches: number | null | undefined): string {
    if (totalInches == null) {
      return '';
    }

    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    return `${feet}' ${inches}"`;
  }
}