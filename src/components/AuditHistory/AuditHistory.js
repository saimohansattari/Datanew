import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowDropUpIcon from '@mui/icons-material/North';
import ArrowDropDownIcon from '@mui/icons-material/South';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const AuditHistory = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
 
  // Fetch assets from API when the component mounts
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/assets');
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };
 
    fetchAssets();
  }, []);
 
  const handleEditClick = (asset) => {
    navigate(`/edit-asset/${asset.hostID}`, { state: { asset } });
  };
 
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
 
  const sortedAssets = [...assets].sort((a, b) => {
    const { key, direction } = sortConfig;
    const order = direction === 'asc' ? 1 : -1;
 
    const valueA = a[key] || '';
    const valueB = b[key] || '';
 
    if (valueA < valueB) return -order;
    if (valueA > valueB) return order;
    return 0;
  });
 
  const filteredAssets = sortedAssets.filter((asset) =>
    Object.values(asset).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
 
  const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
 
  const renderSortIcon = (key) => (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 0.3 }}>
      <ArrowDropUpIcon
        onClick={() => handleSort(key)}
        fontSize='small'
        sx={{
          cursor: 'pointer',
          color: sortConfig.key === key && sortConfig.direction === 'asc' ? 'primary.main' : 'inherit',
        }}
      />
      <ArrowDropDownIcon
        fontSize='small'
        onClick={() => handleSort(key)}
        sx={{
          cursor: 'pointer',
          color: sortConfig.key === key && sortConfig.direction === 'desc' ? 'primary.main' : 'inherit',
        }}
      />
    </Box>
  );
 
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" textAlign="center">Asset Details</Typography>
      <TextField
        label="Search assets..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2, width: '100%' }}
      />
 
      <TableContainer component={Paper} sx={{ marginTop: '1rem', boxShadow: 3 }}>
        <Table>
        <TableHead>
  <TableRow>
    {/* <TableCell>ID {renderSortIcon('id')}</TableCell> */}
    <TableCell>Host ID {renderSortIcon('hostID')}</TableCell>
    <TableCell>Asset Type {renderSortIcon('assetType')}</TableCell>
    <TableCell>Model {renderSortIcon('model')}</TableCell>
    <TableCell>Manufacturer {renderSortIcon('manufacturer')}</TableCell>
    <TableCell>Serial Number {renderSortIcon('serialNumber')}</TableCell>
    <TableCell>Purchase Date {renderSortIcon('purchaseDate')}</TableCell>
    <TableCell>Model Number {renderSortIcon('modelNumber')}</TableCell>
    <TableCell>Manufacture Year {renderSortIcon('manufactureYear')}</TableCell>
    <TableCell>Service Code {renderSortIcon('serviceCode')}</TableCell>
    <TableCell>MAC {renderSortIcon('mac')}</TableCell>
    <TableCell>Invoice Link {renderSortIcon('invoiceLink')}</TableCell>
    <TableCell>Warranty Expiration {renderSortIcon('warrantyExpiration')}</TableCell>
    <TableCell>Cost {renderSortIcon('cost')}</TableCell>
    <TableCell>Vendor {renderSortIcon('vendor')}</TableCell>
    <TableCell>Configuration {renderSortIcon('configuration')}</TableCell>
    <TableCell>Operating System {renderSortIcon('operatingSystem')}</TableCell>
    <TableCell>Ownership {renderSortIcon('ownership')}</TableCell>
    <TableCell>Status {renderSortIcon('status')}</TableCell>
    <TableCell>Bag {renderSortIcon('bag')}</TableCell>
    <TableCell>Mouse {renderSortIcon('mouse')}</TableCell>
    <TableCell>Allocated Date {renderSortIcon('allocatedDate')}</TableCell>
    <TableCell>Returned Date {renderSortIcon('returnedDate')}</TableCell>
    <TableCell>Returned By {renderSortIcon('returnedBy')}</TableCell>
    <TableCell>Comment {renderSortIcon('comment')}</TableCell>
    <TableCell>Employee {renderSortIcon('employee')}</TableCell>
    <TableCell>Action </TableCell>
  </TableRow>
</TableHead>
 
 
<TableBody>
  {paginatedAssets.map((asset) => (
    <TableRow key={asset.hostID}>
      {/* <TableCell>{asset.id}</TableCell> */}
      <TableCell>{asset.hostID}</TableCell>
      <TableCell>{asset.assetType || 'N/A'}</TableCell>
      <TableCell>{asset.model || 'N/A'}</TableCell>
      <TableCell>{asset.manufacturer || 'N/A'}</TableCell>
      <TableCell>{asset.serialNumber || 'N/A'}</TableCell>
      <TableCell>{asset.purchaseDate || 'N/A'}</TableCell>
      <TableCell>{asset.modelNumber || 'N/A'}</TableCell>
      <TableCell>{asset.manufactureYear || 'N/A'}</TableCell>
      <TableCell>{asset.serviceCode || 'N/A'}</TableCell>
      <TableCell>{asset.mac || 'N/A'}</TableCell>
      <TableCell>{asset.invoiceLink || 'N/A'}</TableCell>
      <TableCell>{asset.warrantyExpiration || 'N/A'}</TableCell>
      <TableCell>{asset.cost || 'N/A'}</TableCell>
      <TableCell>{asset.vendor || 'N/A'}</TableCell>
      <TableCell>{asset.configuration || 'N/A'}</TableCell>
      <TableCell>{asset.operatingSystem || 'N/A'}</TableCell>
      <TableCell>{asset.ownership || 'N/A'}</TableCell>
      <TableCell>{asset.status || 'N/A'}</TableCell>
      <TableCell>{asset.bag || 'N/A'}</TableCell>
      <TableCell>{asset.mouse || 'N/A'}</TableCell>
      <TableCell>{asset.allocatedDate || 'N/A'}</TableCell>
      <TableCell>{asset.returnedDate || 'N/A'}</TableCell>
      <TableCell>{asset.returnedBy || 'N/A'}</TableCell>
      <TableCell>{asset.comment || 'N/A'}</TableCell>
      <TableCell>{asset.employee || 'N/A'}</TableCell>
 
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(asset)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <IconButton onClick={() => handleChangePage(page - 1)} disabled={page === 0}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography sx={{ alignSelf: 'center' }}>{`${page + 1} of ${Math.ceil(filteredAssets.length / rowsPerPage)}`}</Typography>
        <IconButton onClick={() => handleChangePage(page + 1)} disabled={page >= Math.ceil(filteredAssets.length / rowsPerPage) - 1}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
 
export default AuditHistory;