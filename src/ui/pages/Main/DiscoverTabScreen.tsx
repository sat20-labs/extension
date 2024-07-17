import { InscriptionMintedItem } from '@/shared/types';
import { Column, Content, Footer, Header, Layout, Row, Text } from '@/ui/components';
import InscriptionPreview from '@/ui/components/InscriptionPreview';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useInscriptionSummary } from '@/ui/state/accounts/hooks';
import { useSat20Website } from '@/ui/state/settings/hooks';

function MintItem({ info }: { info: InscriptionMintedItem }) {
  const navigate = useNavigate();
  const sat20Website = useSat20Website();
  return (
    <Column mt="lg" gap="sm">
      <Text text={info.title} preset="regular-bold" />
      <Row justifyBetween>
        <Text text={info.desc} preset="sub" />

        <Text
          text="More"
          color="orange"
          onClick={() => {
            window.open(`${sat20Website}/inscription/tag/${info.title}`);
          }}
        />
      </Row>

      <Row>
        {info.inscriptions.map((v) => (
          <InscriptionPreview
            key={v.inscriptionId}
            onClick={() => {
              navigate('OrdinalsInscriptionScreen', { inscription: v });
            }}
            preset="small"
            data={v}
          />
        ))}
      </Row>
    </Column>
  );
}

export default function DiscoverTabScreen() {
  const inscriptionSummary = useInscriptionSummary();
  return (
    <Layout>
      <Header />
      <Content>
        <Column>
          {inscriptionSummary.mintedList.map((v) => (
            <MintItem key={v.title} info={v} />
          ))}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="mint" />
      </Footer>
    </Layout>
  );
}
