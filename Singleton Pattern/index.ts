class SystemSpeaker {
	private static instance;
	private volume: number;

	// Constructor을 Private으로 지정해 외부에서는 호출할 수 없도록 한다.
	// 해당 객체를 얻기 위해선 반드시 getInstance를 사용해야 한다.
	private constructor() {
		this.volume = 5;
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new SystemSpeaker();
		}
		return this.instance;
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
