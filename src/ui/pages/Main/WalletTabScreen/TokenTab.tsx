import { Column, Row } from '@/ui/components';
import { TabBar, TabProps } from '@/ui/components/TabBar';
import { useAddressSummary } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useOrdxFtAssetTabKey } from '@/ui/state/ui/hooks';
import { uiActions } from '@/ui/state/ui/reducer';
import React, { useEffect, useState } from 'react';
import { TokenList } from './TokenList';

export function TokenTab() {
  const addressSummary = useAddressSummary();
  const dispatch = useAppDispatch();
  const ordxFtTabKey = useOrdxFtAssetTabKey();

  const [tabItems, setTabItems] = useState<{ key: string; label: string, children: React.ReactNode }[]>([]);

  useEffect(() => {
    const items: { key: string; label: string, children: React.ReactNode }[] = [];
    if (addressSummary.token.length === 0) {
      return;
    }
    addressSummary.token.forEach((ft) => {
      items.push({
        key: ft.name,
        label: `${ft.name}(${ft.balance})`,
        children: <TokenList key={ft.name} ticker={ft.name} />
      })
    })
    items.sort((a, b) => a.key.localeCompare(b.key));
    setTabItems(items);

    if (!ordxFtTabKey && items.length > 0) {
      dispatch(uiActions.updateAssetTabScreen({ ordxFtAssetTabKey: items[0].key }));
    }

  }, [addressSummary]);

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
      {tabItems.map((item) => {
        if (item.key === ordxFtTabKey) {
          return item.children
        }
      })}
    </Column>
  );
}
