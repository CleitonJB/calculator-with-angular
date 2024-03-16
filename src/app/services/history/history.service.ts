import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private resultsHistory: string[] = [];

  constructor() {}

  public getHistoryList(): string[] {
    let historyList: string[] = new Array(...this.resultsHistory);

    return historyList;
  }

  public addRegister(register: string): void {
    if(register.length == 0) {
      console.log("Registro inválido!");
      return;
    }

    this.resultsHistory.push(register);
  }
}