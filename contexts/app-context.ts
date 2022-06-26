import { createContext } from "react";
import { Listing } from "../types";

export interface AppContextState {
  authenticated: boolean;
  walletId: string;
  notifications: string[];
  activeListing?: Listing;
  activateListing: any;
  setAuthenticated: any;
  setUser: any;
  user: any;
  web3auth: any;
}

const DEFAULT_STATE = {
  web3auth: undefined,
  authenticated: false,
  walletId: '',
  notifications: [],
  activeListing: undefined,
  activateListing: (listing: any) => {},
  setAuthenticated: (val: any) => {},
  setUser: (val: any) => {},
  user: {},
}

const AppContext = createContext(DEFAULT_STATE as AppContextState);

export default AppContext;
