import React, { createContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

import initialStaff from '../data/staffData.json';

interface StaffMember {
  id: number;
  name: string;
  department: string;
  role: string;
  isHead: boolean;
}

export interface StaffContextProps {
  staff: StaffMember[];
  addStaff: (member: StaffMember) => void;
  updateStaff: (member: StaffMember) => void;
  deleteStaff: (id: number) => void;
}

export const StaffContext = createContext<StaffContextProps | undefined>(undefined);
interface StaffProviderProps {
  children: ReactNode;
}

export const StaffProvider: React.FC<StaffProviderProps> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);

  const addStaff = (member: StaffMember) => {
    setStaff([...staff, member]);
    toast.success('Сотрудник добавлен!');
  };

  const updateStaff = (member: StaffMember) => {
    setStaff(staff.map((m) => (m.id === member.id ? member : m)));
    toast.info('Сотрудник обновлен!');
  };

  const deleteStaff = (id: number) => {
    setStaff(staff.filter((m) => m.id !== id));
    toast.error('Сотрудник удален!');
  };

  return (
    <StaffContext.Provider value={{ staff, addStaff, updateStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  );
};
