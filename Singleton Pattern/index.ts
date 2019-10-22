class SystemSpeaker {
	// Static은 객체를 생성하지 않고, 변수 똔느 함수를 쓸 수 있는 방법을 말한다.
	// 이렇게 선언하면 SystemSpeaker.getInstance()와 같이 사용할 수 있다.
	private static instance;
	private volume: number;

	// Constructor을 Private으로 지정해 외부에서는 호출할 수 없도록 한다.
	// 해당 객체를 얻기 위해선 반드시 getInstance를 사용해야 한다.
	// Typescript에서는 constructor 에도 접근 제한자를 달 수 있으며,
	// 추상 클래스와 인터페이스를 모두 지원한다.
	private constructor() {
		this.volume = 5;
	}

	public static getInstance() {
		if (!this.instance) {
			SystemSpeaker.instance = new SystemSpeaker();
		}
		return SystemSpeaker.instance;
	}

	public setVoluem(volume: number) {
		this.volume = volume;
	}

	public getVoluem(): number {
		return this.volume;
	}
}

const speaker_01 = SystemSpeaker.getInstance();
const speaker_02 = SystemSpeaker.getInstance();

console.log(speaker_01.getVoluem());
console.log(speaker_02.getVoluem());

speaker_01.setVoluem(10);

console.log(speaker_01.getVoluem());
console.log(speaker_02.getVoluem());

speaker_02.setVoluem(20);

console.log(speaker_01.getVoluem());
console.log(speaker_02.getVoluem());
