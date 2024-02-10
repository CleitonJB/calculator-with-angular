import { Component, OnInit } from '@angular/core';

import { KeyTypes } from 'src/app/models/keyTypes';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public KEY_TYPES = KeyTypes;

  constructor() {}
  
  ngOnInit(): void {
    //this.setToVisor("Bem-vindo!", KeyTypes.symbol);
  }

  public keyPressed(value: string, type: KeyTypes): void {
    this.setToVisor(value, type);
  }

  private setToVisor(value: string, type: KeyTypes): void {
    try {
      const visorElement: HTMLElement | null = document.getElementById('calculator-visor'); // HTMLInputElement

      if(visorElement) {
        switch(type) {
          case KeyTypes.action:
            switch(value) {
              case 'clear':
                (visorElement as HTMLInputElement).value = '';
              break;

              case '=':
                if((visorElement as HTMLInputElement).value.length == 0) (visorElement as HTMLInputElement).value = '0';

                (visorElement as HTMLInputElement).value = eval((visorElement as HTMLInputElement).value);
              break;
            }
          break;
          
          case KeyTypes.operation:
          case KeyTypes.numeral:
          case KeyTypes.symbol:
            let pseudoValue: string = '';

            switch(value) {
              case 'parenthesis_open':
                pseudoValue = '(';
              break;

              case 'parenthesis_close':
                pseudoValue = ')';
              break;

              default:
                pseudoValue = value;
              break;
            }

            (visorElement as HTMLInputElement).value += pseudoValue;
          break;

          default:
            throw(`A ação '${type}' não é reconhecida!`);
          break;
        }
      } else {
        throw('O visor não foi encontrado!');
      }

      console.log("Visor:", (visorElement as HTMLInputElement).value);
    } catch (error) {
      console.error(error);
    }
  }
}