/**
 * * Command 인터페이스는 명령어 객체의 구조를 말합니다.
 */

interface Command {
  excute(): void;
}

/**
 * * 실제 명령어을 받아 실제로 수해하는 Receiver 입니다.
 */

class Heater {
  public powerOn(): void {
    console.log("히터를 틀었습니다.");
  }
}

/**
 * * HeaterOnCommand 는 Command 인터페이스로부터 구현된 ConcreteCommand입니다.
 */

class HeaterOnCommand implements Command {
  private heater: Heater;
  public constructor(heater: Heater) {
    this.heater = heater;
  }
  public excute() {
    this.heater.powerOn();
  }
}

class Lamp {
  public turnOn(): void {
    console.log("램프를 틀었습니다.");
  }
}

/**
 * * LampOnCommand 는 Command 인터페이스로부터 구현된 ConcreteCommand입니다.
 */

class LampOnCommand implements Command {
  private lamp: Lamp;
  public constructor(lamp: Lamp) {
    this.lamp = lamp;
  }
  public excute() {
    this.lamp.turnOn();
  }
}

/**
 * * OKGoogle은 클라이언트로 부터 명령을 호출하는 Invoker 의 역할을 합니다.
 */

class OKGoogle {
  private command: Command;
  public setCommand(command: Command): void {
    this.command = command;
  }
  public action(): void {
    this.command.excute();
  }
}

/**
 * *OKGoogle을 사용하는 Client 클래스는 Main Class가 필요없는 JS에서는 Global환경에서 사용하면 됩니다.
 */

const heater = new Heater();
const lamp = new Lamp();

const heaterOnCommand = new HeaterOnCommand(heater);
const lampOnCommand = new LampOnCommand(lamp);

const okGoogle = new OKGoogle();

okGoogle.setCommand(heaterOnCommand);
okGoogle.action();

okGoogle.setCommand(lampOnCommand);
okGoogle.action();
