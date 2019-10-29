class MorseCode {
	public dot(): void {
		console.log('');
	}
	public dash(): void {
		console.log('');
	}
	public space(): void {
		console.log('');
		s;
	}
}

class PrintMorse extends MorseCode {
	public g(): void {
		this.dash();
		this.dash();
		this.dot();
		this.space();
	}
	public a(): void {
		this.dot();
		this.dash();
		this.space();
	}
	public r(): void {
		this.dot();
		this.dash();
		this.dot();
		this.space();
	}
}
