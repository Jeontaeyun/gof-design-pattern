/**
 * TODO: Aggregate 요소들이 나열되이 있는 집합체 인터페이스
 */

interface Aggregate {
	iterator(): Iter;
}

/**
 * TODO: Iterator 인터페이스는 요소를 하나씩 나열하면서 루프 변수와 같은 역할 수행
 */

interface Iter {
	hasNext(): boolean;
	next(): Object;
}

class Book {
	private name: string;
	public constructor(name: string) {
		this.name = name;
	}
	public getName(): string {
		return this.name;
	}
}

/**
 * TODO: BookShelf는 서기를 나타내는 클래스입니다. 
 */

class BookShelf implements Aggregate {
	private books: Book[];
	private last: number = 0;
	public constructor() {
		this.books = [];
	}
	public getBookAt(index: number) {
		return this.books[index];
	}
	public appendBook(book: Book) {
		this.books[this.last] = book;
		this.last++;
	}
	public getLength(): number {
		return this.last;
	}
	public iterator(): Iter {
		return new BookShelfIterator(this);
	}
}

class BookShelfIterator implements Iter {
	private bookShelf: BookShelf;
	private index: number;
	public constructor(bookShelf: BookShelf) {
		this.bookShelf = bookShelf;
		this.index = 0;
	}
	public hasNext(): boolean {
		if (this.index < this.bookShelf.getLength()) {
			return true;
		} else {
			return false;
		}
	}
	public next(): Object {
		const book = this.bookShelf.getBookAt(this.index);
		this.index++;
		return book;
	}
}

const bookShelf = new BookShelf();
bookShelf.appendBook(new Book('아서'));
bookShelf.appendBook(new Book('반지의 제왕'));
bookShelf.appendBook(new Book('동그라미'));
bookShelf.appendBook(new Book('성경'));
const it = bookShelf.iterator();
while (it.hasNext()) {
	const book: Book = it.next() as Book;
	console.log(book.getName());
}
