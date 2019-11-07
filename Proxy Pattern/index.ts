interface Subject {
	smallAction(): void;
	bigAction(): void;
}

class RealSubject implements Subject {
	public smallAction(): void {
		console.log('단순한 업무 by 실재 ');
	}
	public bigAction(): void {
		console.log('복잡한 업무 by 실재 ');
	}
}

class Proxys implements Subject {
	private realSubject: RealSubject;
	public constructor(realSubject: RealSubject) {
		this.realSubject = realSubject;
		return this;
	}
	public smallAction(): void {
		console.log('단순한 업무 by 프록시 ');
	}
	public bigAction(): void {
		this.realSubject.bigAction();
	}
}

const real = new RealSubject();
const proxy01 = new Proxys(real);
const proxy02 = new Proxys(real);

proxy01.bigAction();
proxy01.smallAction();

proxy02.bigAction();
proxy02.smallAction();
