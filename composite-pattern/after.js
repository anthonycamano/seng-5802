"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
var Composite;
(function (Composite) {
    // Leaf: Basic implementation for a single ride
    var SingleRide = /** @class */ (function () {
        function SingleRide(rideType, distance, baseFare, pricePerKm) {
            this.rideType = rideType;
            this.distance = distance;
            this.baseFare = baseFare;
            this.pricePerKm = pricePerKm;
        }
        SingleRide.prototype.calculateFare = function () {
            return this.baseFare + this.distance * this.pricePerKm;
        };
        SingleRide.prototype.getDescription = function () {
            return "".concat(this.rideType, " - ").concat(this.distance, "km");
        };
        return SingleRide;
    }());
    // Leaf: Specific ride pricing adjustments
    var RideSurcharge = /** @class */ (function () {
        function RideSurcharge(reason, amount) {
            this.reason = reason;
            this.amount = amount;
        }
        RideSurcharge.prototype.calculateFare = function () {
            return this.amount;
        };
        RideSurcharge.prototype.getDescription = function () {
            return "".concat(this.reason, " ($").concat(this.amount.toFixed(2), ")");
        };
        return RideSurcharge;
    }());
    // Composite: Can contain other components (both SingleRide and other CompositeRides)
    var CompositeRide = /** @class */ (function () {
        function CompositeRide(name) {
            this.components = [];
            this.name = name;
        }
        CompositeRide.prototype.add = function (component) {
            this.components.push(component);
        };
        CompositeRide.prototype.remove = function (component) {
            var index = this.components.indexOf(component);
            if (index !== -1) {
                this.components.splice(index, 1);
            }
        };
        CompositeRide.prototype.calculateFare = function () {
            return this.components.reduce(function (total, component) {
                return total + component.calculateFare();
            }, 0);
        };
        CompositeRide.prototype.getDescription = function () {
            if (this.components.length === 0) {
                return this.name;
            }
            var descriptions = this.components.map(function (component) {
                return component.getDescription();
            });
            return "".concat(this.name, " [").concat(descriptions.join(" + "), "]");
        };
        return CompositeRide;
    }());
    function main() {
        // Create individual ride types
        var uberX = new SingleRide(shared_1.RideType.UberX, 10, 2.5, 1.5); // 10km ride
        var uberBlack = new SingleRide(shared_1.RideType.UberBlack, 10, 5, 2.5); // 10km but premium
        // Create surcharges
        var peakHours = new RideSurcharge("Peak Hours", 3.5);
        var airportFee = new RideSurcharge("Airport Fee", 5);
        // Create a standard ride with surge pricing
        var standardRideWithSurge = new CompositeRide("Standard Ride with Surge");
        standardRideWithSurge.add(uberX);
        standardRideWithSurge.add(peakHours);
        // Create a premium airport pickup
        var premiumAirportRide = new CompositeRide("Premium Airport Pickup");
        premiumAirportRide.add(uberBlack);
        premiumAirportRide.add(airportFee);
        // Create a package for a corporate client with multiple rides
        var corporatePackage = new CompositeRide("Corporate Package");
        corporatePackage.add(standardRideWithSurge);
        corporatePackage.add(premiumAirportRide);
        // How different scenarios may play out
        // Leaf: UberX
        console.log("UberX Fare: $".concat(uberX.calculateFare().toFixed(2)));
        console.log("UberX Description: ".concat(uberX.getDescription()));
        console.log("---------------");
        // Leaf: UberBlack
        console.log("UberBlack Fare: $".concat(uberBlack.calculateFare().toFixed(2)));
        console.log("UberBlack Description: ".concat(uberBlack.getDescription()));
        console.log("---------------");
        // Composite: standardRideWithSurge
        console.log("Standard Ride with Surge Fare: $".concat(standardRideWithSurge
            .calculateFare()
            .toFixed(2)));
        console.log("Standard Ride with Surge Description: ".concat(standardRideWithSurge.getDescription()));
        console.log("---------------");
        // Composite: premiumAirportRide
        console.log("Premium Airport Ride Fare: $".concat(premiumAirportRide
            .calculateFare()
            .toFixed(2)));
        console.log("Premium Airport Ride Description: ".concat(premiumAirportRide.getDescription()));
        console.log("---------------");
        // Composite: corporatePackage
        console.log("Corporate Package Total Fare: $".concat(corporatePackage
            .calculateFare()
            .toFixed(2)));
        console.log("Corporate Package Description: ".concat(corporatePackage.getDescription()));
        // New case where we want to modify an element, in this case a composite
        console.log("\nModifying the Corporate Package...");
        var specialDiscount = new RideSurcharge("Corporate Discount", -15); // Negative value for discount
        corporatePackage.add(specialDiscount);
        console.log("Updated Corporate Package Fare: $".concat(corporatePackage
            .calculateFare()
            .toFixed(2)));
        console.log("Updated Corporate Package Description: ".concat(corporatePackage.getDescription()));
    }
    main();
})(Composite || (Composite = {}));
