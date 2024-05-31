import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { TeacherContext } from '../../../context/Teachers';

interface AssignTeacherModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (teacherId: number | '') => void;
  teacherId: number | null;
}

export const AssignTeacherModal: React.FC<AssignTeacherModalProps> = ({
  open,
  handleClose,
  handleSave,
  teacherId,
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState<number | ''>(
    teacherId ?? ''
  );

  const { teachers } = useContext(TeacherContext);

  useEffect(() => {
    setSelectedTeacher(teacherId ?? '');
  }, [open]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedTeacher(event.target.value as number);
  };

  const handleSubmit = () => {
    if (selectedTeacher) {
      handleSave(selectedTeacher);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          fontWeight: 600,
        }}
      >
        Assign Teacher
      </DialogTitle>
      <DialogContent
        sx={{
          width: { md: 400, xs: '100%' },
        }}
      >
        <InputLabel id="teacher-label">Select Teacher</InputLabel>
        <Select
          labelId="teacher-label"
          id="teacher-select"
          value={selectedTeacher}
          onChange={handleChange}
          fullWidth
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.firstName + ' ' + teacher.lastName}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
