import React from 'react';

import StaffTable from '../components/StaffTable';
import { useStaff } from '../hooks/useStaff';

const DoctorsPage: React.FC = () => {
  const { staff } = useStaff();
  const doctors = staff.filter((member) => member.role === 'Врач');
  return <StaffTable data={doctors} defaultRole="Врач" />;
};

export default DoctorsPage;
