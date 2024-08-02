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
    if (addressSummary.ordxFt.length === 0) {
      return;
    }
    addressSummary.ordxFt.forEach((ft) => {
      items.push({
        key: ft.name,
        label: `${ft.name}(${ft.balance})`,
        children: <TokenList />
      })
    })
    items.sort((a, b) => a.key.localeCompare(b.key));
    setTabItems(items);
    console.log('tokentab: tabitems:', items);

    if (!ordxFtTabKey && items.length > 0) {
      console.log('tokentab: set default tab key:', items[0].key);
      dispatch(uiActions.updateAssetTabScreen({ ordxFtAssetTabKey: items[0].key }));
    }
    console.log('tokentab: tabKey:', ordxFtTabKey);
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
            if (key) {
              console.log('tokentab: click, key:', key);
              dispatch(uiActions.updateAssetTabScreen({ ordxFtAssetTabKey: key }));
              console.log('tokentab: tabKey2:', ordxFtTabKey);
              // dispatch(uiActions.updateAssetTabScreen({ assetTabKey: AssetTabKey.EXOTIC }));
              // console.log('tokentab: tabKey3:', assetTabKey);
            }
          }}
        />
      </Row>
      {tabItems.map((item) => {
        if (item.key === ordxFtTabKey) {
          return item.children
        }
      })}
      {/* {tabItems[ordxFtTabKey] && <div>test</div>} */}
    </Column>
  );
}
