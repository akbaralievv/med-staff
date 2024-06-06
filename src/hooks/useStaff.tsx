import { useContext } from 'react';
import { StaffContext, StaffContextProps } from '../contexts/StaffContext';

export const useStaff = (): StaffContextProps => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
