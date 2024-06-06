import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { useStaff } from '../hooks/useStaff';

interface StaffMember {
  id: number;
  name: string;
  department: string;
  role: string;
  isHead: boolean;
}

interface StaffTableProps {
  data: StaffMember[];
  defaultRole: string;
}
const departments = ['кардиологическое', 'хирургическое'];

const StaffTable: React.FC<StaffTableProps> = ({ data, defaultRole }) => {
  const { addStaff, updateStaff, deleteStaff } = useStaff();
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<StaffMember>({
    id: Date.now(),
    name: '',
    department: departments[0],
    role: defaultRole, // Default role
    isHead: false,
  });

  useEffect(() => {
    setNewMember((prev) => ({
      ...prev,
      role: defaultRole,
    }));
  }, [defaultRole]);

  const handleSave = () => {
    if (editingMember) {
      if (!editingMember.name.trim()) {
        setError('Имя сотрудника не может быть пустым.');
        return;
      }
      updateStaff(editingMember);
      setEditingMember(null);
    } else {
      if (!newMember.name.trim()) {
        setError('Имя сотрудника не может быть пустым.');
        return;
      }
      addStaff(newMember);
      setNewMember({
        id: Date.now(),
        name: '',
        department: departments[0],
        role: defaultRole,
        isHead: false,
      });
    }
    setError(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell>Отделение</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Заведующий</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.isHead ? 'Да' : 'Нет'}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingMember(member)}>Редактировать</Button>
                <Button onClick={() => deleteStaff(member.id)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <input
                type="text"
                value={editingMember ? editingMember.name : newMember.name}
                onChange={(e) => {
                  const value = e.target.value;
                  editingMember
                    ? setEditingMember({ ...editingMember, name: value })
                    : setNewMember({ ...newMember, name: value });
                }}
              />
            </TableCell>
            <TableCell>
              <Select
                value={editingMember ? editingMember.department : newMember.department}
                onChange={(e) => {
                  const value = e.target.value as string;
                  editingMember
                    ? setEditingMember({ ...editingMember, department: value })
                    : setNewMember({ ...newMember, department: value });
                }}>
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select
                value={editingMember ? editingMember.role : newMember.role}
                onChange={(e) => {
                  const value = e.target.value as string;
                  editingMember
                    ? setEditingMember({ ...editingMember, role: value })
                    : setNewMember({ ...newMember, role: value });
                }}>
                <MenuItem value="Врач">Врач</MenuItem>
                <MenuItem value="Медсестра">Медсестра</MenuItem>
                <MenuItem value="Медбрат">Медбрат</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <input
                type="checkbox"
                checked={editingMember ? editingMember.isHead : newMember.isHead}
                onChange={(e) => {
                  const checked = e.target.checked;
                  editingMember
                    ? setEditingMember({ ...editingMember, isHead: checked })
                    : setNewMember({ ...newMember, isHead: checked });
                }}
              />
            </TableCell>
            <TableCell>
              <Button onClick={handleSave}>{editingMember ? 'Сохранить' : 'Добавить'}</Button>
              {editingMember && <Button onClick={() => setEditingMember(null)}>Отмена</Button>}
            </TableCell>
          </TableRow>
          {error && (
            <TableRow>
              <TableCell colSpan={5} style={{ color: 'red' }}>
                {error}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaffTable;
