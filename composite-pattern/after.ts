import { RideType } from "./shared";

namespace Composite {
	// Component: The base interface for all ride components
	interface RideComponent {
		calculateFare(): number;
		getDescription(): string;
	}

	// Leaf: Basic implementation for a single ride
	class SingleRide implements RideComponent {
		private baseFare: number;
		private distance: number;
		private rideType: RideType;
		private pricePerKm: number;

		constructor(
			rideType: RideType,
			distance: number,
			baseFare: number,
			pricePerKm: number
		) {
			this.rideType = rideType;
			this.distance = distance;
			this.baseFare = baseFare;
			this.pricePerKm = pricePerKm;
		}

		calculateFare(): number {
			return this.baseFare + this.distance * this.pricePerKm;
		}

		getDescription(): string {
			return `${this.rideType} - ${this.distance}km`;
		}
	}

	// Leaf: Specific ride pricing adjustments
	class RideSurcharge implements RideComponent {
		private amount: number;
		private reason: string;

		constructor(reason: string, amount: number) {
			this.reason = reason;
			this.amount = amount;
		}

		calculateFare(): number {
			return this.amount;
		}

		getDescription(): string {
			return `${this.reason} ($${this.amount.toFixed(2)})`;
		}
	}

	// Composite: Can contain other components (both SingleRide and other CompositeRides)
	class CompositeRide implements RideComponent {
		private components: RideComponent[] = [];
		private name: string;

		constructor(name: string) {
			this.name = name;
		}

		add(component: RideComponent): void {
			this.components.push(component);
		}

		remove(component: RideComponent): void {
			const index = this.components.indexOf(component);
			if (index !== -1) {
				this.components.splice(index, 1);
			}
		}

		calculateFare(): number {
			return this.components.reduce((total, component) => {
				return total + component.calculateFare();
			}, 0);
		}

		getDescription(): string {
			if (this.components.length === 0) {
				return this.name;
			}

			const descriptions = this.components.map((component) =>
				component.getDescription()
			);
			return `${this.name} [${descriptions.join(" + ")}]`;
		}
	}

	function main() {
		// Create individual ride types
		const uberX = new SingleRide(RideType.UberX, 10, 2.5, 1.5); // 10km ride
		const uberBlack = new SingleRide(RideType.UberBlack, 10, 5, 2.5); // 10km but premium

		// Create surcharges
		const peakHours = new RideSurcharge("Peak Hours", 3.5);
		const airportFee = new RideSurcharge("Airport Fee", 5);

		// Create a standard ride with surge pricing
		const standardRideWithSurge = new CompositeRide("Standard Ride with Surge");
		standardRideWithSurge.add(uberX);
		standardRideWithSurge.add(peakHours);

		// Create a premium airport pickup
		const premiumAirportRide = new CompositeRide("Premium Airport Pickup");
		premiumAirportRide.add(uberBlack);
		premiumAirportRide.add(airportFee);

		// Create a package for a corporate client with multiple rides
		const corporatePackage = new CompositeRide("Corporate Package");
		corporatePackage.add(standardRideWithSurge);
		corporatePackage.add(premiumAirportRide);

		// How different scenarios may play out
		// Leaf: UberX
		console.log(`UberX Fare: $${uberX.calculateFare().toFixed(2)}`);
		console.log(`UberX Description: ${uberX.getDescription()}`);
		console.log("---------------");

		// Leaf: UberBlack
		console.log(`UberBlack Fare: $${uberBlack.calculateFare().toFixed(2)}`);
		console.log(`UberBlack Description: ${uberBlack.getDescription()}`);
		console.log("---------------");

		// Composite: standardRideWithSurge
		console.log(
			`Standard Ride with Surge Fare: $${standardRideWithSurge
				.calculateFare()
				.toFixed(2)}`
		);
		console.log(
			`Standard Ride with Surge Description: ${standardRideWithSurge.getDescription()}`
		);
		console.log("---------------");

		// Composite: premiumAirportRide
		console.log(
			`Premium Airport Ride Fare: $${premiumAirportRide
				.calculateFare()
				.toFixed(2)}`
		);
		console.log(
			`Premium Airport Ride Description: ${premiumAirportRide.getDescription()}`
		);
		console.log("---------------");

		// Composite: corporatePackage
		console.log(
			`Corporate Package Total Fare: $${corporatePackage
				.calculateFare()
				.toFixed(2)}`
		);
		console.log(
			`Corporate Package Description: ${corporatePackage.getDescription()}`
		);

		// New case where we want to modify an element, in this case a composite
		console.log("\nModifying the Corporate Package...");
		const specialDiscount = new RideSurcharge("Corporate Discount", -15); // Negative value for discount
		corporatePackage.add(specialDiscount);

		console.log(
			`Updated Corporate Package Fare: $${corporatePackage
				.calculateFare()
				.toFixed(2)}`
		);
		console.log(
			`Updated Corporate Package Description: ${corporatePackage.getDescription()}`
		);
	}

	main();
}
