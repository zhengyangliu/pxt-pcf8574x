/**
* A driver of PCF8574 and PCF8574A in MakeCode.
* @author ArthurZheng
*/

namespace pcf8574x {

    export enum IO {
        P0 = 0x01,
        P1 = 0x02,
        P2 = 0x04,
        P3 = 0x08,
        P4 = 0x10,
        P5 = 0x20,
        P6 = 0x40,
        P7 = 0x80
    }

    /** 
     * PCF8574 IO mode
     * Cource the pin of PCF8574 is open-drain interrupt output, so input is same with out high
    */
    export enum Mode {
        Low = 0x00,
        High = 0x01,
        In = 0x01
    }

    // i2c address of pcf8574
    let _address = 0;

    // pcf8574 pin out data
    let _outData = 0;

    /**
     * Configure address of PCF8574, should run at first.
     * @param {number} address - 7-bit address of PCF8574, eg: 0x20
     * @note The address is 7 bit, R/W bit will automatically add. According to the difference of A0, A1, A2,
     * the address range of PCF8574 is 0x20 ~ 0x27, and PCF8574A is 0x38 ~ 0x3f
     */
    export function configAddress(address: number) {
        _address = address;
    }

    /**
     * Configure PCF8574 io mode
     * @param {number} data - 8-bit config, eg: 0x00
     */
    export function writeMode(data: number) {
        _outData = data;
        pins.i2cWriteNumber(_address, _outData, NumberFormat.Int8LE, false);
    }

    /**
     * Configure PCF8574 io mode by pin
     * @param {IO} pin - PCF8574 pins eg: IO.P0
     * @param {Mode} mode - Out low, out high or input, eg: Mode.Low
     */
    export function writePinMode(pin: IO, mode: Mode) {
        if (mode == Mode.In) {
            _outData |= (0xff & pin);
        }
        else {
            _outData &= (0xff & ~pin);
        }
        pins.i2cWriteNumber(_address, _outData, NumberFormat.Int8LE, false);
    }

    /**
     * Read PCF8574 io input data
     * @return {number} PCF8574 io input data
     */
    export function readState(): number {
        return pins.i2cReadNumber(_address, NumberFormat.Int8LE, false);
    }

    /**
     * Read PCF8574 io input data by pin
     * @param {IO} pin - PCF8574 pins eg: IO.P0
     * @return {boolean} The pin state
     */
    export function readPinState(pin: IO): boolean {
        return ((pins.i2cReadNumber(_address, NumberFormat.Int8LE, false) & pin) > 0);
    }

}
