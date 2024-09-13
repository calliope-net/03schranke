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
let Helligkeit = 0
let Motor2 = 0
basic.showString("03SCHRANKE")
let o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
pins.digitalWritePin(DigitalPin.P0, 1)
let Schaltwert = 61
basic.pause(500)
Schranke_zu()
loops.everyInterval(400, function () {
    Helligkeit = pins.analogReadPin(AnalogPin.P1)
    o4digit.show(Helligkeit)
    if (Motor2 == 0 && Helligkeit > Schaltwert) {
        Schranke_auf()
    } else if (Motor2 < 0 && input.pinIsPressed(TouchPin.P2)) {
        Motor_aus()
        for (let Index = 0; Index <= 4; Index++) {
            basic.showNumber(Index)
            basic.pause(1000)
        }
        Schranke_zu()
    } else if (Motor2 > 0 && input.pinIsPressed(TouchPin.P3)) {
        Motor_aus()
    }
})
