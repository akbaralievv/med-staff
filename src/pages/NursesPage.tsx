import React from 'react';

import StaffTable from '../components/StaffTable';
import { useStaff } from '../hooks/useStaff';

const NursesPage: React.FC = () => {
  const { staff } = useStaff();
  const nurses = staff.filter((member) => member.role === 'Медсестра' || member.role === 'Медбрат');
  return <StaffTable data={nurses} defaultRole="Медсестра" />;
};

export default NursesPage;
