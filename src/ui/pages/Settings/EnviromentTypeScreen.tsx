import { ENVIROMENT_TYPES } from '@/shared/constant';
import { Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useChangeEnvironmentTypeCallback, useEnvironmentType } from '@/ui/state/settings/hooks';

import { useNavigate } from '../MainRoute';

export default function EnviromentTypeScreen() {
  const environmentType = useEnvironmentType();
  const changeEnvironmentType = useChangeEnvironmentTypeCallback();
  const reloadAccounts = useReloadAccounts();
  const tools = useTools();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Switch Network"
      />
      <Content>
        <Column>
          {ENVIROMENT_TYPES.map((item, index) => {
            return (
              <Card
                key={index}
                onClick={async () => {
                  if (item.value == environmentType) {
                    return;
                  }
                  await changeEnvironmentType(item.value);
                  reloadAccounts();
                  navigate('MainScreen');
                  tools.toastSuccess('Network type changed');
                }}>
                <Row full justifyBetween itemsCenter>
                  <Row itemsCenter>
                    <Text text={item.label} preset="regular-bold" />
                  </Row>
                  <Column>{item.value == environmentType && <Icon icon="check" />}</Column>
                </Row>
              </Card>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
