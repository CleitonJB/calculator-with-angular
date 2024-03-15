import { Component, OnInit } from '@angular/core';

import { KeyTypes } from 'src/app/models/keyTypes';
import { VisorType } from 'src/app/models/VisorType';
import { AllowedKeysType, AllowedKeysMappingType } from 'src/app/models/AllowedKeysMappingType';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public readonly KEY_TYPES: typeof KeyTypes = KeyTypes;

  private calculatorVisorValues: VisorType = Object.assign({}, { userValue: '', symbolsValue: '' }) as VisorType;

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
            perform: (key) => {
              //*regras
              const visorValue: string = this.getVisorElement()!.value;

              if(visorValue.length > 0) {
                const expressionResult: string = this.calculate();

                // Já pegou a expressão (linha acima), limpar o campo antes de inserir o resultado 
                this.clearVisor();

                const fakeResultKey: AllowedKeysType = {
                  value:   expressionResult,
                  symbol:  expressionResult,
                  perform: () => {},
                };

                this.setVisorValue(fakeResultKey);
              } else {
                this.resetVisorValue();
              }
            }
          },
        };

        const keyActions: AllowedKeysType = allowedActions[value];
        keyActions.perform(keyActions);
      break;

      case KeyTypes.operation:
        const allowedOperations: AllowedKeysMappingType = {
          "+": {
            value:   "+",
            symbol:  "+",
            perform: (key) => { return this.setVisorValue(key); }
          },
          "-": {
            value:   "-",
            symbol:  "-",
            perform: (key) => { return this.setVisorValue(key); }
          },
          "x": {
            value:   "x",
            symbol:  "*",
            perform: (key) => { return this.setVisorValue(key); }
          },
          "÷": {
            value:   "÷",
            symbol:  "/",
            perform: (key) => { return this.setVisorValue(key); }
          },
          // "!": {
          //   value:   "!",
          //   symbol:  "!",
          //   perform: () => { return this.setVisorValue("÷"); }
          // }
        };

        const keyOperations: AllowedKeysType = allowedOperations[value];
        keyOperations.perform(keyOperations);
      break;

      case KeyTypes.symbol:
        const allowedSymbols: AllowedKeysMappingType = {
          ".": {
            value:   ".",
            symbol:  ".",
            perform: (key) => { return this.setVisorValue(key); }
          },
          ",": {
            value:   ",",
            symbol:  ",",
            perform: (key) => { return this.setVisorValue(key); }
          },
          "parenthesis_open": {
            value:   "(",
            symbol:  "(",
            perform: (key) => { return this.setVisorValue(key); }
          },
          "parenthesis_close": {
            value:   ")",
            symbol:  ")",
            perform: (key) => { return this.setVisorValue(key); }
          }
        };

        const keySymbols: AllowedKeysType = allowedSymbols[value]
        keySymbols.perform(keySymbols);
      break;

      case KeyTypes.numeral:
        const allowedNumerals: AllowedKeysMappingType = {
          0: {
            value:   "0",
            symbol:  "0",
            perform: (key) => { return this.setVisorValue(key); }
          },
          1: {
            value:   "1",
            symbol:  "1",
            perform: (key) => { return this.setVisorValue(key); }
          },
          2: {
            value:   "2",
            symbol:  "2",
            perform: (key) => { return this.setVisorValue(key); }
          },
          3: {
            value:   "3",
            symbol:  "3",
            perform: (key) => { return this.setVisorValue(key); }
          },
          4: {
            value:   "4",
            symbol:  "4",
            perform: (key) => { return this.setVisorValue(key); }
          },
          5: {
            value:   "5",
            symbol:  "5",
            perform: (key) => { return this.setVisorValue(key); }
          },
          6: {
            value:   "6",
            symbol:  "6",
            perform: (key) => { return this.setVisorValue(key); }
          },
          7: {
            value:   "7",
            symbol:  "7",
            perform: (key) => { return this.setVisorValue(key); }
          },
          8: {
            value:   "8",
            symbol:  "8",
            perform: (key) => { return this.setVisorValue(key); }
          },
          9: {
            value:   "9",
            symbol:  "9",
            perform: (key) => { return this.setVisorValue(key); }
          }
        };

        const keyNumerals: AllowedKeysType = allowedNumerals[value]
        keyNumerals.perform(keyNumerals);
      break;

      default:
        throw(`Ação não permitida!`);
      break;
    }
  }

  private clearVisor(): void {
    this.getVisorElement()!.value = '';

    this.calculatorVisorValues.userValue    = "";
    this.calculatorVisorValues.symbolsValue = "";
  }

  private resetVisorValue(): void {
    const fakeResetKey: AllowedKeysType = {
      value:   "0",
      symbol:  "0",
      perform: () => {},
    };

    this.setVisorValue(fakeResetKey);
  }

  private calculate(): string {
    try {
      const visorValue: string = this.calculatorVisorValues.symbolsValue; // expression
      return (eval(visorValue) || eval(visorValue) == 0) ? eval(visorValue) as string : 'ERROR'; // Com o tratamento do try/catch, esse treco deve ficar irrelevante
    } catch(error: any) {
      return 'Erro de sintaxe :/';
    }
  }

  private setVisorValue(key: AllowedKeysType): void {
    this.calculatorVisorValues.userValue    += key.value;
    this.calculatorVisorValues.symbolsValue += key.symbol;

    const visorElement: HTMLElement | null = this.getVisorElement();

    // Limpar visor em caso de erro(s) previsto(s)
    if(this.calculatorVisorValues.symbolsValue === 'Erro de Syntaxe :/') {
      this.clearVisor();
    }

    (visorElement as HTMLInputElement).value = this.calculatorVisorValues.userValue;

    console.log("user: ", this.calculatorVisorValues.userValue);
    console.log("symbols: ", this.calculatorVisorValues.symbolsValue);
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