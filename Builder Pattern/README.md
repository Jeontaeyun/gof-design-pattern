# Builder Pattern 라이브러리 만들기 위한 싱글턴 패턴

## Builder Pattern 요약

- 생성 패턴
- 복잡한 객체의 생성 단계를 분리해, 같은 생성 절차를 가져도 다른 제품을 생성할 수 있는 패턴

## Builder Pattern 소개

빌더 패턴은 객체의 생성 과정과 표현 방법을 분리하여 동일한 생성 절차에서 서로 다른 표현 결과를 만드는 패턴입니다.
**복잡한 객체(복잡한 생성 알고리즘)의 생성에 대한 구현을 서브 클래스에 위임하여 개발하는 개발 방식**

## Builder Patterrn 간략 구현

Builder Pattern을 Typescript를 이용해 구현하면, 다음과 같이 구현할 수 있습니다.

Computer 클래스는 실제 생성해야하는 객체(복잡한 생성 알고리즘)입니다.
해당 객체를 생성하는 알고리즘이(Constructor 알고리즘) 복잡하다고 가정합니다.

```typescript
class Computer {
  private _cpu: string;
  private _ram: string;
  private _storage: string;

  constructor(cpu: string, ram: string, storage: string) {
    this._cpu = cpu;
    this._ram = ram;
    this._storage = storage;
  }
  get cpu(): string {
    return this._cpu;
  }
  get ram(): string {
    return this._ram;
  }
  get storage(): string {
    return this._storage;
  }
  set cpu(cpu: string): string {
    this._cpu = cpu;
  }
  set ram(ram: string): string {
    this._ram = ram;
  }
  set storage(storage: string): string {
    this._storage = storage;
  }
}

const computer = new Computer("i3", "mmr3", "SSD");
```

만약 위와 같이 구현을 할 때, 받아야 하는 인자가 많아질수록, Computer에 들어가는 인자가 많아지고 코드가 길어지며 가독성이 떨어집니다.

Interface Builder를 통해 설계를 구현합니다. OOP에서 통일된 개발을 위해 설계와 구현을 분리하는 것이 중요합니다.

```typescript
interface BluePrint {
  setCpu(): void;
  setRam(): void;
  setStorage(): void;
  getComputer(): Computer;
}
```

다음은 위의 Buider 인터페이스를 통해 실제 구현된 Concrete Builder입니다.

```typescript
class LgGramBluePrint extends BluePrint {
  protected computer: Computer;
  constructor() {
    this.computer = new Computer(`default`, `default`, `default`);
  }
  public setCpu() {
    this.computer.cpu = "i7";
  }
  public setRam() {
    this.computer.rma = "mmr4";
  }
  public setStorage() {
    this.computer.storage = "SSD";
  }
  public getComputer() {
    return this.computer;
  }
}
```

마지막으로 Builder 패턴을 이용하기 위해서는 직접 작업을 해주는 생성자 Director가 필요합니다.

```typescript
class ComputerFactory {
  private _bluePrint: BluePrint;
  public setBluePrint(bluePrint: BluePrint): void {
    this._bluePrint = bluePrint;
  }
  public make(): void {
    this.bluePrint.setCpu();
    this.bluePrint.setRam();
    this.bluePrint.setStorage();
  }
  public getComputer() {
    return this.bluePrint.getComputer();
  }
}
```

위와 같이 Director를 설정한 후 다음과 같이 직관적으로 사용할 수 있습니다.

```typescript
const factory = new ComputerFactory();

factory.setBluePrint(new LgGramBluePrint());
factory.make();
const computer = factory.getComputer();
```
