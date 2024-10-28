function base36Encode(number: number): string {
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
    let base36 = '';
    while (number > 0) {
        const remainder = number % 36;
        base36 = alphabet[remainder] + base36;
        number = Math.floor(number / 36);
    }
    return base36 || '0';
}

function fixedLengthBase36Encode(scheduleId: number, length: number): string {
    const encoded = base36Encode(scheduleId);
    return encoded.padStart(length, '0').slice(-length); 
}

function base36Decode(base36Str: string): number {
    return parseInt(base36Str, 36);
}

export function encodeFlightInfo(scheduleId: number, seatNumber: string): string {
    const encodedScheduleId = fixedLengthBase36Encode(scheduleId, 4); 
    
    const encodedSeatNumber = Buffer.from(seatNumber).toString('base64');
    const fixedLengthSeatNumber = encodedSeatNumber.padEnd(4, '=');

    const combinedStr = `${encodedScheduleId}-${fixedLengthSeatNumber}`;
    const finalEncoded = Buffer.from(combinedStr).toString('base64');
    return finalEncoded;
}

export function decodeFlightInfo(encodedStr: string): { scheduleId: number, seatNumber: string } {
    const decodedCombined = Buffer.from(encodedStr, 'base64').toString('utf8');
    const [encodedScheduleId, encodedSeatNumber] = decodedCombined.split('-');

    const decodedScheduleId = base36Decode(encodedScheduleId);
    
    // Decode the seatNumber from Base64
    const decodedSeatNumber = Buffer.from(encodedSeatNumber, 'base64').toString('utf8');
    
    return {
        scheduleId: decodedScheduleId,
        seatNumber: decodedSeatNumber
    };
}

