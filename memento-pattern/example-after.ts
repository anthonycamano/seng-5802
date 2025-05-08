// Memento: Stores the internal state of the Material object
class MaterialMemento {
	private name: string;
	private density: number;
	private color: string;
	private transparent: boolean;

	constructor(
		name: string,
		density: number,
		color: string,
		transparent: boolean
	) {
		this.name = name;
		this.density = density;
		this.color = color;
		this.transparent = transparent;
	}

	// Getters for the stored state (only accessible to the Originator)
	getName(): string {
		return this.name;
	}

	getDensity(): number {
		return this.density;
	}

	getColor(): string {
		return this.color;
	}

	isTransparent(): boolean {
		return this.transparent;
	}
}

// Originator: The Material class that creates a memento containing a snapshot of its current state
class MaterialNew {
	private name: string;
	private density: number;
	private color: string;
	private transparent: boolean;

	constructor(
		name: string,
		density: number,
		color: string,
		transparent: boolean
	) {
		this.name = name;
		this.density = density;
		this.color = color;
		this.transparent = transparent;
	}

	// Save current state into a memento
	saveToMemento(): MaterialMemento {
		return new MaterialMemento(
			this.name,
			this.density,
			this.color,
			this.transparent
		);
	}

	// Restore state from a memento
	restoreFromMemento(memento: MaterialMemento): void {
		this.name = memento.getName();
		this.density = memento.getDensity();
		this.color = memento.getColor();
		this.transparent = memento.isTransparent();
	}

	// Getters and setters
	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
	}

	getDensity(): number {
		return this.density;
	}

	setDensity(density: number): void {
		this.density = density;
	}

	getColor(): string {
		return this.color;
	}

	setColor(color: string): void {
		this.color = color;
	}

	isTransparent(): boolean {
		return this.transparent;
	}

	setTransparent(transparent: boolean): void {
		this.transparent = transparent;
	}

	toString(): string {
		return `Material: ${this.name}, Density: ${this.density}, Color: ${this.color}, Transparent: ${this.transparent}`;
	}
}

// Caretaker: Manages the history of mementos
class MementoHistory {
	private mementos: MaterialMemento[] = [];
	private currentIndex: number = -1;

	// Add a memento to history
	push(memento: MaterialMemento): void {
		// If we're not at the end of the history, truncate the history
		if (this.currentIndex < this.mementos.length - 1) {
			this.mementos = this.mementos.slice(0, this.currentIndex + 1);
		}

		this.mementos.push(memento);
		this.currentIndex = this.mementos.length - 1;
	}

	// Get the previous memento (for undo)
	undo(): MaterialMemento | null {
		if (this.currentIndex <= 0) {
			return null;
		}

		this.currentIndex--;
		return this.mementos[this.currentIndex];
	}

	// Get the next memento (for redo)
	redo(): MaterialMemento | null {
		if (this.currentIndex >= this.mementos.length - 1) {
			return null;
		}

		this.currentIndex++;
		return this.mementos[this.currentIndex];
	}

	// Check if undo is available
	canUndo(): boolean {
		return this.currentIndex > 0;
	}

	// Check if redo is available
	canRedo(): boolean {
		return this.currentIndex < this.mementos.length - 1;
	}
}

class MaterialFormAfter {
	private material: MaterialNew;
	private history: MementoHistory;

	constructor(material: MaterialNew) {
		this.material = material;
		this.history = new MementoHistory();

		// Save the initial state
		this.saveState();
	}

	// Save the current state to history
	private saveState(): void {
		this.history.push(this.material.saveToMemento());
	}

	// Update methods now save state after changes
	updateName(name: string): void {
		this.material.setName(name);
		console.log(`Updated name to: ${name}`);
		this.saveState();
	}

	updateDensity(density: number): void {
		this.material.setDensity(density);
		console.log(`Updated density to: ${density}`);
		this.saveState();
	}

	updateColor(color: string): void {
		this.material.setColor(color);
		console.log(`Updated color to: ${color}`);
		this.saveState();
	}

	updateTransparency(transparent: boolean): void {
		this.material.setTransparent(transparent);
		console.log(`Updated transparency to: ${transparent}`);
		this.saveState();
	}

	// Undo the last change
	undo(): boolean {
		if (!this.history.canUndo()) {
			console.log("Nothing to undo");
			return false;
		}

		const memento = this.history.undo();
		if (memento) {
			this.material.restoreFromMemento(memento);
			console.log("Undo successful");
			return true;
		}
		return false;
	}

	// Redo the last undone change
	redo(): boolean {
		if (!this.history.canRedo()) {
			console.log("Nothing to redo");
			return false;
		}

		const memento = this.history.redo();
		if (memento) {
			this.material.restoreFromMemento(memento);
			console.log("Redo successful");
			return true;
		}
		return false;
	}

	displayMaterial(): void {
		console.log(this.material.toString());
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
