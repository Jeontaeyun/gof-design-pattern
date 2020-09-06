# Abstract Factory Pattern 라이브러리 만들기 위한 싱글턴 패턴

## Abstract Factory Pattern 요약

- 생성 패턴
- 서로 다른 객체들을 하나의 팩토리에서 생성 관리하는 패턴

## Abstract Factory Pattern 소개

추상 클래스 패턴은 하나의 인터페이스에서 객체의 생성을 처리하는 패턴으로, 다양한 성격의 객체를 하나의 군으로 형성하여 그것을 객체 단위로 취급하여 생성해야할 때 유용한 패턴입니다.

| 구분               | 설명                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 팩토리 메서드 패턴 | 조건에 따라 객체 생성을 팩토리 클래스로 위임하여, 팩토리 클래스에서 객체를 생성하는 패턴                                              |
| 추상 팩토리 패턴   | 서로 관련이 있는 객체들을 묶어서 팩토리 클래스로 만들고, 이 팩토리 조건에 따라 생성하도록 다시 팩토리를 만들어서 객체를 생성하는 패턴 |

즉, 추상 팩토리 패턴은 팩토리 메서드 패턴을 좀 더 캡슐화 한 방식입니다.

다른 말로 하면, **추상 팩토리 패턴은 많은 수의 연관된 서브 클래스를 특정 그룹으로 묶어 한번에 교체할 수 있도록 만든 디자인 패턴** 입니다.

## Abstract Factory Patterrn 간략 구현

Absctract Factory Pattern은 크게 Abstract Factory, Concrete Factory, Abstract Product, Concrete Product가 이해 관계에 있습니다.

아래는 상위의 Machine 인터페이스(Abstract Product) 이를 통한 실제 MachineA와 B(ConcreteProduct)를 구현한 것이다.

```typescript
interface Machine {
  process(): void;
}

class MachineA implements Machine {
  @Override
  public process() {
    console.log("Execute Machine A");
  }
}

class MachineB implements Machine {
  @Override
  public process() {
    console.log("Execute Machine B");
  }
}
```

아래는 상위의 MachineFactory 인터페이스(Abstract Factory) 이를 통한 실제 MachineA와 B(ConcreteFactory)를 구현한 것이다.

```typescript
interface MachineFactory {
  getMachineA(): MachineA;
  getMachineB(): MachineB;
}

class ConcreteMacnieFactory implements MachineFactory {
  public getMachineA(): MachineA {
    return new MachineA();
  }
  public getMachineB(): MachineB {
    return new MachineB();
  }
}
```
