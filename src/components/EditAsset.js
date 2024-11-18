
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AssetContext } from '../context/AssetContext';

const EditAsset = () => {
  const { assets, updateAsset } = useContext(AssetContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeEmail: '',
    assetID: '',
    startDate: '',
    endDate: '',
    returnBy: '',
    issue: '',
    comments: '',
    vendor: '',
    assetType: '',
    manufacturer: '',
    manufacturerYear: 0,
    serviceCode: '',
    serialNumber: '',
    ownership: '',
    modelNumber: '',
    model: '',
    mac: '',
    configuration: '',
    cost: '',
    operatingSystem: '',
    status: '',
    purchaseDate: '',
    warrantyExpirationDate: '',
    bag: '',
    mouse: '',
    link: '',
    uploadedFiles: [],
  });

  useEffect(() => {
    if (state?.asset) {
      setFormData({
        employeeId: state.asset.employeeId || '',
        employeeName: state.asset.employeeName || '',
        employeeEmail: state.asset.employeeEmail || '',
        assetID: state.asset.assetID || '',
        startDate: state.asset.startDate || '',
        endDate: state.asset.endDate || '',
        returnBy: state.asset.returnBy || '',
        issue: state.asset.issue || '',
        comments: state.asset.comments || '',
        vendor: state.asset.vendor || '',
        assetType: state.asset.assetType || '',
        manufacturer: state.asset.manufacturer || '',
        manufacturerYear: state.asset.manufacturerYear || 0,
        serviceCode: state.asset.serviceCode || '',
        serialNumber: state.asset.serialNumber || '',
        ownership: state.asset.ownership || '',
        modelNumber: state.asset.modelNumber || '',
        model: state.asset.model || '',
        mac: state.asset.mac || '',
        configuration: state.asset.configuration || '',
        cost: state.asset.cost || '',
        operatingSystem: state.asset.operatingSystem || '',
        status: state.asset.status || '',
        purchaseDate: state.asset.purchaseDate || '',
        warrantyExpirationDate: state.asset.warrantyExpirationDate || '',
        bag: state.asset.bag || '',
        mouse: state.asset.mouse || '',
        link: state.asset.link || '',
        uploadedFiles: state.asset.uploadedFiles || [],
      });
    }
  }, [state]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file =>
      file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: validFiles.map(file => file.name),
      }));
    } else {
      alert('Only PDF, DOC, and DOCX files are allowed');
    }
  };

  const handleDeleteLink = (linkToDelete) => {
    setFormData((prevAssets) =>
      prevAssets.map((asset) =>
        asset.link === linkToDelete ? { ...asset, link: '' } : asset
      )
    );
  };

  const handleFileDelete = (fileName) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(file => file !== fileName),
    }));
  };
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 20; i <= currentYear + 0; i++) {
    years.push(i);
  }

  const handleUpdateAsset = (e) => {
    e.preventDefault();

    if (formData.assetID) {
      const newAsset = { ...formData };
      updateAsset(newAsset);
      // navigate('/allocate-asset');
      navigate('/audit-history')
    } else {
      alert('Please select a valid asset');
    }
  };


  return (
    <div style={{ borderRadius: '10px', padding: '3rem', marginBottom: '2rem', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.18)' }}>
      <Typography variant='h4' textAlign={'center'}>Edit Asset</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, padding: 10 }}>
        <TextField
          select
          label="Asset ID"
          name="assetID"
          value={formData.assetID || ''}
          onChange={handleInputChange}
          fullWidth
          required
          disabled
        >
          {assets.filter(asset => asset.status === 'AVAILABLE' || asset.status === 'ASSIGNED' || asset.status === 'DISPOSED' || asset.status === 'UNDER_MAINTENANCE').map(asset => (
            <MenuItem key={asset.assetID} value={asset.assetID}>
              {asset.assetID}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled
        />
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
        <TextField
          label="Return By"
          name="returnBy"
          type="text"
          value={formData.returnBy || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Comments"
          name="comments"
          value={formData.comments || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Issue"
          name="issue"
          value={formData.issue || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth>
          <InputLabel>Vendor *</InputLabel>
          <Select name="vendor" value={formData.vendor} onChange={handleInputChange} variant="outlined" required>
            <MenuItem value="Vendor1">Vendor1</MenuItem>
            <MenuItem value="Vendor2">Vendor2</MenuItem>
            <MenuItem value="Vendor3">Vendor3</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Model" name="model" value={formData.model || ''} onChange={handleInputChange} fullWidth style={{ marginTop: 16 }} />

        <TextField label="Manufacturer" name="manufacturer" value={formData.manufacturer || ''} onChange={handleInputChange} fullWidth style={{ marginTop: 16 }} />

        <TextField label="Mac" name="mac" value={formData.mac || ''} onChange={handleInputChange} fullWidth style={{ marginTop: 16 }} />

        <TextField label="Configuration" name="configuration" value={formData.configuration || ''} onChange={handleInputChange} fullWidth style={{ marginTop: 16 }} />

        <TextField label="Warranty Expiration Date" name="warrantyExpirationDate" type="date" value={formData.warrantyExpirationDate || ''} onChange={handleInputChange} fullWidth style={{ marginTop: 16 }} InputLabelProps={{ shrink: true }} />

        <TextField label="Cost" name="cost" value={formData.cost || ''} onChange={handleInputChange} fullWidth style={{ marginTop: 16 }} InputAdornment={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
        <FormControl fullWidth>
          <InputLabel>AssetType</InputLabel>
          <Select name="assetType" value={formData.assetType} onChange={handleInputChange} variant="outlined" required>
            <MenuItem value="LAPTOP">LAPTOP</MenuItem>
            <MenuItem value="DESKTOP">DESKTOP</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Service Code" name="serviceCode" variant="outlined" fullWidth required value={formData.serviceCode} onChange={handleInputChange} style={{ marginTop: 16 }} />
        <TextField label="Model Number" name="modelNumber" variant="outlined" fullWidth required value={formData.modelNumber} onChange={handleInputChange} style={{ marginTop: 16 }} />
        <TextField label="Manufacturer Year" name="manufacturerYear" variant="outlined" fullWidth value={formData.manufacturerYear} onChange={handleInputChange} select style={{ marginTop: 16 }}>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Serial Number" name="serialNumber" variant="outlined" fullWidth required value={formData.serialNumber} onChange={handleInputChange} style={{ marginTop: 16 }} />
        <TextField label="Operating System" name="operatingSystem" variant="outlined" fullWidth value={formData.operatingSystem} onChange={handleInputChange} style={{ marginTop: 16 }} />
        <TextField label="Purchase Date" name="purchaseDate" type="date" variant="outlined" fullWidth value={formData.purchaseDate} onChange={handleInputChange} style={{ marginTop: 16 }} InputLabelProps={{ shrink: true }} inputProps={{
          max: new Date().toISOString().split("T")[0]
        }} />
        <FormControl fullWidth>
          <InputLabel>Ownership *</InputLabel>
          <Select name="ownership" value={formData.ownership} onChange={handleInputChange} variant="outlined" required>
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="RENEW">RENEW</MenuItem>
            <MenuItem value="RERENTAL">RERENTAL</MenuItem>
            <MenuItem value="UD">UD</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel color='error'>Status *</InputLabel>
          <Select name="status" value={formData.status} onChange={handleInputChange} variant="outlined" required>
            <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
            <MenuItem value="ASSIGNED" >ASSIGNED</MenuItem>
            <MenuItem value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</MenuItem>
            <MenuItem value="DISPOSED">DISPOSED</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Link" name="link" variant="outlined" fullWidth value={formData.link} onChange={handleInputChange} type='url' required={!formData.uploadedFiles.length} />
        <Box>
          <FormControl>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
              required={!formData.link}
            />
            <label htmlFor="file-upload" style={{ margin: '1rem' }}>
              <Button variant="contained" color="inherit" component="span" sx={{ borderRadius: '10px' }}>
                <AttachFileIcon sx={{ marginRight: 1 }} /> Upload Files
              </Button>
            </label>
          </FormControl>
          <Typography variant="body2" color="textSecondary" >
            {formData.uploadedFiles.length > 0 && (
              <div>
                {formData.uploadedFiles.map((fileName, index) => (
                  <Typography key={index}>{fileName}</Typography>
                ))}
              </div>
            )}
          </Typography>
        </Box>
      </Box>

      <Button onClick={handleUpdateAsset} color="primary" variant="contained" fullWidth sx={{ marginBottom: 5 }}>
        Update Asset
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Email</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Return By</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.assetID}>
                <TableCell>{asset.assetID}</TableCell>
                <TableCell>{asset.employeeName || 'N/A'}</TableCell>
                <TableCell>{asset.employeeId || 'N/A'}</TableCell>
                <TableCell>{asset.employeeEmail || 'N/A'}</TableCell>
                <TableCell>{asset.startDate || 'N/A'}</TableCell>
                <TableCell>{asset.endDate || 'N/A'}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>{asset.returnBy || 'N/A'}</TableCell>
                <TableCell>{asset.issue || 'N/A'}</TableCell>
                <TableCell>{asset.comments || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EditAsset;
