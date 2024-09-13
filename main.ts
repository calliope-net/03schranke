function Schranke_zu () {
    basic.showIcon(IconNames.ArrowSouth)
    Motor2 = Prozent
    motors.motorPower(Motor2)
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Prozent += -5
    basic.showNumber(Prozent)
})
function Motor_aus () {
    basic.clearScreen()
    Motor2 = 0
    motors.motorPower(Motor2)
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Prozent += 5
    basic.showNumber(Prozent)
})
function _ (Kommentar: string) {
	
}
function Schranke_auf () {
    basic.showIcon(IconNames.ArrowNorth)
    Motor2 = Prozent * -1
    motors.motorPower(Motor2)
}
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Hold), function () {
    Schaltwert += -5
    basic.showNumber(Schaltwert)
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Hold), function () {
    Schaltwert += 5
    basic.showNumber(Schaltwert)
})
let Lichtschranke = 0
let Motor2 = 0
let Schaltwert = 0
let Prozent = 0
_("Erweiterung Grove laden")
let o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
pins.digitalWritePin(DigitalPin.P0, 1)
Prozent = 90
Schaltwert = 60
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . #
    # # # # #
    . . . # #
    `)
loops.everyInterval(400, function () {
    Lichtschranke = pins.analogReadPin(AnalogPin.P1)
    o4digit.show(Lichtschranke)
    if (Motor2 == 0 && Lichtschranke > Schaltwert) {
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
