
import React, { useState, useContext } from 'react';
import { Button, TextField, MenuItem, FormControl, TableCell, Table, TableContainer, TableBody, TableHead, Paper, TableRow, Grid, Typography, Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AssetContext } from '../../context/AssetContext';

const AllocateAsset = () => {
  const { assets, updateAsset } = useContext(AssetContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeEmail: '',
    assetID: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAllocateAsset = () => {
    const { employeeId, assetID, startDate, endDate, employeeName, employeeEmail } = formData;

    if (employeeId && assetID && startDate && endDate) {
      const assetToAllocate = assets.find(asset => asset.assetID === assetID);

      if (assetToAllocate) {
        const updatedAsset = {
          ...assetToAllocate,
          status: formData.status,
          employeeId,
          startDate,
          endDate,
          employeeName,
          employeeEmail,
        };

        updateAsset(updatedAsset);
        setFormData({
          employeeId: '',
          employeeName: '',
          employeeEmail: '',
          assetID: '',
          startDate: '',
          endDate: '',
          status: ''
        });
      } else {
        alert('Asset not found!');
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleEditClick = (asset) => {
    navigate(`/edit-asset/${asset.assetID}`, { state: { asset } });
  };

  return (
    <div style={{ padding: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <form onSubmit={(e) => { e.preventDefault(); handleAllocateAsset(); }} style={{ borderRadius: '10px', padding: '3rem', marginBottom: '2rem', width: '50%', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.18)' }}>
        <Typography variant='h5' textAlign={'center'}>Allocate Asset</Typography>
        <Grid container spacing={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                select
                label="Asset ID"
                name="assetID"
                value={formData.assetID || ''}
                onChange={handleInputChange}
                fullWidth
                required
              >
                {assets
                  .filter(asset => asset.status === 'AVAILABLE' || asset.status === 'ASSIGNED' || asset.status === 'DISPOSED' || asset.status === 'UNDER_MAINTENANCE')
                  .map(asset => (
                    <MenuItem key={asset.assetID} value={asset.assetID}>
                      {asset.assetID}
                    </MenuItem>
                  ))}
              </TextField>
            </FormControl>

            <TextField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth>
              <InputLabel >Status *</InputLabel>
              <Select name="status" value={formData.status} onChange={handleInputChange} variant="outlined" required>
                <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                <MenuItem value="ASSIGNED" >ASSIGNED</MenuItem>
                <MenuItem value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</MenuItem>
                <MenuItem value="DISPOSED">DISPOSED</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employee Email"
              name="employeeEmail"
              value={formData.employeeEmail || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Button type='submit' color="primary" variant="contained" fullWidth sx={{ marginY: 5 }}>
            Allocate Asset
          </Button>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.assetID}>
                <TableCell>{asset.assetID}</TableCell>
                <TableCell>{asset.employeeName || 'N/A'}</TableCell>
                <TableCell>{asset.employeeId || 'N/A'}</TableCell>
                <TableCell>{asset.startDate || 'N/A'}</TableCell>
                <TableCell>{asset.endDate || 'N/A'}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(asset)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllocateAsset;
