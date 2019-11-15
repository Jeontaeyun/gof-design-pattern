/**
 * * Chain of Responsibility Pattern에 넣을 객체를 선언합니다.
 */
class Currency {
  private amount: number;
  public constructor(amount: number) {
    this.amount = amount;
  }
  get getAmount(): number {
    return this.amount;
  }
}

/**
 * * Handler 인터페이스로 다음 핸들러로 요청을 넘기는 역할을 합니다.
 * * handleRequest()는 dispense()에서 수행합니다.
 * * 마지막 체인에 succesor()를 구현해주는 것이 좋습니다.
 */
interface DispenseChain {
  setNextChain(nextChain: DispenseChain): void;
  dispense(currency: Currency): void;
}

/**
 * * ConcretHandler로 50$을 거슬러 주는 역할을 합니다ㅏ.
 */
class Dollar50Dispenser implements DispenseChain {
  private chain: DispenseChain;

  public setNextChain(nextChain: DispenseChain) {
    this.chain = nextChain;
  }
  public dispense(currency: Currency) {
    if (currency.getAmount >= 50) {
      const num = currency.getAmount / 50;
      let remainder = currency.getAmount % 50;

      console.log(`Dispensing${num} 50$ note`);
      if (remainder !== 0) {
        this.chain.dispense(new Currency(remainder));
      } else {
        this.chain.dispense(currency);
      }
    }
  }
}

/**
 * * ConcretHandler로 20$을 거슬러 주는 역할을 합니다ㅏ.
 */
class Dollar20Dispenser implements DispenseChain {
  private chain: DispenseChain;

  public setNextChain(nextChain: DispenseChain) {
    this.chain = nextChain;
  }
  public dispense(currency: Currency) {
    if (currency.getAmount >= 20) {
      const num = currency.getAmount / 20;
      let remainder = currency.getAmount % 20;

      console.log(`Dispensing${num} 20$ note`);
      if (remainder !== 0) {
        this.chain.dispense(new Currency(remainder));
      } else {
        this.chain.dispense(currency);
      }
    }
  }
}

/**
 * * ConcretHandler로 10$을 거슬러 주는 역할을 합니다ㅏ.
 */
class Dollar10Dispenser implements DispenseChain {
  private chain: DispenseChain;

  public setNextChain(nextChain: DispenseChain) {
    this.chain = nextChain;
  }
  public dispense(currency: Currency) {
    if (currency.getAmount >= 10) {
      const num = currency.getAmount / 10;
      let remainder = currency.getAmount % 10;

      console.log(`Dispensing ${num} 10$ note`);
      if (remainder !== 0) {
        console.log(`finished remainder : ${remainder}`);
      } else {
        console.log(`finished remainder : ${currency.getAmount}`);
      }
    }
  }
}

class ChainOfResponsibility {
  private dollar50Chain: DispenseChain;
  public constructor() {
    this.dollar50Chain = new Dollar50Dispenser();
    const dollar20Chain = new Dollar20Dispenser();
    const dollar10Chain = new Dollar10Dispenser();

    this.dollar50Chain.setNextChain(dollar20Chain);
    dollar20Chain.setNextChain(dollar10Chain);
  }
  get dispenser() {
    return this.dollar50Chain;
  }
}

const test280Dollar = new Currency(280);
const chaining = new ChainOfResponsibility();
chaining.dispenser.dispense(test280Dollar);
