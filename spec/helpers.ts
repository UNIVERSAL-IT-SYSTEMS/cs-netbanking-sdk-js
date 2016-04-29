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