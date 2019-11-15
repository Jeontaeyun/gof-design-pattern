/**
 * * State 인터페이스로, 안에 들어있는 open(), close(), save(), edit() 핸들러입니다.
 */
interface State {
  open(): void;
  close(): void;
  save(): void;
  edit(text: string): void;
}
/**
 * * Singleton 패턴으로 구현한 초기 State
 */
class InitState implements State {
  private static instance: State;
  public static getInstance(): InitState {
    if (!!!InitState.instance) {
      InitState.instance = new InitState();
      return InitState.instance;
    } else {
      return InitState.instance;
    }
  }
  public open() {
    console.log("새로 문서가 열렸습니다.");
  }
  public close() {
    console.log("문서 수정 없이 문서가 닫혔습니다.");
  }
  public save() {
    console.log("편집한 내용이 없습니다.");
  }
  public edit(text: string) {
    console.log("init상태 => 편집 상태");
    EditEngine.setState(ModifiedState.getInstance());
  }
}

/**
 * * Singleton 패턴으로 구현한 수정 작업 후 State
 */
class ModifiedState implements State {
  private static instance: State;
  public static getInstance(): InitState {
    if (!!!ModifiedState.instance) {
      ModifiedState.instance = new ModifiedState();
    }
    return ModifiedState.instance;
  }
  public open() {
    console.log("이미 열려있는 파일이 있습니다. 파일을 저장하고 엽니다.");
    this.save();
  }
  public close() {
    console.log("수정된 사항이 있습니다. 파일을 저장하고 종료합니다.");
    this.save();
  }
  public save() {
    console.log("현재 내용을 저장합니다.");
    EditEngine.setState(InitState.getInstance());
  }
  public edit(text: string) {
    console.log("편집 상태 => 편집 상태 (상태 변화 없음) : 편집 중입니다.");
  }
}

/**
 * * 해당 부분은 Context입니다.
 */
class EditEngine implements State {
  private text: string = "";
  private static myState: State = InitState.getInstance();

  get getText() {
    return this.text;
  }

  public static setState(state: State) {
    EditEngine.myState = state;
  }

  public open() {
    EditEngine.myState.open();
  }
  public close() {
    EditEngine.myState.close();
  }
  public save() {
    EditEngine.myState.save();
  }
  public edit(text: string) {
    EditEngine.myState.edit(text);
  }
}

const editor = new EditEngine();

editor.open();
editor.save();
editor.close();
editor.open();
editor.edit("hi");
editor.open();
editor.edit("hello");
editor.close();
editor.edit("hello");
editor.edit("efe");
editor.close();
editor.open();
editor.close();
