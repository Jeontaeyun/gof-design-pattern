class Beverage {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public prepare() {
    console.log(this.name, "음료를 준비한다.");
  }
}

class RemoteControl {
  public turnOn() {
    console.log("TV를 켠다.");
  }
  public turnOff() {
    console.log("TV를 끈다.");
  }
}

class Movie {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public searchMovie() {
    console.log(this.name, "영화를 찾는다.");
  }
  public chargeMovie() {
    console.log("영화를 결제한다.");
  }
  public playMovie() {
    console.log("영화를 재생한다.");
  }
}
class Facade {
  private _beverageName: string = "";
  private _movieName: string = "";
  public constructor(beverageName: string, movieName: string) {
    this._beverageName = beverageName;
    this._movieName = movieName;
  }
  public viewMovie(): void {
    const beverage = new Beverage(this._beverageName);
    const remote = new RemoteControl();
    const movie = new Movie(this._movieName);

    beverage.prepare();
    remote.turnOn();
    movie.searchMovie();
    movie.chargeMovie();
    movie.playMovie();
  }
}

const facade: Facade = new Facade("콜라", "어벤져스");
facade.viewMovie();
