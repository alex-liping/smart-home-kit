function okol_svetlo () {
    okolni_svetlo = pins.analogReadPin(AnalogPin.P0)
    if (okolni_svetlo < 500) {
        strip.setBrightness(255)
        strip.showColor(neopixel.colors(NeoPixelColors.White))
        pins.servoWritePin(AnalogPin.P16, 80)
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        pins.servoWritePin(AnalogPin.P16, 175)
    }
}
function vstup_svetlo () {
    if (PIR == 1 && okolni_svetlo < 500) {
        pins.digitalWritePin(DigitalPin.P14, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
}
function plyn_alarm () {
    plyn = pins.analogReadPin(AnalogPin.P3)
    if (plyn > 3) {
        for (let index = 0; index < 4; index++) {
            strip.setBrightness(255)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            music.rest(music.beat(BeatFraction.Half))
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        serial.writeValue("plyn", plyn)
        basic.pause(200)
    } else {
        music.stopAllSounds()
    }
}
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P13, 80)
    basic.pause(2000)
    pins.servoWritePin(AnalogPin.P13, 175)
})
let vlhkost = 0
let teplota = 0
let plyn = 0
let PIR = 0
let okolni_svetlo = 0
let strip: neopixel.Strip = null
basic.clearScreen()
led.enable(false)
pins.digitalWritePin(DigitalPin.P0, 0)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
pins.digitalWritePin(DigitalPin.P3, 0)
pins.digitalWritePin(DigitalPin.P5, 0)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P7, 0)
pins.digitalWritePin(DigitalPin.P9, 0)
pins.digitalWritePin(DigitalPin.P10, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
strip = neopixel.create(DigitalPin.P6, 4, NeoPixelMode.RGB)
pins.servoWritePin(AnalogPin.P16, 175)
makerbit.connectLcd(39)
pins.servoWritePin(AnalogPin.P13, 175)
basic.forever(function () {
    okol_svetlo()
    teplota = SmartCity.readData(SmartCity.DHT11dataType.temperature, DigitalPin.P1)
    vlhkost = SmartCity.readData(SmartCity.DHT11dataType.humidity, DigitalPin.P1)
    makerbit.showStringOnLcd1602("teplota:", makerbit.position1602(LcdPosition1602.Pos1), 9)
    makerbit.showStringOnLcd1602("" + (teplota), makerbit.position1602(LcdPosition1602.Pos10), 3)
    makerbit.showStringOnLcd1602("st.C", makerbit.position1602(LcdPosition1602.Pos13), 4)
    basic.pause(1000)
    makerbit.clearLcd1602()
    makerbit.showStringOnLcd1602("vlhkost:", makerbit.position1602(LcdPosition1602.Pos1), 9)
    makerbit.showStringOnLcd1602("" + (vlhkost), makerbit.position1602(LcdPosition1602.Pos10), 3)
    makerbit.showStringOnLcd1602("%", makerbit.position1602(LcdPosition1602.Pos13), 1)
    if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        PIR = 1
    } else {
        PIR = 0
    }
    vstup_svetlo()
    plyn_alarm()
})
