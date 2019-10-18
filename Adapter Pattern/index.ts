// 설계와 구현의 분리
interface Adapter {
	twiceOf: (number: number) => Array<number>;
	halfOf: (number: number) => string;
}

// 기존의 로직
const twiceOf: (number: number) => number = (number: number) => {
	return number * 2;
};

// 기존의 로지
const halfOf: (number: number) => number = (number: number) => {
	return number / 2;
};

// 강화된 알고리즘
class StringAdapter implements Adapter {
	public twiceOf(number: number) {
		return [ twiceOf(number) ];
	}
	public halfOf(number: number) {
		return halfOf(number).toString();
	}
}

const adapter = new StringAdapter();

const half: string = adapter.halfOf(2);
const twice: Array<number> = adapter.twiceOf(2);

console.log(half, twice);
