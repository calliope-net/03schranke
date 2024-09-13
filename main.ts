function Schranke_zu () {
    basic.showIcon(IconNames.ArrowSouth)
    Motor2 = 100
    motors.motorPower(Motor2)
}
function Motor_aus () {
    basic.clearScreen()
    Motor2 = 0
    motors.motorPower(Motor2)
}
function Schranke_auf () {
    basic.showIcon(IconNames.ArrowNorth)
    Motor2 = -100
    motors.motorPower(Motor2)
}
let Motor2 = 0
basic.showString("03SCHRANKE")
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
pins.digitalWritePin(DigitalPin.P0, 1)
let Schaltwert = 61
basic.pause(500)
Schranke_zu()
