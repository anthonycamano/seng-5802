class Material {
	private _name: string;
	private _density: number;
	private _color: string;
	private _transparent: boolean;
	private _history: Array<{
		name: string;
		density: number;
		color: string;
		transparent: boolean;
	}> = [];

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

	get getName(): string {
		return this._name;
	}
	set setName(name: string) {
		// Save current state before modification
		this.saveState();
		this._name = name;
	}

	get getDensity(): number {
		return this._density;
	}
	set setDensity(density: number) {
		// Save current state before modification
		this.saveState();
		this._density = density;
	}

	get getColor(): string {
		return this._color;
	}
	set setColor(color: string) {
		// Save current state before modification
		this.saveState();
		this._color = color;
	}

	isTransparent(): boolean {
		return this._transparent;
	}
	set setTransparent(transparent: boolean) {
		// Save current state before modification
		this.saveState();
		this._transparent = transparent;
	}

	description(): string {
		return `Material: ${this._name}, Density: ${this._density}, Color: ${this._color}, Transparent: ${this._transparent}`;
	}

	// Private helper to save the current state
	private saveState(): void {
		this._history.push({
			name: this._name,
			density: this._density,
			color: this._color,
			transparent: this._transparent,
		});

		// Limit history size to 10 to prevent memory issues
		if (this._history.length > 10) {
			this._history.shift(); // Remove oldest state if history exceeds 10 entries
		}
	}

	// Public method to undo the last change
	undo(): boolean {
		if (this._history.length === 0) {
			console.log("Nothing to undo!");
			return false;
		}

		const previousState = this._history.pop();
		this._name = previousState!.name;
		this._density = previousState!.density;
		this._color = previousState!.color;
		this._transparent = previousState!.transparent;

		console.log("Last change undone!");
		return true;
	}
}

class MaterialForm {
	private material: Material;

	constructor(material: Material) {
		this.material = material;
	}

	updateName(name: string): void {
		this.material.setName = name;
		console.log(`Updated name to: ${name}`);
	}

	updateDensity(density: number): void {
		this.material.setDensity = density;
		console.log(`Updated density to: ${density}`);
	}

	updateColor(color: string): void {
		this.material.setColor = color;
		console.log(`Updated color to: ${color}`);
	}

	updateTransparency(transparent: boolean): void {
		this.material.setTransparent = transparent;
		console.log(`Updated transparency to: ${transparent}`);
	}

	displayMaterial(): void {
		console.log(this.material.description());
	}

	// Add undo functionality to the form
	undo(): void {
		if (this.material.undo()) {
			console.log("Undone last change. Current state:");
			this.displayMaterial();
		}
	}
}

function mainWithUndo() {
	// Example usage
	const glass = new Material("Glass", 2.5, "Clear", true);
	const form = new MaterialForm(glass);

	// User makes changes
	console.log("Initial state:");
	form.displayMaterial();

	form.updateName("Tempered Glass");
	form.updateDensity(2.8);
	form.updateColor("Slight blue tint");

	console.log("\nAfter changes:");
	form.displayMaterial();

	// Now user can undo changes
	console.log("\nUndoing last change (color change):");
	form.undo();

	console.log("\nUndoing another change (density change):");
	form.undo();

	console.log("\nUndoing another change (name change):");
	form.undo();

	console.log("\nTrying to undo again (should show 'Nothing to undo'):");
	form.undo();
}

mainWithUndo();
