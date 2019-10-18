// Template Method Pattern
// Typescript도 추상 클래스를 지원한다.
abstract class AbstGameConnectHelper {
	protected abstract doSequrity(string: string): string;
	protected abstract authentication(id: string, password: string): boolean;
	protected abstract authorization(userName: string): number;
	protected abstract connection(info: string): string;
	// Temaplate Method
	public requestConnection(str: string) {
		// 보안 자업 -> 암호화 된 문자열 복호화
		const userInfo = this.doSequrity(str);
		// 반환된 것을 가지지고 아이디, 암호를 할당
		const [ id, password, userName ] = userInfo.split('');

		const authInfo = this.authentication(id, password);
		if (!authInfo) {
			throw new Error('아이디 암호가 데이터베이스에 없습니다. ');
		}
		const authGrant = this.authorization(userName);

		switch (authGrant) {
			case 0:
				console.log('게임 매니저');
				break;
			case 1:
				console.log('유료 회원');
				break;
			case 2:
				console.log('무료 회원');
				break;
			default:
				console.log('권한 없음');
				break;
		}
		return this.connection(userInfo);
	}
}

// 실제 사용 하는 부분

class DefaultGameConnectHelper extends AbstGameConnectHelper {
	protected doSequrity(string: string): string {
		console.log('보안 관련 로직 처리');
		return string;
	}
	protected authentication(id: string, password: string): boolean {
		console.log('유저 인증 로직 처리');
		return true;
	}
	protected authorization(userName: string): number {
		console.log('권한 확인 로직 처리');
		return 0;
	}
	protected connection(info: string): string {
		console.log('접속 단계 로직 처리');
		return '접속 완료';
	}
}

const connectionHelper = new DefaultGameConnectHelper();

const result = connectionHelper.requestConnection('hi');

console.log(result);
