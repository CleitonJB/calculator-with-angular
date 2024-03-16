import { Component, OnInit } from '@angular/core';

import { KeyTypes } from 'src/app/models/keyTypes';
import { VisorType } from 'src/app/models/VisorType';
import { AllowedKeysType, AllowedKeysMappingType } from 'src/app/models/AllowedKeysMappingType';

import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public readonly KEY_TYPES: typeof KeyTypes = KeyTypes;

  public calculatorVisorValues: VisorType = Object.assign({}, { userValue: "", symbolsValue: "" }) as VisorType;

  constructor(
    private historyService: HistoryService
  ) {}
  
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
            type:    KeyTypes.action,
            value:   "",
            symbol:  "",
            perform: () => {
              if(this.calculatorVisorValues.userValue.length == 0) return;

              this.clearVisor();
            }
          },
          "=": {
            type:    KeyTypes.action,
            value:   "=",
            symbol:  "=",
            perform: (key) => {
              //*regras
              const visorValue: string = this.calculatorVisorValues.symbolsValue;

              if(visorValue.length > 0 && visorValue != "0") {
                const expressionResult: string = this.calculate();

                // Já pegou a expressão (linha acima), limpar o campo antes de inserir o resultado 
                this.clearVisor();

                const fakeResultKey: AllowedKeysType = {
                  type:    KeyTypes.fake,
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
        keyActions.perform(keyActions); // O campo 'type' poderia ser passado aqui ao invés de ser incorporado como atributo de 'key'
      break;

      case KeyTypes.operation:
        const allowedOperations: AllowedKeysMappingType = {
          "+": {
            type:    KeyTypes.operation,
            value:   "+",
            symbol:  "+",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;

              return this.setVisorValue(key);
            }
          },
          "-": {
            type:    KeyTypes.operation,
            value:   "-",
            symbol:  "-",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;

              return this.setVisorValue(key);
            }
          },
          "x": {
            type:    KeyTypes.operation,
            value:   "x",
            symbol:  "*",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;
              
              return this.setVisorValue(key);
            }
          },
          "÷": {
            type:    KeyTypes.operation,
            value:   "÷",
            symbol:  "/",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;

              return this.setVisorValue(key);
            }
          },
          // "!": {
          //   value:   "!",
          //   symbol:  "!",
          //   perform: () => { return this.setVisorValue("÷"); }
          // }
        };

        const keyOperations: AllowedKeysType = allowedOperations[value];
        keyOperations.perform(keyOperations); // O campo 'type' poderia ser passado aqui ao invés de ser incorporado como atributo de 'key'
      break;

      case KeyTypes.symbol:
        const allowedSymbols: AllowedKeysMappingType = {
          ".": {
            type:    KeyTypes.symbol,
            value:   ".",
            symbol:  ".",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;
              
              return this.setVisorValue(key);
            }
          },
          ",": {
            type:    KeyTypes.symbol,
            value:   ",",
            symbol:  ",",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;
              
              return this.setVisorValue(key);
            }
          },
          "parenthesis_open": {
            type:    KeyTypes.symbol,
            value:   "(",
            symbol:  "(",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;
              
              return this.setVisorValue(key);
            }
          },
          "parenthesis_close": {
            type:    KeyTypes.symbol,
            value:   ")",
            symbol:  ")",
            perform: (key) => {
              if(this.checkDuplicateValues(key.value)) return;
              
              return this.setVisorValue(key);
            }
          }
        };

        const keySymbols: AllowedKeysType = allowedSymbols[value]
        keySymbols.perform(keySymbols); // O campo 'type' poderia ser passado aqui ao invés de ser incorporado como atributo de 'key'
      break;

      case KeyTypes.numeral:
        const allowedNumerals: AllowedKeysMappingType = {
          0: {
            type:    KeyTypes.numeral,
            value:   "0",
            symbol:  "0",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          1: {
            type:    KeyTypes.numeral,
            value:   "1",
            symbol:  "1",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          2: {
            type:    KeyTypes.numeral,
            value:   "2",
            symbol:  "2",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          3: {
            type:    KeyTypes.numeral,
            value:   "3",
            symbol:  "3",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          4: {
            type:    KeyTypes.numeral,
            value:   "4",
            symbol:  "4",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          5: {
            type:    KeyTypes.numeral,
            value:   "5",
            symbol:  "5",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          6: {
            type:    KeyTypes.numeral,
            value:   "6",
            symbol:  "6",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          7: {
            type:    KeyTypes.numeral,
            value:   "7",
            symbol:  "7",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          8: {
            type:    KeyTypes.numeral,
            value:   "8",
            symbol:  "8",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          },
          9: {
            type:    KeyTypes.numeral,
            value:   "9",
            symbol:  "9",
            perform: (key) => {
              return this.setVisorValue(key);
            }
          }
        };

        const keyNumerals: AllowedKeysType = allowedNumerals[value]
        keyNumerals.perform(keyNumerals); // O campo 'type' poderia ser passado aqui ao invés de ser incorporado como atributo de 'key'
      break;

      default:
        throw(`Ação não permitida!`);
      break;
    }
  }

  private checkDuplicateValues(keyValue: string): boolean {
    const visorValue: string = this.calculatorVisorValues.userValue;

    return (visorValue.charAt(visorValue.length - 1) === keyValue) ? true : false;
  }

  private clearVisor(): void {
    this.calculatorVisorValues.userValue    = "";
    this.calculatorVisorValues.symbolsValue = "";

    console.log("user: ", this.calculatorVisorValues.userValue);
    console.log("symbols: ", this.calculatorVisorValues.symbolsValue);
  }

  private resetVisorValue(): void {
    if(this.calculatorVisorValues.userValue === "0") return;

    const fakeResetKey: AllowedKeysType = {
      type:    KeyTypes.fake,
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

    // Limpar visor em caso de erro(s) previsto(s)
    if(this.calculatorVisorValues.symbolsValue === 'Erro de Syntaxe :/') {
      this.clearVisor();
    }

    console.log("user: ", this.calculatorVisorValues.userValue);
    console.log("symbols: ", this.calculatorVisorValues.symbolsValue);
  }
}