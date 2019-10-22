/**
 *  관찰되는 대상
 * */

interface Subject {
	state: any;
	// Observer를 특정 요소에 붙임
	attach(observer: Observer): void;

	// Observer를 특정 요소에서 떼어줌
	detach(observer: Observer): void;

	// 이벤트가 발생하면 모든 옵저버들에게 알려줌
	notify(): void;
}

// 관찰자, 관찰하는 사람
interface Observer {
	update(subject: Subject): void;
}

class ConcreteSubject implements Subject {
	public state: number;

	public constructor(state: number) {
		this.state = state;
	}

	// 해당 서브젝트를 관찰하고 있는 옵저버들 배열
	private observers: Observer[] = [];

	public attach(observer: Observer): void {
		console.log('해당 객체에 새로운 옵저버가 붙었습니다.');
		this.observers.push(observer);
	}

	public detach(observer: Observer): void {
		const observerIndex = this.observers.indexOf(observer);
		// Array.prototype.splice(시작인덱스, 개수) : 해당 배열 범위의 값을 추출하고 그 자리에 새로운 값을 넣거나 삭제함
		this.observers.splice(observerIndex, 1);
		console.log('해당 객체에 옵저버를 제거했습니다.');
	}

	// 이런 방식을 통해서 옵저버들을 업데이트 하는구나
	public notify(): void {
		console.log('옵저버에게 알리기');
		for (const observer of this.observers) {
			observer.update(this);
		}
	}

	public customedBusinessLogic(): void {
		console.log('비즈니스 로직 수행 중');
		this.state = Math.floor(Math.random() * (10 + 1));

		console.log(`상태가 변화하였습니다 : ${this.state}`);
		this.notify();
	}
}

class ConcreteObserverA implements Observer {
	public update(subject: Subject): void {
		if (subject.state < 3) {
			console.log('3 이하인 이벤트에 반응합니다.');
		} else {
			console.log('3 이상인 이벤트에 반응합니다.');
		}
	}
}

class ConcreteObserverB implements Observer {
	public update(subject: Subject): void {
		if (subject.state < 5) {
			console.log('5 이하인 이벤트에 옵저버 A가 반응합니다.');
		} else {
			console.log('5 이상인 이벤트에 옵저버 B가 반응합니다.');
		}
	}
}

const subject: ConcreteSubject = new ConcreteSubject(1);

const observerA: ConcreteObserverA = new ConcreteObserverA();
const observerB: ConcreteObserverB = new ConcreteObserverB();

subject.attach(observerA);

subject.customedBusinessLogic();

subject.detach(observerA);
subject.attach(observerB);
subject.customedBusinessLogic();
