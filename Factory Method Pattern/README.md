# Factory Method Pattern 비슷한 객체를 생성하기 위한 공장 Factory Method Pattern

## Factory Method Pattern 요약

- 생성 패턴
- 객체의 생성 처리를 서브 클래스(Factory)로 분리해 처리하도록 캡슐화하는 패턴

## Factory Method Pattern 소개

팩토리 메소드 패턴은 템플릿 메소드 패턴과 함께 사용해 **구조와 구현의 분리하는 것의 장점을 보여주는 패턴** 입니다.

생성자(Factory, Createro)와 생성품(ConcreteProduct)로 구성되며 create라는 함수가 템플릿 메소드처럼 여러 단계로 나누어질 수 있음을 염두해두고 생성해야 합니다.

## Factory Method Patterrn 간략 구현

아래는 Create 객체에 의해 생성될 Concrete Product를 말합니다.

```typescript
interface Robot {
  power: number;
  hit(): void;
}

class SuperRobot implements Robot {
  public constructor() {
    this.power = 20;
  }
  public hit() {
    console.log(`I hit the ${this.power} power`);
  }
}

class NormalRobot implements Robot {
  public constructor() {
    this.power = 10;
  }
  public hit() {
    console.log(`I hit the ${this.power} power`);
  }
}

class BadRobot implements Robot {
  public constructor() {
    this.power = 5;
  }
  public hit() {
    console.log(`I hit the ${this.power} power`);
  }
}
```

아래는 실제 Concrete Product를 만들기 위한 Factory(Creator)객체입니다.

```typescript
type RobotType = "super" | "noraml" | "bad";

class RobotFactory {
  public createRobot(type: RobotType) {
    switch (type) {
      case "super":
        return new SuperRobot();
      case "normal":
        return new NormalRobot();
      case "bad":
        return new BadsRobot();
    }
  }
}
```
