abstract class Component {
	private name: string;

	public constructor(name: string) {
		this.name = name;
	}

	get getName() {
		return this.name;
	}
	set setName(name: string) {
		this.name = name;
	}
}

class Files extends Component {
	private data: Object;
	get getData() {
		return this.data;
	}
	set setData(data: Object) {
		this.data = data;
	}
	constructor(name: string) {
		super(name);
	}
}

class Folder extends Component {
	public children: Array<Component> = [];
	public addComponent(component: Component): boolean {
		return !!this.children.push(component);
	}

	public removeComponent(component: Component): boolean {
		const index = this.children.indexOf(component, 0);
		if (index > -1) {
			this.children.splice(index, 1);
			return true;
		}
		return false;
	}
}

// Folder
const root = new Folder('root');
const home = new Folder('home');
const garam = new Folder('garam');
const music = new Folder('music');
const picture = new Folder('picture');
const doc = new Folder('doc');
const usr = new Folder('usr');

// File

const track01 = new Folder('track01');
const track02 = new Folder('track02');
const pic1 = new Folder('pic1');
const doc1 = new Folder('doc1');
const java = new Folder('java');

root.addComponent(home);
home.addComponent(garam);
garam.addComponent(music);
music.addComponent(track01);
music.addComponent(track02);
garam.addComponent(picture);
picture.addComponent(pic1);
garam.addComponent(doc);
doc.addComponent(doc1);
root.addComponent(usr);
usr.addComponent(java);

console.log(root.children[0]);
