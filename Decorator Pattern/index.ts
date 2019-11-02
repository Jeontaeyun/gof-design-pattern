/**
 * readline-sync 패키지를 통해 사용자 입력을 동기적으로 받을 수 있습니다.
 * readline.question을 통해 가능합니다.
 */
const readline = require('readline-sync');

/**
 * Decorator Pattern
 */
/**
 * Component 실질적인 인스턴스를 컨트롤 하는 역할
 * 컴포넌트는 독립적인 기능을 수행하는 단위 모듈이다.
 * 컴포는트의 세부사항은 겉으로 드러나선  안되며, 일부러 끄집어 내려는 시도조차 하지 말아야 하낟.
 * 필요한 것은 단지 해당 컴포넌트를 쓰기 위해서 제공해주는 일종의 장치이ㅣ다.
 */
interface IBeverage {
	getTotalPrice(): number;
}

/**
 * Decorator 부분 Component와 Concrete Decorator를 동일 하도록 해주는 부분
 * Component와 공통적으로 가지는 
 * method를 가진다.
 */
abstract class AbstAdding implements IBeverage {
	private base: IBeverage;
	public constructor(base: IBeverage) {
		this.base = base;
	}
	public getTotalPrice(): number {
		return this.base.getTotalPrice();
	}
}

/**
 * ConcreteComponent 컴포넌트의 실질적인 부분
 */

class Base implements IBeverage {
	public getTotalPrice(): number {
		return 0;
	}
}

/**
 * ConcreteDecorator 실질적인 데코레이팅 된 인스턴스
 */

class Milk extends AbstAdding {
	public constructor(material: IBeverage) {
		super(material);
	}

	public getTotalPrice(): number {
		/**
         * 부모 요소의 getTotalPrice()에 50을 더하는 것
         */
		return super.getTotalPrice() + 50;
	}
}

class Espresso extends AbstAdding {
	protected static espressoCount = 0;
	public constructor(base: IBeverage) {
		super(base);
	}

	public getTotalPrice(): number {
		/**
         * 부모 요소의 getTotalPrice()에 50을 더하는 것
         */
		return super.getTotalPrice() + Espresso.getAddPrice();
	}
	private static getAddPrice(): number {
		Espresso.espressoCount += 1;
		let addPrice = 100;
		/**
         * 두 샷 이후에는 할인
         */
		if (Espresso.espressoCount > 1) {
			addPrice = 70;
		}
		return addPrice;
	}
}

let beverage = new Base();
let done = false;
while (!done) {
	console.log('음료 현재 각격 : ' + beverage.getTotalPrice());
	console.log('[선택] 0: 계산, 1: 샷 추가, 2: 우유 추가');
	const question = readline.question('선택지 : ');
	switch (parseInt(question)) {
		case 0:
			done = true;
			break;
		case 1:
			beverage = new Espresso(beverage);
			break;
		case 2:
			beverage = new Milk(beverage);
			break;
		default:
			console.log('올바른 값을 넣어주세요');
			break;
	}
}
