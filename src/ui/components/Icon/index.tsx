import React, { CSSProperties } from 'react';

import { ColorTypes, colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';

export const svgRegistry = {
  history: './images/icons/clock-solid.svg',
  send: './images/icons/arrow-left-right.svg',
  receive: './images/icons/qrcode.svg',

  right: './images/icons/arrow-right.svg',
  left: './images/icons/arrow-left.svg',
  down: './images/icons/down.svg',
  up: './images/icons/up.svg',
  link: './images/icons/arrow-up-right.svg',

  discord: './images/icons/discord.svg',
  twitter: './images/icons/twitter.svg',
  github: './images/icons/github.svg',

  btc: './images/icons/btc.svg',
  qrcode: './images/icons/qrcode.svg',

  user: '/images/icons/user-solid.svg',
  wallet: '/images/icons/wallet-solid.svg',
  compass: './images/icons/compass-solid.svg',
  settings: './images/icons/gear-solid.svg',
  grid: './images/icons/grid-solid.svg',

  delete: '/images/icons/delete.svg',
  success: '/images/icons/success.svg',
  check: '/images/icons/check.svg',
  eye: '/images/icons/eye.svg',
  'eye-slash': '/images/icons/eye-slash.svg',
  copy: './images/icons/copy-solid.svg',
  close: './images/icons/xmark.svg',

  'circle-check': '/images/icons/circle-check.svg',
  pencil: '/images/icons/pencil.svg',
  'circle-info': '/images/icons/circle-info.svg',
  bitcoin: './images/icons/bitcoin.svg',
  'circle-question': '/images/icons/circle-question.svg',
  split: '/images/icons/scissors.svg',
  ordinals: '/images/icons/ordinals.svg',
  atomicals: '/images/icons/atomicals.svg',
  info: '/images/icons/info.svg',
  warning: '/images/icons/warning.svg',
  alert: '/images/icons/alert.svg',
  burn: ' /images/icons/burn.svg',
  risk: '/images/icons/risk.svg',

  // raresat
  raresat_rare: '/images/icons/raresat/rare.svg',
  raresat_common: '/images/icons/raresat/common.svg',
  raresat_uncommon: '/images/icons/raresat/uncommon.svg',
  raresat_legendary: '/images/icons/raresat/legendary.svg',
  raresat_mythical: '/images/icons/raresat/mythical.svg',
  raresat_alpha: '/images/icons/raresat/alpha.svg',
  raresat_black: '/images/icons/raresat/black.svg',
  raresat_block78: '/images/icons/raresat/block78.svg',
  raresat_block9: '/images/icons/raresat/block9.svg',
  raresat_hitman: '/images/icons/raresat/hitman.svg',
  raresat_jpeg: '/images/icons/raresat/jpeg.svg',
  raresat_nakamoto: '/images/icons/raresat/nakamoto.svg',
  raresat_omega: '/images/icons/raresat/omega.svg',
  raresat_palindromes_paliblock: '/images/icons/raresat/palindromes_paliblock.svg',
  raresat_palindromes_integer: '/images/icons/raresat/palindromes_integer.svg',
  raresat_palindromes_integer_2d: '/images/icons/raresat/palindromes_integer_2d.svg',
  raresat_palindromes_integer_3d: '/images/icons/raresat/palindromes_integer_3d.svg',
  raresat_palindromes_name: '/images/icons/raresat/palindromes_name.svg',
  raresat_alindromes_name_2c: '/images/icons/raresat/alindromes_name_2c.svg',
  raresat_palindromes_name_3c: '/images/icons/raresat/palindromes_name_3c.svg',
  raresat_pizza: '/images/icons/raresat/pizza.svg',
  raresat_silk_road_first_auction: '/images/icons/raresat/silk_road_first_auction.svg',
  raresat_first_transaction: '/images/icons/raresat/first_transaction.svg',
  raresat_vintage: '/images/icons/raresat/vintage.svg',
  raresat_customized: '/images/icons/raresat/customized.svg',
};

const iconImgList: Array<IconTypes> = ['success', 'delete', 'btc'];
Object.keys(svgRegistry).forEach((key) => {
  if (key.startsWith('raresat_')) {
    iconImgList.push(key as IconTypes);
  }
});

export type IconTypes = keyof typeof svgRegistry;
interface IconProps {
  /**
   * The name of the icon
   */
  icon?: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: ColorTypes;

  /**
   * An optional size for the icon..
   */
  size?: number | string;

  /**
   * Style overrides for the icon image
   */
  style?: CSSProperties;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: CSSProperties;

  /**
   * An optional function to be called when the icon is clicked
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    onClick,
    children
  } = props;
  if (!icon) {
    return (
      <div
        onClick={onClick}
        style={Object.assign(
          {},
          {
            color: color ? colors[color] : '#FFF',
            fontSizes: size || fontSizes.icon,
            display: 'flex'
          } as CSSProperties,
          $containerStyleOverride,
          $imageStyleOverride || {},
          onClick ? { cursor: 'pointer' } : {}
        )}>
        {children}
      </div>
    );
  }
  const iconPath = svgRegistry[icon as IconTypes];
  if (iconImgList.includes(icon)) {
    return (
      <img
        src={iconPath}
        alt=""
        style={Object.assign({}, $containerStyleOverride, {
          width: size || fontSizes.icon,
          height: size || fontSizes.icon
        })}
      />
    );
  }
  if (iconPath) {
    return (
      <div style={$containerStyleOverride}>
        <div
          onClick={onClick}
          style={Object.assign(
            {},
            {
              color: color ? colors[color] : '#FFF',
              width: size || fontSizes.icon,
              height: size || fontSizes.icon,
              backgroundColor: color ? colors[color] : '#FFF',
              maskImage: `url(${iconPath})`,
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${iconPath})`,
              WebkitMaskSize: 'cover',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center'
            },
            $imageStyleOverride || {},
            onClick ? { cursor: 'pointer' } : {}
          )}
        />
      </div>
    );
  } else {
    return <div />;
  }
}

export const getRareSatIcon = (rareSatType: string) : IconTypes => {
  switch (rareSatType) {
      case 'rare':
      case 'common':
      case 'legendary':
      case 'mythical':
      case 'alpha':
      case 'black':
      case 'block78':
      case 'block9':
      case 'hitman':
      case 'jpeg':
      case 'nakamoto':
      case 'omega':
      case 'palindromes_paliblock':
      case 'palindromes_integer':
      case 'palindromes_integer_2d':
      case 'palindromes_integer_3d':
      case 'palindromes_name':
      case 'palindromes_name_2c':
      case 'palindromes_name_3c':
      case 'pizza':
      case 'silk_road_first_auction':
      case 'first_transaction':
      case 'vintage':
      case 'customized':
          return ('raresat_' + rareSatType) as IconTypes;
      case 'uncommon':
      default:
          return 'raresat_uncommon';
  }
};