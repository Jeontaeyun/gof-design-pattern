/**
 * * Originator : 기억할 정보를 가지고 있는 객체
 * * 해당 객체에 createMemento()와 restoreMemento()를 구현한다.
 */

class Information {
  private _numData: number;
  private _stringData: string;
  public constructor(numData: number, stringData: string) {
    this._numData = numData;
    this._stringData = stringData;
  }
  public createMemento(): Memento {
    return new Memento(this._numData, this._stringData);
  }
  public restoreMemento(memento: Memento): void {
    this._numData = memento.numData;
    this._stringData = memento.stringData;
  }
  get numData() {
    return this._numData;
  }
  get stringData() {
    return this._stringData;
  }
  set numData(numData: number) {
    this._numData = numData;
  }
  set stringData(stringData: string) {
    this._stringData = stringData;
  }
}

/**
 * * 저장할 데이터를 가지고 있는 Memento 객체
 * * 하나의 기억 단위를 메멘토라고 한다.
 */
class Memento {
  private _numData: number;
  private _stringData: string;
  public constructor(numData: number, stringData: string) {
    this._numData = numData;
    this._stringData = stringData;
  }
  get numData(): number {
    return this._numData;
  }
  get stringData(): string {
    return this._stringData;
  }
}

/**
 * * CareTaker : Memento를 관리하는 객체입니다. Stack구조를 가집니다.
 * * Stack구조를 가져야 Memento의 기능상 뒤로가기를 구현하는데 비용이 적게 듭니다.
 */

class CareTaker {
  public mementos: Array<Memento> = [];
  public push(memento: Memento) {
    this.mementos.push(memento);
  }
  public pop(): Memento {
    return this.mementos.pop();
  }
}

const mementoCareTaker = new CareTaker();
const info = new Information(10, "first");

mementoCareTaker.push(info.createMemento());

info.numData = 3;
info.stringData = "second";

console.log("현재 데이터 = ", info.numData, info.stringData);

info.restoreMemento(mementoCareTaker.pop());

console.log("복구된 데이터 = ", info.numData, info.stringData);
