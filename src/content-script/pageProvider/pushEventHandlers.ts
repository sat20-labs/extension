import { ethErrors } from 'eth-rpc-errors';

import { Sat20Provider } from './index';

class PushEventHandlers {
  provider: Sat20Provider;

  constructor(provider) {
    this.provider = provider;
  }

  _emit(event, data) {
    if (this.provider._initialized) {
      this.provider.emit(event, data);
    }
  }

  connect = (data) => {
    if (!this.provider._isConnected) {
      this.provider._isConnected = true;
      this.provider._state.isConnected = true;
      this._emit('connect', data);
    }
  };

  unlock = () => {
    this.provider._isUnlocked = true;
    this.provider._state.isUnlocked = true;
  };

  lock = () => {
    this.provider._isUnlocked = false;
  };

  disconnect = () => {
    this.provider._isConnected = false;
    this.provider._state.isConnected = false;
    this.provider._state.accounts = null;
    this.provider._selectedAddress = null;
    const disconnectError = ethErrors.provider.disconnected();

    this._emit('accountsChanged', []);
    this._emit('disconnect', disconnectError);
    this._emit('close', disconnectError);
  };

  accountsChanged = (accounts: string[]) => {
    if (accounts?.[0] === this.provider._selectedAddress) {
      return;
    }

    this.provider._selectedAddress = accounts?.[0];
    this.provider._state.accounts = accounts;
    this._emit('accountsChanged', accounts);
  };

  networkChanged = ({ network }) => {
    this.connect({});

    if (network !== this.provider._network) {
      this.provider._network = network;
      this._emit('networkChanged', network);
    }
  };

  environmentChanged = ({ environment }) => {
    if (environment !== this.provider._environment) {
      this.provider._environment = environment;
      this._emit('environmentChanged', environment);
    }
  };
}

export default PushEventHandlers;
