# Singleton Pattern 라이브러리 만들기 위한 싱글턴 패턴

## Singleton Pattern 요약

- 생성 패턴
- 특정 클래스가 오직 하나의 인스턴스만 가지는 것을 보장하는 패턴

## Singleton Pattern 소개

싱글톤 패턴은 **전역 공간(Global)**에서 접근할 수 있는 하나의 인스턴스만 생성하도록 구현하는 패턴으로 주로, 전역 공간에서 사용해야하는 라이브러리를 만들 때 주로 사용합니다.

싱글톤 패턴은 단 하나의 객체만을 만들 때 사용하며, GoF 디자인 패턴 서적에서는 단일체(Singleton)를 다음과 같이 설명합니다.

> 단일체는 어떤 클래스의 인스턴스가 오직 하나임을 보장하며, 이 인스턴스에 접근할 수 있는 전역적인 접촉점을 제공하는 패턴입니다.

## Singleton Patterrn 간략 구현

Singleton Pattern을 Typescript를 이용해 구현하면, 다음과 같이 구현할 수 있습니다.

```typescript
class SingletonClass {
  private static instance = null;
  private constructor() {
    /**
     * initialize instance
     */
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new SingletonClass();
    }
    return this.instance;
  }
  /**
   * implemented specific feature
   */
}
```
