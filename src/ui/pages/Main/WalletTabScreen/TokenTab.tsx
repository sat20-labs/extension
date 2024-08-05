import { Column, Row } from '@/ui/components';
import { Empty } from '@/ui/components/Empty';
import { TabBar, TabProps } from '@/ui/components/TabBar';
import { useAddressSummary } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useOrdxFtAssetTabKey } from '@/ui/state/ui/hooks';
import { uiActions } from '@/ui/state/ui/reducer';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { TokenList } from './TokenList';

export function TokenTab() {
  const addressSummary = useAddressSummary();
  const dispatch = useAppDispatch();
  const ordxFtTabKey = useOrdxFtAssetTabKey();
  const [tabItems, setTabItems] = useState<{ key: string; label: string, children: React.ReactNode }[]>([]);
  const [tabCount, setTabCount] = useState(-1);
  useEffect(() => {
    const items: { key: string; label: string, children: React.ReactNode }[] = [];
    addressSummary.token.forEach((ft) => {
      items.push({
        key: ft.name,
        label: `${ft.name}(${ft.balance})`,
        children: <TokenList key={ft.name} ticker={ft.name} />
      })
    })
    items.sort((a, b) => a.key.localeCompare(b.key));
    setTabItems(items);
    setTabCount(items.length);
    const tabKey = items.length > 0 ? items[0].key : '';
    dispatch(uiActions.updateAssetTabScreen({ ordxFtAssetTabKey: tabKey }));
  }, [addressSummary]);

  if (tabCount === -1) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <LoadingOutlined />
      </Column>
    );
  }

  if (tabCount === 0) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <Empty text="Empty" />
      </Column>
    );
  }

  return (
    <Column>
      <Row justifyBetween>
        <TabBar
          defaultActiveKey={ordxFtTabKey}
          activeKey={ordxFtTabKey}
          items={tabItems as TabProps[]}
          preset="style2"
          onTabClick={(key) => {
            dispatch(uiActions.updateAssetTabScreen({ ordxFtAssetTabKey: key }));
          }}
        />
      </Row>
      {
        tabItems.map((item) => {
          if (item.key === ordxFtTabKey) {
            return item.children
          }
        })
      }
    </Column>
  )
}
