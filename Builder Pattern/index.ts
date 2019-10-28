class Computer {
	private _cpu: string;
	private _ram: string;
	private _storage: string;

	constructor(cpu: string, ram: string, storage: string) {
		this._cpu = cpu;
		this._ram = ram;
		this.storage = storage;
	}

	get cpu(): string {
		return this._cpu;
	}
	set cpu(newCpu: string) {
		this._cpu = newCpu;
	}

	get ram(): string {
		return this._ram;
	}
	set ram(newRam: string) {
		this._ram = newRam;
	}

	get storage(): string {
		return this._storage;
	}
	set storage(newStorage: string) {
		this._storage = newStorage;
	}
}

class ComputerBuilder {
	private computer: Computer;

	private constructor() {
		this.computer = new Computer('default', 'default', 'default');
	}
	public static start(): ComputerBuilder {
		return new ComputerBuilder();
	}

	public setCpu(cpu: string): ComputerBuilder {
		this.computer.cpu = cpu;
		return this;
	}
	public setRam(ram: string): ComputerBuilder {
		this.computer.ram = ram;
		return this;
	}
	public setStorage(storage: string): ComputerBuilder {
		this.computer.storage = storage;
		return this;
	}
	public build(): Computer {
		return this.computer;
	}
}

const computer = ComputerBuilder.start().setCpu('i7').setRam('MMR4').setStorage('SSD').build();

console.log(computer);
