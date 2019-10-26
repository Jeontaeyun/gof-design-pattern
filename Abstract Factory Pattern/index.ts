/**
 * Absctract Factory
 * 특정 컴퓨터는 같은 제조사인 구성품들롤 생산되어야 합니다. 
 * 다시 말하면, SamsungComputer 객체는 항상 삼성 마우스, 키보드, 모니터 객체들이 묶여서 사용됩니다.
 * 즉, 객체를 일관적으로 생산해야 할 필요가 있습니다.
 */

interface Keyboard {}

class LGKeyboard implements Keyboard {
	constructor() {
		console.log('LG 키보드 생성');
	}
}

class SamsungKeyboard implements Keyboard {
	constructor() {
		console.log('Samsung 키보드 생성');
	}
}

interface Mouse {}

class LGMouse implements Mouse {
	constructor() {
		console.log('LG 마우스 생성');
	}
}

class SamsungMouse implements Mouse {
	constructor() {
		console.log('Samsung 마우스 생성');
	}
}

class KeyboardFacotry {
	private keyboard: Keyboard = null;
	public createKeyboard(type: string): Keyboard {
		this.keyboard = null;
		switch (type) {
			case 'LG':
				this.keyboard = new LGKeyboard();
				break;
			case 'Samsung':
				this.keyboard = new SamsungKeyboard();
				break;
		}
		return this.keyboard;
	}
}

class MouseFacotry {
	private mouse: Mouse = null;
	public createMouse(type: string): Mouse {
		this.mouse = null;
		switch (type) {
			case 'LG':
				this.mouse = new LGMouse();
				break;
			case 'Samsung':
				this.mouse = new SamsungMouse();
				break;
		}
		return this.mouse;
	}
}

interface ComputerFactory {
	createKeyboard(): Keyboard;
	createMouse(): Mouse;
}

class SamsungComputerFactory implements ComputerFactory {
	public createKeyboard(): SamsungKeyboard {
		return new SamsungKeyboard();
	}

	public createMouse(): SamsungMouse {
		return new SamsungMouse();
	}
}

class LGComputerFactory implements ComputerFactory {
	public createKeyboard(): LGKeyboard {
		return new LGKeyboard();
	}

	public createMouse(): LGMouse {
		return new LGMouse();
	}
}

/**
 * Factory of Computer Factory
 * 컴퓨터 팩토리를 생성하는 팩토리 구현
 */

class FactoryOfComputerFactory {
	private computerFactory: ComputerFactory = null;
	public createComputer(type: string) {
		switch (type) {
			case 'LG':
				this.computerFactory = new LGComputerFactory();
				break;
			case 'Samsung':
				this.computerFactory = new SamsungComputerFactory();
				break;
		}
		this.computerFactory.createKeyboard();
		this.computerFactory.createMouse();
	}
}
