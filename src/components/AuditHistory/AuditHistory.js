
import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { AssetContext } from '../../context/AssetContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const AuditHistory = () => {
  const { assets, setAssets } = useContext(AssetContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleEditClick = (asset) => {
    navigate(`/edit-asset/${asset.assetID}`, { state: { asset } });
  };
  const handleDeleteLink = (link) => {
    // Delete the link from the asset's link property
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.link === link ? { ...asset, link: null } : asset
      )
    );
  };

  const handleFileDelete = (fileName, assetID) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.assetID === assetID
          ? { ...asset, uploadedFiles: asset.uploadedFiles.filter((file) => file !== fileName) }
          : asset
      )
    );
  };

  const handleDownload = (fileName) => {
    const fileUrl = `/path/to/your/files/${fileName}`;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssets = assets.filter((asset) =>
    Object.values(asset).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value === 'number') {
        return value.toString().includes(searchTerm);
      }
      return false;
    })
  );
  return (
    <><div>
      <Typography variant="h4" textAlign={'center'}>Asset Details</Typography>
      <Typography variant="h6">Assets List</Typography>
      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>

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
              <TableCell>Vendor</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>MAC</TableCell>
              <TableCell>Configuration</TableCell>
              <TableCell>Warranty Expiration Date</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Asset Type</TableCell>
              <TableCell>Service Code</TableCell>
              <TableCell>Model Number</TableCell>
              <TableCell>Manufacturer Year</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Operating System</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Ownership</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.map((asset) => (
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
                <TableCell>{asset.vendor || 'N/A'}</TableCell>
                <TableCell>{asset.model || 'N/A'}</TableCell>
                <TableCell>{asset.manufacturer || 'N/A'}</TableCell>
                <TableCell>{asset.mac || 'N/A'}</TableCell>
                <TableCell>{asset.configuration || 'N/A'}</TableCell>
                <TableCell>{asset.warrantyExpirationDate || 'N/A'}</TableCell>
                <TableCell>{asset.cost || 'N/A'}</TableCell>
                <TableCell>{asset.assetType || 'N/A'}</TableCell>
                <TableCell>{asset.serviceCode || 'N/A'}</TableCell>
                <TableCell>{asset.modelNumber || 'N/A'}</TableCell>
                <TableCell>{asset.manufacturerYear || 'N/A'}</TableCell>
                <TableCell>{asset.serialNumber || 'N/A'}</TableCell>
                <TableCell>{asset.operatingSystem || 'N/A'}</TableCell>
                <TableCell>{asset.purchaseDate || 'N/A'}</TableCell>
                <TableCell>{asset.ownership || 'N/A'}</TableCell>
                <TableCell>{asset.link ? (
                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <a href={asset.link} target="_blank" rel="noopener noreferrer">
                      Open link
                    </a>
                    <DeleteIcon
                      onClick={() => handleDeleteLink(asset.link)}
                      style={{ cursor: 'pointer', color: 'red' }}
                    />
                  </Box>
                ) : (
                  'No link'
                )} </TableCell>
                <TableCell>
                  {asset.uploadedFiles.length > 0 ? (
                    <div>
                      {asset.uploadedFiles.map((fileName, index) => (
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                          <div key={index}>
                            <Typography>{fileName}</Typography>
                            {/* <a href={`#`} target="_blank" rel="noopener noreferrer">{fileName}</a>  */}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <a
                              href={`#`}
                              download={fileName}
                              style={{ marginRight: '0.5rem' }}
                            >
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
    </>
  );
};

export default AuditHistory;
