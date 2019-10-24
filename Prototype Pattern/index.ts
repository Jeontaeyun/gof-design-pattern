/**
 * 프로토타입의 핵심은 어떤 객체가 자기와 비슷한 객체를 스폰할 수 있다는 점이다. 
 * 유령 객체 하나로 다른 유령 객체를 여럿 만들 수 있다.
 */

abstract class Monster {
	public hp: number;
	public name: string;
	public constructor(name: string) {
		this.hp = 20;
		this.name = name;
	}
	public abstract clone(): Monster;
}

class Ghost extends Monster {
	public constructor() {
		super('고스트');
	}
	public clone(): Monster {
		const newGhost = new Ghost();
		console.log(newGhost);
		return newGhost;
	}
}

class Demon extends Monster {
	public constructor() {
		super('악마');
	}
	public clone(): Monster {
		const newDemon = new Demon();
		console.log(newDemon);
		return newDemon;
	}
}

/**
 * 만약 Monster를 상속받는 모든 클래스에 clone 메서드가 있다면, 
 * 스포너 클래스를 종류별로 만들 필요 없이 하나만 만들면 된다.
 */

class Spawner {
	private prototype: Monster;
	public constructor(prototype: Monster) {
		this.prototype = prototype;
	}

	public spawnMonster() {
		return this.prototype.clone();
	}
}

const ghostSpawner = new Spawner(new Ghost());

ghostSpawner.spawnMonster();
ghostSpawner.spawnMonster();
ghostSpawner.spawnMonster();

const demonSpawner = new Spawner(new Demon());

demonSpawner.spawnMonster();
demonSpawner.spawnMonster();
demonSpawner.spawnMonster();
