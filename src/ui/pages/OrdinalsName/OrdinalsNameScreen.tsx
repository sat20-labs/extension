
import { OrdinalsName } from '@/shared/types';
import { Button, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import OrdinalsNamePreview from '@/ui/components/OrdinalsNamePreview';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { transactionsActions } from '@/ui/state/transactions/reducer';
import { copyToClipboard, useLocationState } from '@/ui/utils';
import { useNavigate } from '../MainRoute';


export default function OrdinalsNameScreen() {
  const navigate = useNavigate();
  const { name: name } = useLocationState<{ name: OrdinalsName }>();
  const currentAccount = useCurrentAccount();
  const withSend = currentAccount.address === name.address;
  const dispatch = useAppDispatch();
  const isUnconfirmed = name.timestamp == 0;

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
      />
      <Content>
        <Column>
          <Text
            text={isUnconfirmed ? 'Inscription (not confirmed yet)' : `Inscription ${name.inscriptionNumber}`}
            preset="title-bold"
            textCenter
          />
          <Row justifyCenter>
            <OrdinalsNamePreview data={name} preset="large" />
          </Row>

          {withSend && (
            <Row fullX>
              {
                <Button
                  text="Send"
                  icon="send"
                  preset="default"
                  full
                  onClick={(e) => {
                    dispatch(transactionsActions.reset());
                    navigate('SendOrdinalsInscriptionScreen', { inscription: name.inscriptionId });
                  }}
                />
              }
            </Row>
          )}

          <Column gap="lg">
            <Section title="id" value={name.inscriptionId} />
            <Section title="sat" value={name.sat} />
            <Section title="preview" value={name.preview} link={name.preview} />
            <Section title="utxo" value={name.utxo} link={name.utxo} />
            <Section title="address" value={name.address} />
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}

function Section({ value, title, link }: { value: string | number; title: string; link?: string }) {
  const tools = useTools();
  return (
    <Column>
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
    </Column>
  );
}
