import { Component, OnInit } from '@angular/core';

import { KeyTypes } from 'src/app/models/keyTypes';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  public KEY_TYPES: typeof KeyTypes = KeyTypes;

  constructor() {}
  
  ngOnInit(): void {}

  public keyPressed(value: string, type: KeyTypes): void {
    //console.log(value.target.innerText);
    this.handleKeyPressed(value, type);
  }

  private handleKeyPressed(value: string, type: KeyTypes): void {
    switch(type) {
      case KeyTypes.action:
        const allowedActions: any = {
          "clear": () => {
            this.clearVisor();
          },
          "=": () => {
            //*regras
            const visorValue: string = this.getVisorElement()!.value;

            if(visorValue.length > 0) {
              const expressionResult: string = this.calculate();
              this.clearVisor();
              this.setToVisor(expressionResult);
            } else {
              this.setToVisor("0");
            }
          },
        };

        allowedActions[value]();
      break;

      case KeyTypes.operation:
        const allowedOperations: any = {
          "+": () => { return this.setToVisor("+"); },
          "-": () => { return this.setToVisor("-"); },
          "x": () => { return this.setToVisor("*"); },
          "÷": () => { return this.setToVisor("/"); }
        };

        allowedOperations[value]();
      break;

      case KeyTypes.symbol:
        const allowedSymbols: any = {
          ".": () => { return this.setToVisor("."); },
          ",": () => { return this.setToVisor(","); },
          "parenthesis_open": () => { return this.setToVisor("(");},
          "parenthesis_close": () => { return this.setToVisor(")"); }
        };

        allowedSymbols[value]();
      break;

      case KeyTypes.numeral:
        const allowedNumerals: any = {
          0: () => { return this.setToVisor("0"); },
          1: () => { return this.setToVisor("1"); },
          2: () => { return this.setToVisor("2"); },
          3: () => { return this.setToVisor("3"); },
          4: () => { return this.setToVisor("4"); },
          5: () => { return this.setToVisor("5"); },
          6: () => { return this.setToVisor("6"); },
          7: () => { return this.setToVisor("7"); },
          8: () => { return this.setToVisor("8"); },
          9: () => { return this.setToVisor("9"); }
        };

        allowedNumerals[value]();
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