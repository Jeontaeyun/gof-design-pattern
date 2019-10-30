/**
 * 브리지 패턴이 적용
 * 기능이 다양화 될 때(만약 모스부호를 소리로 만들거나 빛으로 만들 때)
 * 유지 보수 및 확장에 용이해진다.
 */

//MorseCode안의 기능의 구조화
interface MorseCodeFunction {
	dot(): void;
	dash(): void;
	space(): void;
}

class DefaultFunction implements MorseCodeFunction {
	public constructor() {
		return;
	}
	public dot() {
		process.stdout.write('.');
	}
	public dash() {
		process.stdout.write('-');
	}
	public space() {
		process.stdout.write(' ');
	}
}

class SoundFunction implements MorseCodeFunction {
	public dot(): void {
		process.stdout.write('음');
	}
	public dash(): void {
		process.stdout.write('파');
	}
	public space(): void {
		process.stdout.write('삐~');
	}
}

class PrintMorse {
	private morseFunction;
	public constructor(func: MorseCodeFunction) {
		this.morseFunction = func;
	}
	public setFunction(func: MorseCodeFunction) {
		this.morseFunction = func;
	}
	public g(): PrintMorse {
		this.morseFunction.dash();
		this.morseFunction.dash();
		this.morseFunction.dot();
		this.morseFunction.space();
		return this;
	}
	public a(): PrintMorse {
		this.morseFunction.dot();
		this.morseFunction.dash();
		this.morseFunction.space();
		return this;
	}
	public r(): PrintMorse {
		this.morseFunction.dot();
		this.morseFunction.dash();
		this.morseFunction.dot();
		this.morseFunction.space();
		return this;
	}
}

const printMorse = new PrintMorse(new SoundFunction());

printMorse.g().r();

printMorse.setFunction(new DefaultFunction());

printMorse.g().r();
