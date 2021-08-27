interface Radio {
  switchRadio(trigger: boolean): void;
}
interface Battery {
  checkBatteryStatus(): void;
}
interface RadioWithBattery extends Radio {
  checkBatteryStatus(): void
}
class Car implements Radio{
  switchRadio(trigger: boolean) {

  }
}

class Cellphone implements RadioWithBattery {
  switchRadio(trigger: boolean) {

  }
  checkBatteryStatus() {

  }
}