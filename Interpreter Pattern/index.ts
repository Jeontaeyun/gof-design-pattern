/**
 * * 인터프리터에서 해석된 명령어를 통해 실제로 동작할 객체입니다.
 */

class Picture {
  private name: string;
  private tone: number;
  private brightness: number;
  private saturation: number;
  public constructor(
    name: string,
    tone: number,
    brightness: number,
    saturation: number
  ) {
    this.name = name;
    this.tone = tone;
    this.brightness = brightness;
    this.saturation = saturation;
  }
  public changeTone(tone: number) {
    this.tone += tone;
  }
  public changeBrightness(brightness: number) {
    this.brightness += brightness;
  }
  public changeSaturation(saturation: number) {
    this.saturation += saturation;
  }
  public view() {
    console.log(`사진 파일명: ${this.name}`);
    console.log(
      `색조: ${this.tone} | 명도 : ${this.brightness} | 채도 : ${this.saturation}`
    );
  }
}

/**
 * * Interpret에 돌어갈 Expression의 Interface입니다.
 * * 추상 클래스 방식으로 구현되었습니다.
 */

abstract class AbstractExpression {
  public next: AbstractExpression;
  public constructor() {
    this.next = null;
  }
  public abstract interpret(context: string): string;
  public doItWithPicture(picture: Picture) {
    if (this.next !== null) {
      this.next.doItWithPicture(picture);
    }
  }
  protected nextInterpret(context: string) {
    if (this.next !== null) {
      return this.next.interpret(context);
    }
    return context;
  }
  protected nextDoItWithPicture(picture: Picture) {
    if (this.next !== null) {
      return this.next.doItWithPicture(picture);
    }
    return 0;
  }
  protected getNumber(context: string, index: number): number {
    try {
      let breakPoint = -1;
      breakPoint = context.indexOf(";", index);
      const systemOut = context.slice(index + 1, breakPoint - 1);
      return parseInt(systemOut);
    } catch {
      return 0;
    }
  }
}

/**
 * * 해당 부분은 실제 AbstrctExpression을 통해 ConcreteExpression을 구현한 것입니다ㅏ.
 * * 해당 예제에서는 Chain of Responsibility 패턴과 함께 사용합니다.
 */

class ToneExpression extends AbstractExpression {
  private value: number = 0;
  public interpret(context: string) {
    let index = 0;
    let before: string = "";
    let after: string = "";
    let breakPoint: number = 0;
    while ((index = context.indexOf("T")) !== -1) {
      this.value += this.getNumber(context, index);
      if (index > 0) {
        before = context.substring(0, index);
      } else {
        before = "";
      }
      breakPoint = context.indexOf(";", index);
      after = context.substring(breakPoint + 1);
      context = before + after;
    }
    return this.nextInterpret(context);
  }
  public doItWithPicture(picture: Picture): void {
    picture.changeTone(this.value);
    this.nextDoItWithPicture(picture);
  }
}

class BrightnessExpression extends AbstractExpression {
  private value: number = 0;
  public interpret(context: string) {
    let index = -1;
    let before: string = "";
    let after: string = "";
    let breakPoint: number = 0;
    while ((index = context.indexOf("B")) !== -1) {
      this.value += this.getNumber(context, index);
      if (index > 0) {
        before = context.substring(0, index);
      } else {
        before = "";
      }
      breakPoint = context.indexOf(";", index);
      after = context.substring(breakPoint + 1);
      context = before + after;
    }
    return this.nextInterpret(context);
  }
  public doItWithPicture(picture: Picture): void {
    picture.changeBrightness(this.value);
    this.nextDoItWithPicture(picture);
  }
}
class SaturationExpression extends AbstractExpression {
  private value: number = 0;
  public interpret(context: string) {
    let index = -1;
    let before: string = "";
    let after: string = "";
    let breakPoint: number = 0;
    while ((index = context.indexOf("S")) !== -1) {
      this.value += this.getNumber(context, index);
      if (index > 0) {
        before = context.substring(0, index);
      } else {
        before = "";
      }
      breakPoint = context.indexOf(";", index);
      after = context.substring(breakPoint + 1);
      context = before + after;
    }
    return this.nextInterpret(context);
  }
  public doItWithPicture(picture: Picture): void {
    picture.changeSaturation(this.value);
    this.nextDoItWithPicture(picture);
  }
}

/**
 * 해당 부분은 Expression을 관리하는 객체입니다.
 * 단방향 연결 리스트의 구조를 가지고 있습니다.
 */

class Macro {
  private head: AbstractExpression = null;
  private tail: AbstractExpression = null;
  public addExpression(expression: AbstractExpression) {
    if (this.head !== null) {
      this.tail.next = expression;
      this.tail = expression;
    } else {
      this.head = this.tail = expression;
    }
  }
  public changePicture(picture: Picture) {
    this.head.doItWithPicture(picture);
  }
  public addContext(context: string) {
    this.head.interpret(context);
  }
}

const toneExpression = new ToneExpression();
const brightnessExpression = new BrightnessExpression();
const saturationExpression = new SaturationExpression();
const macro = new Macro();
macro.addExpression(toneExpression);
macro.addExpression(brightnessExpression);
macro.addExpression(saturationExpression);
macro.addContext("B 20 ; T -12 ; S 10 ; B 10 ;");
const picture = new Picture("간장게장 맛있다.jpg", 100, 100, 100);
macro.changePicture(picture);
picture.view();
