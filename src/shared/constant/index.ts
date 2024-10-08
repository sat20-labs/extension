/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

/* constants pool */
import { AddressType, Chain, EnvironmentType, NetworkType, RestoreWalletType } from '../types';

export enum CHAINS_ENUM {
  BTC = 'BTC'
}

export const CHAINS: Record<string, Chain> = {
  [CHAINS_ENUM.BTC]: {
    name: 'BTC',
    enum: CHAINS_ENUM.BTC,
    logo: '',
    network: 'mainnet'
  }
};

export const KEYRING_TYPE = {
  HdKeyring: 'HD Key Tree',
  SimpleKeyring: 'Simple Key Pair',
  WatchAddressKeyring: 'Watch Address',
  WalletConnectKeyring: 'WalletConnect',
  Empty: 'Empty',
  KeystoneKeyring: 'Keystone'
};

export const KEYRING_CLASS = {
  PRIVATE_KEY: 'Simple Key Pair',
  MNEMONIC: 'HD Key Tree',
  KEYSTONE: 'Keystone'
};

export const KEYRING_TYPE_TEXT = {
  [KEYRING_TYPE.HdKeyring]: 'Created by Mnemonic',
  [KEYRING_TYPE.SimpleKeyring]: 'Imported by Private Key',
  [KEYRING_TYPE.WatchAddressKeyring]: 'Watch Mode',
  [KEYRING_TYPE.KeystoneKeyring]: 'Import from Keystone',
};
export const BRAND_ALIAN_TYPE_TEXT = {
  [KEYRING_TYPE.HdKeyring]: 'Account',
  [KEYRING_TYPE.SimpleKeyring]: 'Private Key',
  [KEYRING_TYPE.WatchAddressKeyring]: 'Watch',
  [KEYRING_TYPE.KeystoneKeyring]: 'Account',
};

export const KEYRING_TYPES: {
  [key: string]: {
    name: string;
    tag: string;
    alianName: string;
  };
} = {
  'HD Key Tree': {
    name: 'HD Key Tree',
    tag: 'HD',
    alianName: 'HD Wallet'
  },
  'Simple Key Pair': {
    name: 'Simple Key Pair',
    tag: 'IMPORT',
    alianName: 'Single Wallet'
  },
  Keystone: {
    name: 'Keystone',
    tag: 'KEYSTONE',
    alianName: 'Keystone'
  }
};

export const IS_CHROME = /Chrome\//i.test(navigator.userAgent);

export const IS_FIREFOX = /Firefox\//i.test(navigator.userAgent);

export const IS_LINUX = /linux/i.test(navigator.userAgent);

let chromeVersion: number | null = null;

if (IS_CHROME) {
  const matches = navigator.userAgent.match(/Chrome\/(\d+[^.\s])/);
  if (matches && matches.length >= 2) {
    chromeVersion = Number(matches[1]);
  }
}

export const IS_AFTER_CHROME91 = IS_CHROME ? chromeVersion && chromeVersion >= 91 : false;

export const GAS_LEVEL_TEXT = {
  slow: 'Standard',
  normal: 'Fast',
  fast: 'Instant',
  custom: 'Custom'
};

export const IS_WINDOWS = /windows/i.test(navigator.userAgent);

export const LANGS = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'zh_CN',
    label: 'Chinese'
  },
  {
    value: 'ja',
    label: 'Japanese'
  },
  {
    value: 'es',
    label: 'Spanish'
  }
];

export const ADDRESS_TYPES: {
  value: AddressType;
  label: string;
  name: string;
  hdPath: string;
  displayIndex: number;
  isSat20Legacy?: boolean;
}[] =
  [
    {
      value: AddressType.P2PKH,
      label: 'P2PKH',
      name: 'Legacy (P2PKH)',
      hdPath: "m/44'/0'/0'/0",
      displayIndex: 3,
      isSat20Legacy: false
    },
    {
      value: AddressType.P2WPKH,
      label: 'P2WPKH',
      name: 'Native Segwit (P2WPKH)',
      hdPath: "m/84'/0'/0'/0",
      displayIndex: 0,
      isSat20Legacy: false
    },
    {
      value: AddressType.P2TR,
      label: 'P2TR',
      name: 'Taproot (P2TR)',
      hdPath: "m/86'/0'/0'/0",
      displayIndex: 2,
      isSat20Legacy: false
    },
    {
      value: AddressType.P2SH_P2WPKH,
      label: 'P2SH-P2WPKH',
      name: 'Nested Segwit (P2SH-P2WPKH)',
      hdPath: "m/49'/0'/0'/0",
      displayIndex: 1,
      isSat20Legacy: false
    },
    {
      value: AddressType.M44_P2WPKH,
      label: 'P2WPKH',
      name: 'Native SegWit (P2WPKH)',
      hdPath: "m/44'/0'/0'/0",
      displayIndex: 4,
      isSat20Legacy: true
    },
    {
      value: AddressType.M44_P2TR,
      label: 'P2TR',
      name: 'Taproot (P2TR)',
      hdPath: "m/44'/0'/0'/0",
      displayIndex: 5,
      isSat20Legacy: true
    }
  ];

export const OW_HD_PATH = "m/86'/0'/0'";

export const RESTORE_WALLETS: { value: RestoreWalletType; name: string; addressTypes: AddressType[] }[] = [
  {
    value: RestoreWalletType.SAT20,
    name: 'Sat20 Wallet',
    addressTypes: [
      AddressType.P2WPKH,
      AddressType.P2SH_P2WPKH,
      AddressType.P2TR,
      AddressType.P2PKH,
      AddressType.M44_P2WPKH,
      AddressType.M44_P2TR
    ]
  },
  {
    value: RestoreWalletType.UNISAT,
    name: 'Unisat Wallet',
    addressTypes: [
      AddressType.P2WPKH,
      AddressType.P2SH_P2WPKH,
      AddressType.P2TR,
      AddressType.P2PKH,
      AddressType.M44_P2WPKH,
      AddressType.M44_P2TR
    ]
  },
  {
    value: RestoreWalletType.SPARROW,
    name: 'Sparrow Wallet',
    addressTypes: [AddressType.P2PKH, AddressType.P2WPKH, AddressType.P2SH_P2WPKH, AddressType.P2TR]
  },
  {
    value: RestoreWalletType.XVERSE,
    name: 'Xverse Wallet',
    addressTypes: [AddressType.P2SH_P2WPKH, AddressType.P2TR]
  },
  {
    value: RestoreWalletType.OW,
    name: 'Ordinals Wallet',
    addressTypes: [AddressType.P2TR]
  },
  {
    value: RestoreWalletType.OTHERS,
    name: 'Other Wallet',
    addressTypes: [
      AddressType.P2PKH,
      AddressType.P2WPKH,
      AddressType.P2SH_P2WPKH,
      AddressType.P2TR,
      AddressType.M44_P2WPKH,
      AddressType.M44_P2TR
    ]
  }
];

export const NETWORK_TYPES = [
  { value: NetworkType.MAINNET, label: 'MAINNET', name: 'mainnet', validNames: [0, 'mainnet', 'livenet'], prefix: 'mainnet', },
  { value: NetworkType.TESTNET, label: 'TESTNET4', name: 'testnet', validNames: ['testnet'], prefix: 'testnet4', }
];

export const ENVIROMENT_TYPES = [
  { value: EnvironmentType.PROD, label: 'PROD', name: 'prd' },
  { value: EnvironmentType.TEST, label: 'TEST', name: 'test' },
  { value: EnvironmentType.DEV, label: 'DEV', name: 'dev' },
];

export const MINIMUM_GAS_LIMIT = 21000;

export enum WATCH_ADDRESS_CONNECT_TYPE {
  WalletConnect = 'WalletConnect'
}

export const WALLETCONNECT_STATUS_MAP = {
  PENDING: 1,
  CONNECTED: 2,
  WAITING: 3,
  SIBMITTED: 4,
  REJECTED: 5,
  FAILD: 6
};

// export const INTERNAL_REQUEST_ORIGIN = 'https://sat20.org';

// export const INTERNAL_REQUEST_SESSION = {
//   name: 'Sat20 Wallet',
//   origin: INTERNAL_REQUEST_ORIGIN,
//   icon: './images/logo/logo@128x.png'
// };


// export const ENV_TYPE_DEV = 'dev';
// export const ENV_TYPE_PROD = 'prd';
// export const ENV_TYPE_TEST = 'test';
// export const NETWORK_TYPE_MAINNET = 'mainnet';
// export const NETWORK_TYPE_TESTNET4 = 'testnet4';

export function GET_OPEN_API_HOST(env: string, prefix: string): string {
  return `https://api${env}.sat20.org/${prefix}/extension`;
}

// export const OPENAPI_URL_MAINNET = 'https://apidev.sat20.org/mainnet/extension';
// export const OPENAPI_URL_TESTNET = 'https://apidev.sat20.org/testnet4/extension';

export const EVENTS = {
  broadcastToUI: 'broadcastToUI',
  broadcastToBackground: 'broadcastToBackground',
  SIGN_FINISHED: 'SIGN_FINISHED',
  WALLETCONNECT: {
    STATUS_CHANGED: 'WALLETCONNECT_STATUS_CHANGED',
    INIT: 'WALLETCONNECT_INIT',
    INITED: 'WALLETCONNECT_INITED'
  }
};

export const SORT_WEIGHT = {
  [KEYRING_TYPE.HdKeyring]: 1,
  [KEYRING_TYPE.SimpleKeyring]: 2,
  [KEYRING_TYPE.WalletConnectKeyring]: 4,
  [KEYRING_TYPE.WatchAddressKeyring]: 5
};

export const GASPRICE_RANGE = {
  [CHAINS_ENUM.BTC]: [0, 10000]
};

export const COIN_NAME = 'BTC';
export const COIN_SYMBOL = 'BTC';

export const COIN_DUST = 1000;

export const TO_LOCALE_STRING_CONFIG = {
  minimumFractionDigits: 8
};

export const SUPPORTED_DOMAINS = ['sats', 'ordx', 'sat20', 'x', 'btc'];
export const SAFE_DOMAIN_CONFIRMATION = 3;

export const GITHUB_URL = 'https://github.com/sat20-labs/extension';
// export const DISCORD_URL = 'https://discord.com/invite/xxxxxxxxxx';
export const TWITTER_URL = 'https://x.com/SAT20Labs';

export const CHANNEL = process.env.channel!;
export const VERSION = process.env.release!;
export const MANIFEST_VERSION = process.env.manifest!;

export enum AddressFlagType {
  Is_Enable_Atomicals = 0b1,
  CONFIRMED_UTXO_MODE = 0b10,
  DISABLE_AUTO_SWITCH_CONFIRMED = 0b100
}

export const UNCONFIRMED_HEIGHT = 4194303;

export enum PaymentChannelType {
  MoonPay = 'moonpay',
  AlchemyPay = 'alchemypay',
  Transak = 'transak'
}

export const PAYMENT_CHANNELS = {
  moonpay: {
    name: 'MoonPay',
    img: './images/artifacts/moonpay.png'
  },
  alchemypay: {
    name: 'Alchemy Pay',
    img: './images/artifacts/alchemypay.png'
  },

  transak: {
    name: 'Transak',
    img: './images/artifacts/transak.png'
  }
};

export enum HardwareWalletType {
  Keystone = 'keystone',
  Ledger = 'ledger',
  Trezor = 'trezor'
}

export const HARDWARE_WALLETS = {
  [HardwareWalletType.Keystone]: {
    name: 'Keystone',
    img: './images/artifacts/keystone.png'
  },
  [HardwareWalletType.Ledger]: {
    name: 'Ledger',
    img: './images/artifacts/ledger.png'
  },
  [HardwareWalletType.Trezor]: {
    name: 'Trezor',
    img: './images/artifacts/trezor.png'
  }
};
