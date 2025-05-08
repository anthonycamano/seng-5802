var Material = /** @class */ (function () {
    function Material(name, density, color, transparent) {
        this._history = [];
        this._name = name;
        this._density = density;
        this._color = color;
        this._transparent = transparent;
    }
    Object.defineProperty(Material.prototype, "getName", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "setName", {
        set: function (name) {
            // Save current state before modification
            this.saveSnapshot();
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "getDensity", {
        get: function () {
            return this._density;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "setDensity", {
        set: function (density) {
            // Save current state before modification
            this.saveSnapshot();
            this._density = density;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "getColor", {
        get: function () {
            return this._color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "setColor", {
        set: function (color) {
            // Save current state before modification
            this.saveSnapshot();
            this._color = color;
        },
        enumerable: false,
        configurable: true
    });
    Material.prototype.isTransparent = function () {
        return this._transparent;
    };
    Object.defineProperty(Material.prototype, "setTransparent", {
        set: function (transparent) {
            // Save current state before modification
            this.saveSnapshot();
            this._transparent = transparent;
        },
        enumerable: false,
        configurable: true
    });
    Material.prototype.description = function () {
        return "Material: ".concat(this._name, ", Density: ").concat(this._density, ", Color: ").concat(this._color, ", Transparent: ").concat(this._transparent);
    };
    // Private helper to save the current state
    Material.prototype.saveSnapshot = function () {
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
    };
    // Public method to undo the last change
    Material.prototype.undo = function () {
        if (this._history.length === 0) {
            console.log("Nothing to undo!");
            return false;
        }
        var previousState = this._history.pop();
        this._name = previousState.name;
        this._density = previousState.density;
        this._color = previousState.color;
        this._transparent = previousState.transparent;
        return true;
    };
    return Material;
}());
var MaterialForm = /** @class */ (function () {
    function MaterialForm(material) {
        this.material = material;
    }
    MaterialForm.prototype.updateName = function (name) {
        this.material.setName = name;
        console.log("Updated name to: ".concat(name));
    };
    MaterialForm.prototype.updateDensity = function (density) {
        this.material.setDensity = density;
        console.log("Updated density to: ".concat(density));
    };
    MaterialForm.prototype.updateColor = function (color) {
        this.material.setColor = color;
        console.log("Updated color to: ".concat(color));
    };
    MaterialForm.prototype.updateTransparency = function (transparent) {
        this.material.setTransparent = transparent;
        console.log("Updated transparency to: ".concat(transparent));
    };
    MaterialForm.prototype.displayMaterial = function () {
        console.log(this.material.description());
    };
    // Add undo functionality to the form
    MaterialForm.prototype.undo = function () {
        if (this.material.undo()) {
            this.displayMaterial();
        }
    };
    return MaterialForm;
}());
function mainWithUndo() {
    // Example usage
    var glass = new Material("Glass", 2.5, "Clear", true);
    var form = new MaterialForm(glass);
    // User makes changes
    console.log("Initial state:");
    form.displayMaterial();
    form.updateName("Tempered Glass");
    form.updateDensity(2.8);
    form.updateColor("Slight blue tint");
    console.log("\nAfter changes:");
    form.displayMaterial();
    // User can undo changes, but NOT redo
    console.log("\nUndoing last change (color change):");
    form.undo();
    console.log("\nUndoing another change (density change):");
    form.undo();
    console.log("\nUndoing another change (name change):");
    form.undo();
    console.log("\nTrying to undo again (no more to undo):");
    form.undo();
}
mainWithUndo();
