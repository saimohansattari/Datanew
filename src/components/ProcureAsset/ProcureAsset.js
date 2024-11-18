import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AssetContext } from '../../context/AssetContext';

const ProcureAsset = () => {
  const { assets, addAsset, updateAsset } = useContext(AssetContext);

  const [assetData, setAssetData] = useState({
    hostID: '',
    vendor: '',
    assetType: 'LAPTOP',
    manufacturer: '',
    manufacturerYear: 2004,
    serviceCode: '',
    serialNumber: '',
    ownership: '',
    modelNumber: '',
    model: '',
    mac: '',
    configuration: '',
    cost: '',
    operatingSystem: '',
    status: 'AVAILABLE',
    purchaseDate: '',
    warrantyExpirationDate: '',
    bag: '',
    mouse: '',
    link: '',
    uploadedFiles: [],
  });

  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  


  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 20; i <= currentYear + 0; i++) {
    years.push(i);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAssetData((prev) => ({ ...prev, [name]: value }));
  };





  useEffect(() => {
    axios.get('http://localhost:8080/api/assets').then((res) => {
    setTableData(res.data)
  })
  },[])

  const handleProcure = async (e) => {
    e.preventDefault();
    const uniqueHostID = Date.now().toString(); 
    const newAsset = { ...assetData, hostID: uniqueHostID  };

  

    try {
      const response = await axios.post('http://localhost:8080/api/assets', newAsset);
      addAsset(response.data);
      setTableData((prev) => [...prev, response.data]);
      resetForm();
      console.log('New record added:', response.data);
    } catch (error) {
      console.error('Error saving asset:', error);
    }



    
  };



  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file =>
      file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (validFiles.length > 0) {
      setAssetData((prev) => ({
        ...prev,
        uploadedFiles: validFiles.map(file => file.name),
      }));
    } else {
      alert('Only PDF, DOC, and DOCX files are allowed');
    }
  };


  const handleFileDelete = (fileName) => {
    setAssetData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(file => file !== fileName),
    }));
  };



  const resetForm = () => {
    setAssetData({
      hostID: '',
      vendor: '',
      assetType: 'LAPTOP',
      manufacturerYear: 2004,
      manufacturer: '',
      serviceCode: '',
      modelNumber: '',
      serialNumber: '',
      model: '',
      mac: '',
      configuration: '',
      cost: '',
      operatingSystem: '',
      status: 'AVAILABLE',
      purchaseDate: '',
      warrantyExpirationDate: '',
      bag: '',
      mouse: '',
      link: '',
      uploadedFiles: [],
    });
    setEditingAsset(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const filteredAssets = assets.filter((asset) =>
    ['vendor', 'assetType', 'manufacturer', 'serialNumber'].some(key => 
      asset[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  
  const handleEdit = (asset) => {
    setAssetData(asset);
    setEditingAsset(asset);
  };


  return (
    <div style={{ padding: '2rem 6rem' }}>
      <form onSubmit={handleProcure} style={{ borderRadius: '10px', padding: '3rem', marginBottom: '2rem', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.18)' }}>
        <Typography variant="h4" marginBottom={5} textAlign={'center'}>
          Add Asset
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} >
            {/* <TextField label="Host ID" name="hostID" variant="outlined" fullWidth required value={assetData.hostID} onChange={handleChange} /> */}
            <FormControl fullWidth>
              <InputLabel>Vendor *</InputLabel>
              <Select name="vendor" value={assetData.vendor} onChange={handleChange} variant="outlined" required>
                <MenuItem value="C_PROMPT">C_PROMPT</MenuItem>
                <MenuItem value="Sriveda">Sriveda</MenuItem>
                <MenuItem value="CTC_Adiko">CTC_Adiko</MenuItem>
                <MenuItem value="Butterfly">Butterfly</MenuItem>
                <MenuItem value="Lappycare">Lappycare</MenuItem>
                <MenuItem value="Lenovo_KPHB">Lenovo_KPHB</MenuItem>
                <MenuItem value="Lenovo_Madhapur">Lenovo_Madhapur</MenuItem>
                <MenuItem value="Lenovo_HSR_Layout">Lenovo_HSR_Layout</MenuItem>
                <MenuItem value="UD">UD</MenuItem>
               
              </Select>
            </FormControl>
            <TextField label="Model" name="model" variant="outlined" fullWidth required value={assetData.model} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Manufacturer" name="manufacturer" variant="outlined" fullWidth value={assetData.manufacturer} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Mac" name="mac" variant="outlined" fullWidth value={assetData.mac} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Configuration" name="configuration" variant="outlined" fullWidth value={assetData.configuration} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Bag" name="bag" variant="outlined" fullWidth value={assetData.bag} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Mouse" name="mouse" variant="outlined" fullWidth value={assetData.mouse} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Warranty Expiration Date" name="warrantyExpirationDate" type="date" variant="outlined" fullWidth value={assetData.warrantyExpirationDate} onChange={handleChange} style={{ marginTop: 16 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Cost" name="cost" variant="outlined" fullWidth required value={assetData.cost} onChange={handleChange} style={{ marginTop: 16 }} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} type="text" />
            <TextField label="Link" name="link" variant="outlined" fullWidth value={assetData.link} onChange={handleChange} style={{ marginTop: 16 }} type='url' required={!assetData.uploadedFiles.length} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth style={{ marginTop: -2 }}>
              <InputLabel>AssetType</InputLabel>
              <Select name="assetType" value={assetData.assetType} onChange={handleChange} variant="outlined" required>
                <MenuItem value="LAPTOP">LAPTOP</MenuItem>
                <MenuItem value="DESKTOP">DESKTOP</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Service Code" name="serviceCode" variant="outlined" fullWidth required value={assetData.serviceCode} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Model Number" name="modelNumber" variant="outlined" fullWidth required value={assetData.modelNumber} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Manufacturer Year" name="manufacturerYear" variant="outlined" fullWidth value={assetData.manufacturerYear} onChange={handleChange} select style={{ marginTop: 16 }}>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Serial Number" name="serialNumber" variant="outlined" fullWidth required value={assetData.serialNumber} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Operating System" name="operatingSystem" variant="outlined" fullWidth value={assetData.operatingSystem} onChange={handleChange} style={{ marginTop: 16 }} />
            <TextField label="Purchase Date" name="purchaseDate" type="date" variant="outlined" fullWidth value={assetData.purchaseDate} onChange={handleChange} style={{ marginTop: 16 }} InputLabelProps={{ shrink: true }} inputProps={{
              max: new Date().toISOString().split("T")[0]
            }} />
            <FormControl fullWidth style={{ marginTop: 16 }}>
              <InputLabel>Ownership *</InputLabel>
              <Select name="ownership" value={assetData.ownership} onChange={handleChange} variant="outlined" required>
                <MenuItem value="NEW">NEW</MenuItem>
                <MenuItem value="RENEW">RENEW</MenuItem>
                <MenuItem value="RERENTAL">RERENTAL</MenuItem>
                <MenuItem value="UD">UD</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginTop: 16 }}>
              <InputLabel>Status *</InputLabel>
              <Select name="status" value={assetData.status} onChange={handleChange} variant="outlined" required>
                <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                <MenuItem value="ASSIGNED" >ASSIGNED</MenuItem>
                <MenuItem value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</MenuItem>
                <MenuItem value="DISPOSED">DISPOSED</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField label="Link" name="link" variant="outlined"  fullWidth value={assetData.link} onChange={handleChange} style={{ marginTop: 16 }} type='url' required={!assetData.uploadedFiles.length} /> */}
            <FormControl>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
                required={!assetData.link}
              />
              <label htmlFor="file-upload" style={{ margin: '1rem' }}>
                <Button variant="contained" color="inherit" component="span" sx={{ borderRadius: '10px' }}>
                  <AttachFileIcon sx={{ marginRight: 1 }} /> Upload Files
                </Button>
              </label>
            </FormControl>
            <Typography variant="body2" color="textSecondary" >
              {assetData.uploadedFiles.length > 0 && (
                <div>
                  {assetData.uploadedFiles.map((fileName, index) => (
                    <Typography key={index}>{fileName}</Typography>
                  ))}
                </div>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '2rem', width: '100%' }}>
          {editingAsset ? 'Edit Asset' : 'Add Asset'}
        </Button>
      </form>

      <div>
        <Typography variant="h6">Assets Available</Typography>
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: '16px', width: '100%', padding: '8px', fontSize: '16px' }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="assets table">
          <TableHead>
            <TableRow>
              <TableCell>Host ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Asset Type</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Configuration</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Operating System</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Warranty Expiration</TableCell>
              <TableCell>MAC</TableCell>
              <TableCell>Mouse</TableCell>
              <TableCell>Bag</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ownership</TableCell>
              <TableCell>Manufacturer Year</TableCell>
              <TableCell>Service Code</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((asset) => (
              <TableRow key={asset.hostID}>
                <TableCell>{asset.hostID}</TableCell>
                <TableCell>{asset.vendor}</TableCell>
                <TableCell>{asset.assetType}</TableCell>
                <TableCell>{asset.manufacturer}</TableCell>
                <TableCell>{asset.serialNumber}</TableCell>
                <TableCell>{asset.model}</TableCell>
                <TableCell>{asset.configuration}</TableCell>
                <TableCell>${asset.cost}</TableCell>
                <TableCell>{asset.operatingSystem}</TableCell>
                <TableCell>{asset.purchaseDate}</TableCell>
                <TableCell>{asset.warrantyExpirationDate}</TableCell>
                <TableCell>{asset.mac}</TableCell>
                <TableCell>{asset.mouse}</TableCell>
                <TableCell>{asset.bag}</TableCell>
                <TableCell>{asset.link ? (
                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <a href={asset.link} target="_blank" rel="noopener noreferrer">
                      Open link
                    </a>
                    {/* <DeleteIcon
                      onClick={() => handleDeleteLink(asset.link)}
                      style={{ cursor: 'pointer', color: 'red' }}
                    /> */}
                  </Box>
                ) : (
                  'No link'
                )} </TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>{asset.ownership}</TableCell>
                <TableCell>{asset.manufacturerYear}</TableCell>
                <TableCell>{asset.serviceCode}</TableCell>
                <TableCell>
                  {asset?.uploadedFiles?.length > 0 ? (
                    <div>
                      {asset.uploadedFiles.map((fileName, index) => (
                        <Box 
                          key={index} 
                          display={'flex'} 
                          flexDirection={'row'} 
                          alignItems={'center'} 
                          justifyContent={'space-between'}
                        >
                          <div>
                            <Typography>{fileName}</Typography>
                            {/* <a href={`#`} target="_blank" rel="noopener noreferrer">{fileName}</a> */}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <a href={`#`} download={fileName} style={{ marginRight: '0.5rem' }}>
                              <DownloadIcon />
                            </a>
                            <DeleteIcon
                              onClick={() => handleFileDelete(fileName)}
                              style={{ cursor: 'pointer', color: 'red' }}
                            />
                          </div>
                        </Box>
                      ))}
                    </div>
                  ) : (
                    'No Files Uploaded'
                  )}
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleEdit(asset)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={confirmationMessage} autoHideDuration={3000} onClose={() => setConfirmationMessage(false)} message="Asset procured successfully!" />
    </div>
  );
};


export default ProcureAsset;
