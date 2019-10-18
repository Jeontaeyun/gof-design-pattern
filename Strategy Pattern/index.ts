// 추상적인 접근점 - 무기에 접근할 수 있다.
interface Weapon {
	// 무기는 attack()이라는 기능(알고리즘)이 있음
	attack: () => void;
}

class Sword implements Weapon {
	public attack() {
		console.log('검 공격');
	}
}

class Spear implements Weapon {
	public attack() {
		console.log('창 공격');
	}
}

class Bow implements Weapon {
	public attack() {
		console.log('활 공격');
	}
}

class GameUser {
	// 접근점
	private weapon: Weapon | null = null;

	// 교환 가능
	public setWeapon(weapon: Weapon) {
		this.weapon = weapon;
	}

	public attack() {
		if (this.weapon === null) {
			console.log('맨손 공격');
		} else {
			// 델리게이트 Delegate
			// 공격에 대한 기능을 weapon이라는 객체에 위임
			this.weapon.attack();
		}
	}
}

const testUser = new GameUser();
testUser.setWeapon(new Sword());
testUser.attack();

testUser.setWeapon(new Bow());
testUser.attack();

testUser.setWeapon(new Spear());
testUser.attack();

testUser.setWeapon(null);
testUser.attack();
