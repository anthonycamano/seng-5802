// Individual ride types without a common interface
class UberX {
    private distance: number;
    
    constructor(distance: number) {
      this.distance = distance;
    }
    
    calculateFare(): number {
      return 2.5 + (this.distance * 1.5);
    }
    
    getDescription(): string {
      return `UberX - ${this.distance}km`;
    }
  }
  
  class UberBlack {
    private distance: number;
    
    constructor(distance: number) {
      this.distance = distance;
    }
    
    calculateFare(): number {
      return 5 + (this.distance * 2.5);
    }
    
    getDescription(): string {
      return `UberBlack - ${this.distance}km`;
    }
  }
  
  // Special fare calculator that handles additional charges
  class FareCalculator {
    calculateTotalFare(
      rideType: string, 
      distance: number, 
      isPeakHours: boolean = false, 
      isAirportPickup: boolean = false,
      hasSpecialDiscount: boolean = false
    ): number {
      let totalFare = 0;
      
      // Calculate base ride fare
      if (rideType === "UberX") {
        totalFare = 2.5 + (distance * 1.5);
      } else if (rideType === "UberBlack") {
        totalFare = 5 + (distance * 2.5);
      } else {
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
    }
    
    getDescription(
      rideType: string, 
      distance: number, 
      isPeakHours: boolean = false, 
      isAirportPickup: boolean = false,
      hasSpecialDiscount: boolean = false
    ): string {
      let description = `${rideType} - ${distance}km`;
      
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
    }
  }
  
  // Corporate package handling requires special case logic
  class CorporatePackageCalculator {
    calculatePackageFare(rides: Array<{type: string, distance: number}>, hasDiscount: boolean): number {
      let totalFare = 0;
      const fareCalculator = new FareCalculator();
      
      for (const ride of rides) {
        totalFare += fareCalculator.calculateTotalFare(
          ride.type,
          ride.distance,
          ride.type === "UberX", // Assume UberX has peak hour surcharge for this example
          ride.type === "UberBlack" // Assume UberBlack has airport fee for this example
        );
      }
      
      if (hasDiscount) {
        totalFare -= 15;
      }
      
      return totalFare;
    }
  }
  
  // Client code
  function clientCodeWithoutComposite() {
    const fareCalculator = new FareCalculator();
    const corporateCalculator = new CorporatePackageCalculator();
    
    // Calculate individual rides
    const uberXFare = fareCalculator.calculateTotalFare("UberX", 10);
    console.log(`UberX Fare: $${uberXFare.toFixed(2)}`);
    console.log(`UberX Description: ${fareCalculator.getDescription("UberX", 10)}`);
    console.log("---------------");
    
    // Calculate a ride with peak hour surcharge
    const peakHourRideFare = fareCalculator.calculateTotalFare("UberX", 10, true);
    console.log(`Peak Hour Ride Fare: $${peakHourRideFare.toFixed(2)}`);
    console.log(`Peak Hour Ride Description: ${fareCalculator.getDescription("UberX", 10, true)}`);
    console.log("---------------");
    
    // Calculate an airport pickup with premium ride
    const airportRideFare = fareCalculator.calculateTotalFare("UberBlack", 10, false, true);
    console.log(`Airport Ride Fare: $${airportRideFare.toFixed(2)}`);
    console.log(`Airport Ride Description: ${fareCalculator.getDescription("UberBlack", 10, false, true)}`);
    console.log("---------------");
    
    // Calculate a corporate package with multiple rides
    const corporatePackageFare = corporateCalculator.calculatePackageFare([
      { type: "UberX", distance: 10 },
      { type: "UberBlack", distance: 10 }
    ], true);
    
    console.log(`Corporate Package Fare: $${corporatePackageFare.toFixed(2)}`);
    // No easy way to generate a comprehensive description for the package
  }
  
  clientCodeWithoutComposite();