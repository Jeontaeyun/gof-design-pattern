interface Item {
	use(): void;
}

// 01. DB에서 정보를 읽어옴
// 02. 생성 정보를 DB에 저장
// 03. 그를 바탕으로 아이템 생성하고

// 체력 회복 물약
class HpPortion implements Item {
	public use(): void {
		console.log('체력이 회복되었습니다.');
	}
}

// 마력 회복 물략
class MpPortion implements Item {
	public use(): void {
		console.log('마력이 회복되었습니다.');
	}
}

abstract class ItemCreator {
	protected abstract requestItemInfo(): void;

	protected abstract createItemInfo(): void;

	protected abstract createItem(): Item;

	// 템플릿 메소드 형태로 알고리즘 구분
	public create(): Item {
		let item: Item = null;
		this.requestItemInfo();
		this.createItemInfo();
		item = this.createItem();
		if (item) {
			console.log('아이템 생성 완료');
		}
		return item;
	}
}

class HpPortionCreator extends ItemCreator {
	// 아이템을 생성하기 전 데이터 베이스에서 아이템 정보 요청
	protected requestItemInfo(): void {
		console.log('DB에서 정보를 가져오는 로직');
	}

	protected createItemInfo(): void {
		console.log('아이템 생성 정보를 저장하는 로직', Date.now());
	}
	// 아이템을 생성하는 알고리즘
	protected createItem(): Item {
		return new HpPortion();
	}
}

class MpPortionCreator extends ItemCreator {
	// 아이템을 생성하기 전 데이터 베이스에서 아이템 정보 요청
	protected requestItemInfo(): void {
		console.log('DB에서 정보를 가져오는 로직');
	}

	protected createItemInfo(): void {
		console.log('아이템 생성 정보를 저장하는 로직', Date.now());
	}
	// 아이템을 생성하는 알고리즘
	protected createItem(): Item {
		return new MpPortion();
	}
}

const hpPortionCreator = new HpPortionCreator();

const hpPortion = hpPortionCreator.create();

hpPortion.use();

const mpPortionCreator = new MpPortionCreator();

const mpPortion = mpPortionCreator.create();

mpPortion.use();
