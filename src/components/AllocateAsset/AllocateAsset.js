import {
  Button,
  FormControl, InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const AllocateAsset = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]); 
  const [selectedAssetId, setSelectedAssetId] = useState(null); 
  const [formData, setFormData] = useState({
    id: null,
    hostID: '',
    status: '',
    employeeId: null
  });
  const [searchTerm, setSearchTerm] = useState(''); 
  const [page, setPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchAssets('AVAILABLE');
  }, []);

  const fetchAssets = async (status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/assets?status.equals=${status}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setAssets(data);
        setFilteredAssets(data); 
      } else {
        console.error('Fetched data is not an array', data);
        setAssets([]);
        setFilteredAssets([]);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    if (selectedAssetId) {
      const selectedAsset = assets.find((asset) => asset.id === selectedAssetId);
      if (selectedAsset) {
        setFormData({
          id: selectedAsset.id,
          hostID: selectedAsset.hostID,
          status: selectedAsset.status,
          employeeId: selectedAsset.employee?.id || ''
        });
      }
    }
  }, [selectedAssetId, assets]);

  const updateAsset = async () => {
    if (formData.id !== null) {
      try {
        const updatedAsset = {
          id: selectedAssetId,
          hostID: formData.hostID,
          status: formData.status,
          employee: { id: formData.employeeId }
        };

        const response = await fetch(`http://localhost:8080/api/assets/${selectedAssetId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedAsset)
        });

        if (response.ok) {
          alert('Asset updated successfully');
          fetchAssets('AVAILABLE'); 
          setSelectedAssetId(null);
          setFormData({ id: null, hostID: '', status: '', employeeId: '' });
        } else {
          alert('Failed to update asset');
        }
      } catch (error) {
        console.error("Error updating asset:", error);
        alert('Error updating asset');
      }
    }
  };

 
  const handleEditClick = (assetId) => {
    setSelectedAssetId(assetId);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = assets.filter(
      (asset) =>
        asset.hostID.toLowerCase().includes(searchValue) ||
        asset.status.toLowerCase().includes(searchValue) ||
        (asset.employee?.id && asset.employee.id.toString().includes(searchValue))
    );
    setFilteredAssets(filtered);
    setPage(1); // Reset to page 1 after search
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Slice the assets to display for the current page
  const displayedAssets = Array.isArray(filteredAssets)
    ? filteredAssets.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  return (
    <div style={{ padding: '2rem 6rem' }}>
      <Typography variant="h4" textAlign="center" gutterBottom>Asset Management</Typography>
      
      {selectedAssetId && (
        <div style={{ borderRadius: '10px', padding: '3rem', marginBottom: '2rem', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.18)'}}>
          <Typography variant='h5' textAlign={'center'}>Edit Asset</Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Host ID"
              name="hostID"
              value={formData.hostID}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="ALLOCATED">Allocated</MenuItem>
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="DISPOSED">Disposed</MenuItem>
                <MenuItem value="RETURNED">Returned</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Employee ID"
              name="employeeId"
              type="number"
              value={formData.employeeId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={updateAsset} style={{ marginTop: 20 }} fullWidth>
              Update Asset
            </Button>
          </form>
        </div>
      )}
      <TextField
        label="Search Assets"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Host ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.hostID}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>{asset.employee?.id || 'N/A'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(asset.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredAssets.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: 20, display: 'flex', justifyContent: 'center', background: 'none' }}
      />
    </div>
  );
};

export default AllocateAsset;