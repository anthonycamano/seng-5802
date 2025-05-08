// Memento: Stores the internal state of the Material object
class MaterialMemento {
	private _name: string;
	private _density: number;
	private _color: string;
	private _transparent: boolean;

	constructor(
		name: string,
		density: number,
		color: string,
		transparent: boolean
	) {
		this._name = name;
		this._density = density;
		this._color = color;
		this._transparent = transparent;
	}

	// Getters for the stored state (only accessible to the Originator)
	getName(): string {
		return this._name;
	}

	getDensity(): number {
		return this._density;
	}

	getColor(): string {
		return this._color;
	}

	isTransparent(): boolean {
		return this._transparent;
	}
}

// Originator: The Material class that creates a memento containing a snapshot of its current state
class MaterialNew {
	private _name: string;
	private _density: number;
	private _color: string;
	private _transparent: boolean;

	constructor(
		name: string,
		density: number,
		color: string,
		transparent: boolean
	) {
		this._name = name;
		this._density = density;
		this._color = color;
		this._transparent = transparent;
	}

	// Save current state into a memento
	saveToMemento(): MaterialMemento {
		return new MaterialMemento(
			this._name,
			this._density,
			this._color,
			this._transparent
		);
	}

	// Restore state from a memento
	restoreFromMemento(memento: MaterialMemento): void {
		this._name = memento.getName();
		this._density = memento.getDensity();
		this._color = memento.getColor();
		this._transparent = memento.isTransparent();
	}

	// Getters and setters
	get getName(): string {
		return this._name;
	}

	set setName(name: string) {
		this._name = name;
	}

	get getDensity(): number {
		return this._density;
	}

	set setDensity(density: number) {
		this._density = density;
	}

	get getColor(): string {
		return this._color;
	}

	set setColor(color: string) {
		this._color = color;
	}

	get isTransparent(): boolean {
		return this._transparent;
	}

	set setTransparent(transparent: boolean) {
		this._transparent = transparent;
	}

	description(): string {
		return `Material: ${this._name}, Density: ${this._density}, Color: ${this._color}, Transparent: ${this._transparent}`;
	}
}

// Caretaker: Manages the history of mementos
class MementoHistory {
	private _mementos: MaterialMemento[] = [];
	private _currentIndex: number = -1;

	// Add a memento to history
	push(memento: MaterialMemento): void {
		// If we're not at the end of the history, truncate the history
		if (this._currentIndex < this._mementos.length - 1) {
			this._mementos = this._mementos.slice(0, this._currentIndex + 1);
		}

		this._mementos.push(memento);
		this._currentIndex = this._mementos.length - 1;
	}

	// Get the previous memento (for undo)
	undo(): MaterialMemento | null {
		if (this._currentIndex <= 0) {
			return null;
		}

		this._currentIndex--;
		return this._mementos[this._currentIndex];
	}

	// Get the next memento (for redo)
	redo(): MaterialMemento | null {
		if (this._currentIndex >= this._mementos.length - 1) {
			return null;
		}

		this._currentIndex++;
		return this._mementos[this._currentIndex];
	}

	// Check if undo is available
	canUndo(): boolean {
		return this._currentIndex > 0;
	}

	// Check if redo is available
	canRedo(): boolean {
		return this._currentIndex < this._mementos.length - 1;
	}
}

class MaterialFormAfter {
	private _material: MaterialNew;
	private _history: MementoHistory;

	constructor(material: MaterialNew) {
		this._material = material;
		this._history = new MementoHistory();

		// Save the initial state
		this.saveState();
	}

	// Save the current state to history
	private saveState(): void {
		this._history.push(this._material.saveToMemento());
	}

	// Update methods now save state after changes
	updateName(name: string): void {
		this._material.setName = name;
		console.log(`Updated name to: ${name}`);
		this.saveState();
	}

	updateDensity(density: number): void {
		this._material.setDensity = density;
		console.log(`Updated density to: ${density}`);
		this.saveState();
	}

	updateColor(color: string): void {
		this._material.setColor = color;
		console.log(`Updated color to: ${color}`);
		this.saveState();
	}

	updateTransparency(transparent: boolean): void {
		this._material.setTransparent = transparent;
		console.log(`Updated transparency to: ${transparent}`);
		this.saveState();
	}

	// Undo the last change
	undo(): boolean {
		if (!this._history.canUndo()) {
			console.log("Nothing to undo");
			return false;
		}

		const memento = this._history.undo();
		if (memento) {
			this._material.restoreFromMemento(memento);
			console.log("Undo successful");
			return true;
		}
		return false;
	}

	// Redo the last undone change
	redo(): boolean {
		if (!this._history.canRedo()) {
			console.log("Nothing to redo");
			return false;
		}

		const memento = this._history.redo();
		if (memento) {
			this._material.restoreFromMemento(memento);
			console.log("Redo successful");
			return true;
		}
		return false;
	}

	displayMaterial(): void {
		console.log(this._material.description());
	}
}

function mainWithMemento() {
	const glass = new MaterialNew("Glass", 2.5, "Clear", true);
	const form = new MaterialFormAfter(glass);

	// User makes changes
	form.displayMaterial();
	form.updateName("Tempered Glass");
	form.updateDensity(2.8);
	form.updateColor("Slight blue tint");
	form.displayMaterial();

	// User can now undo changes
	console.log("\nUndoing the last change:");
	form.undo();
	form.displayMaterial();

	console.log("\nUndoing another change:");
	form.undo();
	form.displayMaterial();

	console.log("\nRedoing a change:");
	form.redo();
	form.displayMaterial();

	// Making a new change after undo truncates the redo history
	console.log("\nMaking a new change after undo:");
	form.updateTransparency(false);
	form.displayMaterial();

	// Previous redo is no longer available
	console.log("\nTrying to redo (should fail):");
	form.redo();
}

// call main
mainWithMemento();
