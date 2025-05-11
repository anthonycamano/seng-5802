"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
var WithoutComposite;
(function (WithoutComposite) {
    // Individual ride types without a common interface
    var UberX = /** @class */ (function () {
        function UberX(distance) {
            this.distance = distance;
        }
        UberX.prototype.calculateFare = function () {
            return 2.5 + this.distance * 1.5;
        };
        UberX.prototype.getDescription = function () {
            return "UberX - ".concat(this.distance, "km");
        };
        return UberX;
    }());
    var UberBlack = /** @class */ (function () {
        function UberBlack(distance) {
            this.distance = distance;
        }
        UberBlack.prototype.calculateFare = function () {
            return 5 + this.distance * 2.5;
        };
        UberBlack.prototype.getDescription = function () {
            return "UberBlack - ".concat(this.distance, "km");
        };
        return UberBlack;
    }());
    // Special fare calculator that handles additional charges
    var FareCalculator = /** @class */ (function () {
        function FareCalculator() {
        }
        FareCalculator.prototype.calculateTotalFare = function (rideType, distance, isPeakHours, isAirportPickup, hasSpecialDiscount) {
            if (isPeakHours === void 0) { isPeakHours = false; }
            if (isAirportPickup === void 0) { isAirportPickup = false; }
            if (hasSpecialDiscount === void 0) { hasSpecialDiscount = false; }
            var totalFare = 0;
            // Calculate base ride fare
            if (rideType === shared_1.RideType.UberX) {
                totalFare = 2.5 + distance * 1.5;
            }
            else if (rideType === shared_1.RideType.UberBlack) {
                totalFare = 5 + distance * 2.5;
            }
            else {
                throw new Error("Unknown ride type");
            }
            // Add surcharges
            if (isPeakHours) {
                totalFare += 3.5;
            }
            if (isAirportPickup) {
                totalFare += 5;
            }
            // Apply discount
            if (hasSpecialDiscount) {
                totalFare -= 15;
            }
            return totalFare;
        };
        FareCalculator.prototype.getDescription = function (rideType, distance, isPeakHours, isAirportPickup, hasSpecialDiscount) {
            if (isPeakHours === void 0) { isPeakHours = false; }
            if (isAirportPickup === void 0) { isAirportPickup = false; }
            if (hasSpecialDiscount === void 0) { hasSpecialDiscount = false; }
            var description = "".concat(rideType, " - ").concat(distance, "km");
            if (isPeakHours) {
                description += " + Peak Hours Surcharge ($3.50)";
            }
            if (isAirportPickup) {
                description += " + Airport Fee ($5.00)";
            }
            if (hasSpecialDiscount) {
                description += " - Corporate Discount ($15.00)";
            }
            return description;
        };
        return FareCalculator;
    }());
    // Corporate package handling requires special case logic
    var CorporatePackageCalculator = /** @class */ (function () {
        function CorporatePackageCalculator() {
        }
        CorporatePackageCalculator.prototype.calculatePackageFare = function (rides, hasDiscount) {
            var totalFare = 0;
            var fareCalculator = new FareCalculator();
            for (var _i = 0, rides_1 = rides; _i < rides_1.length; _i++) {
                var ride = rides_1[_i];
                totalFare += fareCalculator.calculateTotalFare(ride.type, ride.distance, ride.type === shared_1.RideType.UberX, // Assume UberX has peak hour surcharge for this example
                ride.type === shared_1.RideType.UberBlack // Assume UberBlack has airport fee for this example
                );
            }
            if (hasDiscount) {
                totalFare -= 15;
            }
            return totalFare;
        };
        return CorporatePackageCalculator;
    }());
    // Client code
    function main() {
        var uberX = new UberX(10);
        var uberBlack = new UberBlack(10);
        var fareCalculator = new FareCalculator();
        var corporateCalculator = new CorporatePackageCalculator();
        // Calculate individual rides - not fancy
        //uberX
        console.log("UberX Fare: $".concat(uberX.calculateFare().toFixed(2)));
        console.log("UberX Description: ".concat(uberX.getDescription()));
        console.log("---------------");
        // uberBlack
        console.log("UberBlack Fare: $".concat(uberBlack.calculateFare().toFixed(2)));
        console.log("UberBlack Description: ".concat(uberBlack.getDescription()));
        console.log("---------------");
        // Calculate individual rides with fare calculator - fancier
        var uberXFare = fareCalculator.calculateTotalFare(shared_1.RideType.UberX, 10);
        console.log("UberX Fare: $".concat(uberXFare.toFixed(2)));
        console.log("UberX Description: ".concat(fareCalculator.getDescription(shared_1.RideType.UberX, 10)));
        console.log("---------------");
        // Calculate a ride with peak hour surcharge
        var peakHourRideFare = fareCalculator.calculateTotalFare(shared_1.RideType.UberX, 10, true);
        console.log("Peak Hour Ride Fare: $".concat(peakHourRideFare.toFixed(2)));
        console.log("Peak Hour Ride Description: ".concat(fareCalculator.getDescription(shared_1.RideType.UberX, 10, true)));
        console.log("---------------");
        // Calculate an airport pickup with premium ride
        var airportRideFare = fareCalculator.calculateTotalFare(shared_1.RideType.UberBlack, 10, false, true);
        console.log("Airport Ride Fare: $".concat(airportRideFare.toFixed(2)));
        console.log("Airport Ride Description: ".concat(fareCalculator.getDescription(shared_1.RideType.UberBlack, 10, false, true)));
        console.log("---------------");
        // Calculate a corporate package with multiple rides
        var corporatePackageFare = corporateCalculator.calculatePackageFare([
            { type: shared_1.RideType.UberX, distance: 10 },
            { type: shared_1.RideType.UberBlack, distance: 10 },
        ], true);
        console.log("Corporate Package Fare: $".concat(corporatePackageFare.toFixed(2)));
        // No easy way to generate a comprehensive description for the package
    }
    main();
})(WithoutComposite || (WithoutComposite = {}));
