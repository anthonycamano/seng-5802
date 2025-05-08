// Memento: Stores the internal state of the Material object
var MaterialMemento = /** @class */ (function () {
    function MaterialMemento(name, density, color, transparent) {
        this._name = name;
        this._density = density;
        this._color = color;
        this._transparent = transparent;
    }
    // Getters for the stored state (only accessible to the Originator)
    MaterialMemento.prototype.getName = function () {
        return this._name;
    };
    MaterialMemento.prototype.getDensity = function () {
        return this._density;
    };
    MaterialMemento.prototype.getColor = function () {
        return this._color;
    };
    MaterialMemento.prototype.isTransparent = function () {
        return this._transparent;
    };
    return MaterialMemento;
}());
// Originator: The Material class that creates a memento containing a snapshot of its current state
var MaterialNew = /** @class */ (function () {
    function MaterialNew(name, density, color, transparent) {
        this._name = name;
        this._density = density;
        this._color = color;
        this._transparent = transparent;
    }
    // Save current state into a memento
    MaterialNew.prototype.saveToMemento = function () {
        return new MaterialMemento(this._name, this._density, this._color, this._transparent);
    };
    // Restore state from a memento
    MaterialNew.prototype.restoreFromMemento = function (memento) {
        this._name = memento.getName();
        this._density = memento.getDensity();
        this._color = memento.getColor();
        this._transparent = memento.isTransparent();
    };
    Object.defineProperty(MaterialNew.prototype, "getName", {
        // Getters and setters
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "setName", {
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "getDensity", {
        get: function () {
            return this._density;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "setDensity", {
        set: function (density) {
            this._density = density;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "getColor", {
        get: function () {
            return this._color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "setColor", {
        set: function (color) {
            this._color = color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "isTransparent", {
        get: function () {
            return this._transparent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaterialNew.prototype, "setTransparent", {
        set: function (transparent) {
            this._transparent = transparent;
        },
        enumerable: false,
        configurable: true
    });
    MaterialNew.prototype.description = function () {
        return "Material: ".concat(this._name, ", Density: ").concat(this._density, ", Color: ").concat(this._color, ", Transparent: ").concat(this._transparent);
    };
    return MaterialNew;
}());
// Caretaker: Manages the history of mementos
var MementoHistory = /** @class */ (function () {
    function MementoHistory() {
        this._mementos = [];
        this._currentIndex = -1;
    }
    // Add a memento to history
    MementoHistory.prototype.push = function (memento) {
        // If we're not at the end of the history, truncate the history
        if (this._currentIndex < this._mementos.length - 1) {
            this._mementos = this._mementos.slice(0, this._currentIndex + 1);
        }
        this._mementos.push(memento);
        this._currentIndex = this._mementos.length - 1;
    };
    // Get the previous memento (for undo)
    MementoHistory.prototype.undo = function () {
        if (this._currentIndex <= 0) {
            return null;
        }
        this._currentIndex--;
        return this._mementos[this._currentIndex];
    };
    // Get the next memento (for redo)
    MementoHistory.prototype.redo = function () {
        if (this._currentIndex >= this._mementos.length - 1) {
            return null;
        }
        this._currentIndex++;
        return this._mementos[this._currentIndex];
    };
    // Check if undo is available
    MementoHistory.prototype.canUndo = function () {
        return this._currentIndex > 0;
    };
    // Check if redo is available
    MementoHistory.prototype.canRedo = function () {
        return this._currentIndex < this._mementos.length - 1;
    };
    return MementoHistory;
}());
var MaterialFormAfter = /** @class */ (function () {
    function MaterialFormAfter(material) {
        this._material = material;
        this._history = new MementoHistory();
        // Save the initial state
        this.saveState();
    }
    // Save the current state to history
    MaterialFormAfter.prototype.saveState = function () {
        this._history.push(this._material.saveToMemento());
    };
    // Update methods now save state after changes
    MaterialFormAfter.prototype.updateName = function (name) {
        this._material.setName = name;
        console.log("Updated name to: ".concat(name));
        this.saveState();
    };
    MaterialFormAfter.prototype.updateDensity = function (density) {
        this._material.setDensity = density;
        console.log("Updated density to: ".concat(density));
        this.saveState();
    };
    MaterialFormAfter.prototype.updateColor = function (color) {
        this._material.setColor = color;
        console.log("Updated color to: ".concat(color));
        this.saveState();
    };
    MaterialFormAfter.prototype.updateTransparency = function (transparent) {
        this._material.setTransparent = transparent;
        console.log("Updated transparency to: ".concat(transparent));
        this.saveState();
    };
    // Undo the last change
    MaterialFormAfter.prototype.undo = function () {
        if (!this._history.canUndo()) {
            console.log("Nothing to undo");
            return false;
        }
        var memento = this._history.undo();
        if (memento) {
            this._material.restoreFromMemento(memento);
            console.log("Undo successful");
            return true;
        }
        return false;
    };
    // Redo the last undone change
    MaterialFormAfter.prototype.redo = function () {
        if (!this._history.canRedo()) {
            console.log("Nothing to redo");
            return false;
        }
        var memento = this._history.redo();
        if (memento) {
            this._material.restoreFromMemento(memento);
            console.log("Redo successful");
            return true;
        }
        return false;
    };
    MaterialFormAfter.prototype.displayMaterial = function () {
        console.log(this._material.description());
    };
    return MaterialFormAfter;
}());
function mainWithMemento() {
    var glass = new MaterialNew("Glass", 2.5, "Clear", true);
    var form = new MaterialFormAfter(glass);
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
