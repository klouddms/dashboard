import {Injectable} from '@angular/core';
import * as _ from 'lodash';
declare let $: any;

@Injectable()
export class GlobalVariableService{
  private previousRouteVal: string = '';
  private gameIdVal: string ='';
  private evaluationIdVal: string = '';

  getPreviousRouteMed(){
    return this.previousRouteVal;
  }
  setPreviousRouteMed(valParam){
    this.previousRouteVal = valParam;
  }

  getGameIdMed(){
    return this.gameIdVal;
  }
  setGameIdMed(valParam){
    this.gameIdVal = valParam;
  }

  getEvaluationIdMed(){
    return this.evaluationIdVal;
  }
  setEvaluationIdMed(valParam){
    this.evaluationIdVal = valParam;
  }
}
