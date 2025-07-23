const dashboard = () => {
  return <div>대시보드페이지예요.</div>;
};
export default dashboard;

// 'use client';
// import { useEffect, useState } from 'react';
// import { apiClient } from '@/api/auth/apiClient';
// import { useRouter } from 'next/navigation';
// import { getAccessToken } from '@/utils/tokenhandler';

// interface Dashboard {
//   id: number;
//   title: string;
//   color: string;
//   createdAt: string;
//   updatedAt: string;
//   createdByMe: boolean;
//   userId: number;
// }

// interface DashboardResponse {
//   cursorId: string;
//   totalCount: number;
//   dashboards: Dashboard[];
// }

// async function fetchDashboards(token: string | null) {
//   const res = await apiClient.get<DashboardResponse>('/dashboards', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data; //DashboardResponse 로 안전하게 전부 받읍시다 ㅠ
// }

// const Dashboard = () => {
//   const [dashboards, setDashboards] = useState<Dashboard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const [token, setToken] = useState<string | null>(null); //토큰상태추가

//   useEffect(() => {
//     const storedToken = getAccessToken(); //1.토큰가져오기
//     if (storedToken && storedToken !== token) {
//       setToken(storedToken); //토큰이 존재하고, null이면 토큰 상태 업뎃
//     }
//   }, []); //마운트시1회만실행

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!token) {
//           router.push('/login');
//           return;
//         }

//         const data = await fetchDashboards(token); //대시보드가져오기
//         setDashboards(data.dashboards); //대시보드목록업뎃
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [router, token]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {dashboards.map((d) => (
//         <div key={d.id}>
//           <div>{d.title}</div>
//           <div>{d.color}</div>
//           <div>{d.createdAt}</div>
//           <div>{d.updatedAt}</div>
//           <div>{d.createdByMe}</div>
//           <div>{d.userId}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;
