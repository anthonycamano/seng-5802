class MaterialBefore {
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

class MaterialFormBefore {
	private material: MaterialBefore;

	constructor(material: MaterialBefore) {
		this.material = material;
	}

	updateName(name: string): void {
		this.material.setName(name);
		console.log(`Updated name to: ${name}`);
	}

	updateDensity(density: number): void {
		this.material.setDensity(density);
		console.log(`Updated density to: ${density}`);
	}

	updateColor(color: string): void {
		this.material.setColor(color);
		console.log(`Updated color to: ${color}`);
	}

	updateTransparency(transparent: boolean): void {
		this.material.setTransparent(transparent);
		console.log(`Updated transparency to: ${transparent}`);
	}

	displayMaterial(): void {
		console.log(this.material.toString());
	}
}

function mainWithoutMemento() {
	// Example usage
	const glass = new MaterialBefore("Glass", 2.5, "Clear", true);
	const form = new MaterialFormBefore(glass);

	// User makes changes
	form.displayMaterial();
	form.updateName("Tempered Glass");
	form.updateDensity(2.8);
	form.updateColor("Slight blue tint");
	form.displayMaterial();

	// Problem: If user wants to undo changes, there's no way to revert back to the previous state
	console.log("User wants to undo changes but can't!");
}

mainWithoutMemento();
