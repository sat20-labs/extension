import { useEffect, useState } from 'react';

import { OrdinalsName } from '@/shared/types';
import { Column, Row } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Empty } from '@/ui/components/Empty';
import OrdinalsNamePreview from '@/ui/components/OrdinalsNamePreview';
import { Pagination } from '@/ui/components/Pagination';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useWallet } from '@/ui/utils';
import { LoadingOutlined } from '@ant-design/icons';

import { useNavigate } from '../../MainRoute';

export function NameList() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();

  const [names, setNames] = useState<OrdinalsName[]>([]);
  const [total, setTotal] = useState(-1);
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 100 });

  const tools = useTools();
  const fetchData = async () => {
    try {
      const { list, total } = await wallet.getOrdinalsNameList(
        currentAccount.address,
        pagination.currentPage,
        pagination.pageSize
      );
      setNames(list);
      setTotal(total);
    } catch (e) {
      tools.toastError((e as Error).message);
    } finally {
      // tools.showLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      <Row style={{ flexWrap: 'wrap' }} gap="sm">
        {names.map((name, index) => (
            <OrdinalsNamePreview
            key={index}
            data={name}
            preset="medium"
            onClick={() => {
              navigate('OrdinalsInscriptionScreen', { name: name });
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
