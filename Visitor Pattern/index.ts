interface Visitable {
	accept(visitor: Visitor): void;
}

interface Visitor {
	visit(visitable: Visitable): void;
}

class VisitableA implements Visitable {
	private age: number;

	public constructor(age: number) {
		this.age = age;
	}

	public accept(visitor: Visitor) {
		visitor.visit(this);
	}

	set setAge(age: number) {
		this.age = age;
	}
	get getAge() {
		return this.age;
	}
}

class VisitorA implements Visitor {
	private ageSum: number;

	public constructor() {
		this.ageSum = 0;
	}
	public visit(visitable: Visitable) {
		if (visitable instanceof VisitableA) {
			this.ageSum += visitable.getAge;
		} else {
		}
	}

	get getAgeSum() {
		return this.ageSum;
	}
}

const visitables: Array<Visitable> = [];
visitables.push(new VisitableA(1));
visitables.push(new VisitableA(2));
visitables.push(new VisitableA(3));
visitables.push(new VisitableA(4));
visitables.push(new VisitableA(5));

const visitor = new VisitorA();

visitables.forEach((visitable) => {
	visitable.accept(visitor);
});

console.log(visitor.getAgeSum);
