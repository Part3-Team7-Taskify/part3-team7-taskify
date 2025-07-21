'use client';
import { useEffect, useState } from 'react';
import { apiClient } from '@/api/auth/apiClient';
import { useRouter } from 'next/navigation';

interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface DashboardResponse {
  cursorId: string;
  totalCount: number;
  dashboards: Dashboard[];
}

async function fetchDashboards() {
  const res = await apiClient.get<DashboardResponse>('dashboards');
  return res.data; //DashboardResponse 로 안전하게 전부 받읍시다 ㅠ
}

const Dashboard = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDashboards()
      .then((data) => {
        setDashboards(data.dashboards);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);

        // 에러처리

        if (err?.response?.status === 401) {
          router.push('/login'); //redirect!
        }
      });
  }, [router]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 사유:{error}</div>;

  return (
    <div>
      {dashboards.map((d) => (
        <div key={d.id}>
          <div>{d.title}</div>
          <div>{d.color}</div>
          <div>{d.createdAt}</div>
          <div>{d.updatedAt}</div>
          <div>{d.createdByMe}</div>
          <div>{d.userId}</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
