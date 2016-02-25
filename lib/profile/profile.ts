export interface Profile {
    firstName: string,
    lastName: string,
    salutation?: string,
    customerId: string,
    institudeId: number,
    marketingInfoAcceptance: string,
    gender: string,
    lastlogin?: Date
}

export interface LastLogin {
    lastlogin?: [LastLoginInfo]
}

export interface LastLoginInfo {
    channel: string,
    lastlogin: Date
}