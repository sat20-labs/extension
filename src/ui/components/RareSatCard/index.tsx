
import { RareSat } from '@/shared/types';

import { useTools } from '@/ui/components/ActionComponent';
import { copyToClipboard, shortUtxo } from '@/ui/utils';
import { Card } from '../Card';
import { Column } from '../Column';
import { Icon, getRareSatIcon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

export interface RareSatCardProps {
  data: RareSat;
  onClick?: () => void;
}

export default function RareSatCard(props: RareSatCardProps) {
  const {
    data: {
      utxo,
      value,
      sats,
    },
    onClick
  } = props;
  const [txid, voutString] = utxo.split(':');
  const vout = parseInt(voutString, 10);

  const tools = useTools();

  const rareSatList: Map<string, number> = new Map();
  sats.forEach((item) => {
    item.satributes.forEach((satribute) => {
      rareSatList.set(satribute, rareSatList.get(satribute) ?? 0 + 1);
    });
  });

  return (
    <Card
      style={{
        backgroundColor: '#141414',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }}
      fullX
      onClick={() => {
        onClick && onClick();
      }}>
      <Column full py="zero" gap="zero">
        <Row fullY justifyBetween justifyCenter>
          <Column>
            <Row>
              {/* <Text text={'utxo:'} color="textDim" size="md" preset='title' /> */}
              <Text text={shortUtxo(txid, vout)} color="blue" size="md" />
              <Icon icon="copy" color="textDim" onClick={
                (e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  copyToClipboard(utxo).then(() => {
                    tools.toastSuccess('Copied');
                  });
                }
              } />
            </Row>
          </Column>
          <Row itemsCenter fullY gap="zero">
            <Text text={value + ' sats'} size="md" />
          </Row>
        </Row>
        <Column>
          <Row style={{ borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }} mt="sm" />
          {Array.from(rareSatList.entries()).map(([satName, count], index) => (
            <Row key={index} itemsCenter fullY gap="zero">
              <Icon icon={getRareSatIcon(satName)} size={20} />
              <Text
                key={index}
                text={`${satName} x${count}`}
                size="md"
                color="textDim"
                style={{ marginLeft: 5, marginRight: 10 }}
              />
            </Row>
          ))}
        </Column>
      </Column>
    </Card>
  );
}
