// RequestSAML.ts
export class RequestSAML {
  providerName!: string;
  url!: string;
  returnURL!: string;
  application!: string;
  forceCheck!: boolean;
  eidasloa!: string;
  nameIDPolicy!: string;
  afirmaCheck!: boolean;
  gissCheck!: boolean;
  aeatCheck!: boolean;
  eidasCheck!: boolean;
  mobileCheck!: boolean;
  relayState!: string;
  SAMLRequest!: string;
  logoutRequest!: string;

  constructor(init?: Partial<RequestSAML>) {
    Object.assign(this, init);
  }
}
