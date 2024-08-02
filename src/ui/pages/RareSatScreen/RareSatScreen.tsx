
import { RareSat } from '@/shared/types';
import { Button, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
// import OrdinalsNamePreview from '@/ui/components/OrdinalsNamePreview';
import { useAppDispatch } from '@/ui/state/hooks';
// import { useTxIdUrl } from '@/ui/state/settings/hooks';
import { Icon } from '@/ui/components/Icon';
import { transactionsActions } from '@/ui/state/transactions/reducer';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard, shortUtxo, useLocationState } from '@/ui/utils';


export default function RareSatScreen() {
  // const navigate = useNavigate();
  const { rareSat: rareSat } = useLocationState<{ rareSat: RareSat }>();
  // const currentAccount = useCurrentAccount();
  const withSend = true; //currentAccount.address === rareSat.utxo;
  const dispatch = useAppDispatch();
  // const isUnconfirmed = name.timestamp == 0;
  // const txUrl = useTxIdUrl(name.utxo);

  const [txid, voutString] = rareSat.utxo.split(':');
  const vout = parseInt(voutString, 10);
  const tools = useTools();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
      />
      <Content>
        <Column py="xl">
          {/* <Text
            text={isUnconfirmed ? 'Inscription (not confirmed yet)' : `Inscription ${name.inscriptionNumber}`}
            preset="title-bold"
            textCenter
          /> */}
          <Column justifyCenter itemsCenter fullX>
            <Row>
              <Text
                text={`${shortUtxo(txid, vout, 20)}`}
                preset="bold"
                textCenter
                size="lg"
                wrap
                style={{ textDecorationLine: 'underline' }}
                onClick={() => {
                  window.open('link');
                }} />
              <Icon icon="copy" color="textDim" onClick={
                (e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  copyToClipboard(rareSat.utxo).then(() => {
                    tools.toastSuccess('Copied');
                  });
                }
              } />
            </Row>
            <Row>
              <Text text={`${rareSat.value}`} size="md" color="gold" />
              <Text text={'sats'} size="md" color="gold" />
            </Row>

            {/* <OrdinalsNamePreview data={name} preset="large" /> */}
          </Column>

          {withSend && (
            <Row fullX>
              {
                <Button
                  text="Send"
                  icon="send"
                  preset="default"
                  disabled={true}
                  full
                  onClick={(e) => {
                    dispatch(transactionsActions.reset());
                    // navigate('SendOrdinalsInscriptionScreen', { inscription: name.inscriptionId });
                  }}
                />
              }
            </Row>
          )}
          {rareSat.sats.map((item, index) => (
            <Column key={index} gap="lg" style={{ borderTopWidth: 1, borderColor: colors.white_muted }}>
              <Section title="start" value={item.start} firstRow={true} />
              <Section title="size" value={item.size} />
              <Section title="offset" value={item.offset} />
              <Section title="satritutes" value={item.satributes.join(', ')} />
              <Section title="block" value={item.block} />
            </Column>
          ))}

        </Column>
      </Content>
    </Layout>
  );
}

function Section({ value, title, link, firstRow }: { value: string | number; title: string; link?: string, firstRow?: boolean }) {
  const tools = useTools();
  return (
    <Column fullX justifyBetween justifyCenter style={{ marginTop: firstRow ? 10 : 0 }}>
      <Row>
        <Text text={title} preset="sub" />
        <Text
          text={value}
          preset={link ? 'link' : 'regular'}
          size="xs"
          wrap
          onClick={() => {
            if (link) {
              window.open(link);
            } else {
              copyToClipboard(value).then(() => {
                tools.toastSuccess('Copied');
              });
            }
          }}
        />
      </Row>
    </Column>
  );
}
