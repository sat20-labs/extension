import { keyBy } from 'lodash';

import browser from '@/background/webapi/browser';
import { AddressFlagType, CHAINS } from '@/shared/constant';

import BroadcastChannelMessage from './message/broadcastChannelMessage';
import PortMessage from './message/portMessage';

const Message = {
  BroadcastChannelMessage,
  PortMessage
};

declare global {
  const langLocales: Record<string, Record<'message', string>>;
}

const t = (name) => browser.i18n.getMessage(name);

const format = (str, ...args) => {
  return args.reduce((m, n) => m.replace('_s_', n), str);
};

export { format, Message, t };

const chainsDict = keyBy(CHAINS, 'serverId');
export const getChain = (chainId?: string) => {
  if (!chainId) {
    return null;
  }
  return chainsDict[chainId];
};


// Check if address flag is enabled
export const checkAddressFlag = (currentFlag: number, flag: AddressFlagType): boolean => {
  return Boolean(currentFlag & flag);
};


// export const shortUtxo = (
//   str?: string,
//   num = 6,
//   placeholder = '*****',
// ) => {
//   let ret = '';
//   if (typeof str === 'string' && str) {
//     if (str?.length <= num) {
//       ret = str;
//     } else if (str.includes(':')) {
//       const index = str.indexOf(':');
//       ret = `${str?.substring(0, num)}${placeholder}${str?.substring(
//         index - num,
//       )}`;
//     } else {
//       ret = `${str?.substring(0, num)}${placeholder}${str?.substring(
//         str?.length - num,
//       )}`;
//     }
//   }
//   return ret;
// };