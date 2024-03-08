import { Component, OnInit } from '@angular/core';

import { KeyTypes } from 'src/app/models/keyTypes';
import { AllowedKeysMappingType } from 'src/app/models/AllowedKeysMappingType';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public readonly KEY_TYPES: typeof KeyTypes = KeyTypes;

  constructor() {}
  
  ngOnInit(): void {}

  public keyPressed(value: string, type: KeyTypes): void {
    //console.log(value.target.innerText);
    this.handleKeyPressed(value, type);
  }

  private handleKeyPressed(value: string, type: KeyTypes): void {
    switch(type) {
      case KeyTypes.action:
        const allowedActions: AllowedKeysMappingType = {
          "C": {
            value:   "",
            symbol:  "",
            perform: () => {
              this.clearVisor();
            }
          },
          "=": {
            value:   "=",
            symbol:  "=",
            perform: () => {
              //*regras
              const visorValue: string = this.getVisorElement()!.value;
  
              if(visorValue.length > 0) {
                const expressionResult: string = this.calculate();
                this.clearVisor();
                this.setToVisor(expressionResult);
              } else {
                this.setToVisor("0");
              }
            }
          },
        };

        allowedActions[value].perform();
      break;

      //! ADICIONAR FATORIAL
      case KeyTypes.operation:
        const allowedOperations: AllowedKeysMappingType = {
          "+": {
            value:   "+",
            symbol:  "+",
            perform: () => { return this.setToVisor("+"); }
          },
          "-": {
            value:   "-",
            symbol:  "-",
            perform: () => { return this.setToVisor("-"); }
          },
          "x": {
            value:   "x",
            symbol:  "*",
            perform: () => { return this.setToVisor("x"); }
          },
          "÷": {
            value:   "÷",
            symbol:  "/",
            perform: () => { return this.setToVisor("÷"); }
          }
        };

        allowedOperations[value].perform();
      break;

      case KeyTypes.symbol:
        const allowedSymbols: AllowedKeysMappingType = {
          ".": {
            value:   ".",
            symbol:  ".",
            perform: () => { return this.setToVisor('.'); }
          },
          ",": {
            value:   ",",
            symbol:  ",",
            perform: () => { return this.setToVisor(","); }
          },
          "parenthesis_open": {
            value:   "(",
            symbol:  "(",
            perform: () => { return this.setToVisor("("); }
          },
          "parenthesis_close": {
            value:   ")",
            symbol:  ")",
            perform: () => { return this.setToVisor(")"); }
          }
        };

        allowedSymbols[value].perform();
      break;

      case KeyTypes.numeral:
        const allowedNumerals: AllowedKeysMappingType = {
          0: {
            value:   "0",
            symbol:  "0",
            perform: () => { return this.setToVisor("0"); }
          },
          1: {
            value:   "1",
            symbol:  "1",
            perform: () => { return this.setToVisor("1"); }
          },
          2: {
            value:   "2",
            symbol:  "2",
            perform: () => { return this.setToVisor("2"); }
          },
          3: {
            value:   "3",
            symbol:  "3",
            perform: () => { return this.setToVisor("3"); }
          },
          4: {
            value:   "4",
            symbol:  "4",
            perform: () => { return this.setToVisor("4"); }
          },
          5: {
            value:   "5",
            symbol:  "5",
            perform: () => { return this.setToVisor("5"); }
          },
          6: {
            value:   "6",
            symbol:  "6",
            perform: () => { return this.setToVisor("6"); }
          },
          7: {
            value:   "7",
            symbol:  "7",
            perform: () => { return this.setToVisor("7"); }
          },
          8: {
            value:   "8",
            symbol:  "8",
            perform: () => { return this.setToVisor("8"); }
          },
          9: {
            value:   "9",
            symbol:  "9",
            perform: () => { return this.setToVisor("9"); }
          }
        };

        allowedNumerals[value].perform();
      break;

      default:
        throw(`Ação não permitida!`);
      break;
    }
  }

  private clearVisor(): void {
    this.getVisorElement()!.value = '';
  }

  private calculate(): string {
    try {
      const visorValue: string = this.getVisorElement()!.value; // expression
      return (eval(visorValue) || eval(visorValue) == 0) ? eval(visorValue) as string : 'ERROR'; // Com o tratamento do try/catch, esse treco deve ficar irrelevante
    } catch(error: any) {
      return 'Erro de sintaxe :/';
    }
  }

  private setToVisor(value: string): void {
    const visorElement: HTMLElement | null = this.getVisorElement();

    // Limpar visor em caso de erro(s) previsto(s)
    if(value === 'Erro de Syntaxe :/') {
      this.clearVisor();
    }

    (visorElement as HTMLInputElement).value += value;
  }

  private getVisorElement(): HTMLInputElement | null {
    try {
      return document.getElementById('calculator-visor') as HTMLInputElement;
    } catch(error: any) {
      console.error(`O elemento 'visor' não foi encontrado!`);
      return null;
    }
  }
}