/**
 * * 통신할 객체 중 이벤트를 보내는 Source 객체의 인터페이스
 */

interface ISource {
  setMediator(mediator: IMediator): void;
  eventOccured(event: string): void;
}

/**
 * * Source 인터페이스와 Destination 객체를 연결해 줄 중재자 인터페이스
 */
interface IMediator {
  onEvent(fromSource: string, event: string): void;
  addDestination(destination: IDestination): void;
}

/**
 * * 통신할 객체 중 이벤트를 수신해 동작하는 Destination 의 인터페이스
 */

interface IDestination {
  receiveEvent(fromSource: string, event: string);
}

/**
 * * 구체적으로 구현된 Mediator 만약 이벤트가 발생하면, list에 보관된 Destination객체들에 이벤트를 송신
 */

class ConcreteMediator implements IMediator {
  private list: Array<IDestination> = [];
  public addDestination(destination: IDestination) {
    this.list.push(destination);
  }
  public onEvent(fromSource: string, event: string): void {
    this.list.forEach((item: IDestination) => {
      item.receiveEvent(fromSource, event);
    });
  }
}

/**
 * * 이벤트를 발생시키는 구체적인 Source Colleague
 */

class TcpComm implements ISource {
  private mediator: IMediator;
  public setMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }
  public eventOccured(event: string) {
    this.mediator.onEvent("TCP comm", event);
  }
}

/**
 * * 이벤트를 발생시키는 구체적인 Source Colleague
 */

class SystemSignal implements ISource {
  private mediator: IMediator;
  public setMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }
  public eventOccured(event: string) {
    this.mediator.onEvent("System comm", event);
  }
}

/**
 * * 이벤트를 받아 이벤트를 수행하는 구체적인 Destination Colleague
 */

class Display implements IDestination {
  public receiveEvent(fromSource: string, event: string) {
    console.log(`Display : from ${fromSource} / event : ${event}`);
  }
}

/**
 * * 이벤트를 받아 이벤트를 수행하는 구체적인 IDestination Colleague
 */

class Log implements IDestination {
  public receiveEvent(fromSource: string, event: string) {
    console.log(`Log : from ${fromSource} / event : ${event}`);
  }
}

const mediator = new ConcreteMediator();

const tcp = new TcpComm();
const system = new SystemSignal();

tcp.setMediator(mediator);
system.setMediator(mediator);

mediator.addDestination(new Display());
mediator.addDestination(new Log());

tcp.eventOccured("tcp error");
tcp.eventOccured("tcp hello");
system.eventOccured("system hello");
system.eventOccured("system hi");
