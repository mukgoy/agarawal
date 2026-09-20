import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    unit: 'kg' | 'g' | 'lb' | 'oz' = 'kg',
    decimals = 0
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const weight = Number(value);

    if (isNaN(weight)) {
      return '';
    }

    return `${weight.toFixed(decimals)} ${unit}`;
  }
}