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
let PIR = 0
let vlhkost = 0
let teplota = 0
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
})
