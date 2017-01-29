var path = require('path');
var fs = require('fs');
var _ = require('underscore');

export function testAuthorizationTac(signingObject) {
    expect(signingObject.getPossibleAuthorizationTypes()[0]).toBe('TAC');
    expect(signingObject.getPossibleAuthorizationTypes().length).toBe(1);
    expect(signingObject.canBeSignedWith('TAC')).toBe(true);
}

export function testStateOpen(signingObject) {
    expect(signingObject.isDone()).toBe(false);
    expect(signingObject.isCanceled()).toBe(false);
    expect(signingObject.isOpen()).toBe(true);
}

export function testStateDone(signingObject) {
    expect(signingObject.isDone()).toBe(true);
    expect(signingObject.isCanceled()).toBe(false);
    expect(signingObject.isOpen()).toBe(false);
}

export function testFile(response, fileName = 'test-pdf.pdf') {
    if (fs) {
        var file = fs.readFileSync(path.join(__dirname, fileName));
        expect(_.isEqual(file.toString(), response.toString())).toBe(true);    
    }
    expect(response).toBeTruthy();
    var str = ab2str(response);
    expect(str.length).toBe(7945);
}

export var exportTransactionsPayload = {
    dateFrom: new Date(1999, 8, 27), 
    dateTo: new Date(2000, 8, 27),
    fields: [
        'bookingDate',
        'partner',
        'amount',
        'currency'
    ],
    showAccountName: true,
    showAccountNumber: true,
    showTimespan: true,
    showBalance: true
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}