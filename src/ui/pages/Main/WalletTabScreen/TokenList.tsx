import { useEffect, useState } from 'react';

import { Inscription } from '@/shared/types';
import { Column, Row } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Empty } from '@/ui/components/Empty';
import InscriptionPreview from '@/ui/components/InscriptionPreview';
import { Pagination } from '@/ui/components/Pagination';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useWallet } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

import { useNavigate } from '../../MainRoute';

export interface TokenProps {
  ticker: string;
}

export function TokenList({ ticker }: TokenProps) {
  const navigate = useNavigate();
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();

  // const [tokenList, setTokenList] = useState<Token[]>([]);
  const [inscriptionList, setInscriptionList] = useState<Inscription[]>([]);
  const [total, setTotal] = useState(-1);
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10 });

  const tools = useTools();

  const fetchData = async (ticker: string) => {
    try {
      // tools.showLoading(true);
      const { list: tokenList, total: totalTokenCount } = await wallet.getTokenList(
        currentAccount.address,
        ticker,
        pagination.currentPage,
        pagination.pageSize
      );
      const inscriptionIdList: string[] = []
      tokenList?.forEach((data) => {
        data.assets.forEach((asset) => {
          inscriptionIdList.push(asset.inscriptionId)
        });
      })

      const inscriptionList: Inscription[] = []
      for (let i = 0; i < inscriptionIdList.length; i++) {
        const inscription = await wallet.getInscriptionInfo(inscriptionIdList[i])
        inscriptionList.push(inscription)
      }

      setInscriptionList(inscriptionList);
      setTotal(totalTokenCount);
    } catch (e) {
      tools.toastError((e as Error).message);
    } finally {
      // tools.showLoading(false);
    }
  };

  useEffect(() => {
    fetchData(ticker);
  }, [pagination, currentAccount.address]);

  if (total === -1) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <LoadingOutlined />
      </Column>
    );
  }

  if (total === 0) {
    return (
      <Column style={{ minHeight: 150 }} itemsCenter justifyCenter>
        <Empty text="Empty" />
      </Column>
    );
  }

  return (
    <Column>
      <Row style={{ flexWrap: 'wrap' }} gap="lg">
        {inscriptionList.map((data, index) => (
          <InscriptionPreview
            key={index}
            data={data}
            preset="medium"
            onClick={() => {
              navigate('OrdinalsInscriptionScreen', { inscription: data, withSend: true });
            }}
          />
        ))}
      </Row>
      <Row justifyCenter mt="lg">
        <Pagination
          pagination={pagination}
          total={total}
          onChange={(pagination) => {
            setPagination(pagination);
          }}
        />
      </Row>
    </Column>
  );
}
