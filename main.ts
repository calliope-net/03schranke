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
function _ (Kommentar: string) {
	
}
function Schranke_auf () {
    basic.showIcon(IconNames.ArrowNorth)
    Motor2 = -100
    motors.motorPower(Motor2)
}
let Helligkeit = 0
let Motor2 = 0
basic.showString("03SCHRANKE")
_("Erweiterung Grove laden")
let o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
pins.digitalWritePin(DigitalPin.P0, 1)
let Schaltwert = 60
basic.pause(500)
Schranke_zu()
loops.everyInterval(400, function () {
    Helligkeit = pins.analogReadPin(AnalogPin.P1)
    o4digit.show(Helligkeit)
    if (Motor2 == 0 && Helligkeit > Schaltwert) {
        _("Motor aus und Lichtschranke dunkel -> Schranke öffnen")
        Schranke_auf()
    } else if (Motor2 < 0 && input.pinIsPressed(TouchPin.P2)) {
        _("Motor öffnet Schranke (m<0) und Schranke ist ganz oben (P2) -> Motor aus")
        Motor_aus()
        _("nach 5 Sekunden -> Schranke wieder schließen")
        for (let Index = 0; Index <= 4; Index++) {
            basic.showNumber(Index)
            basic.pause(1000)
        }
        Schranke_zu()
    } else if (Motor2 > 0 && input.pinIsPressed(TouchPin.P3)) {
        _("Motor schließt Schranke (m>0) und Schranke ist ganz unten (P3) -> Motor aus")
        Motor_aus()
    }
})
