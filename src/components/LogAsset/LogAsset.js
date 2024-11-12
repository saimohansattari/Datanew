import React, { useContext, useState } from 'react';
import { AssetContext } from '../../context/AssetContext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const LogAsset = () => {
    const { logs } = useContext(AssetContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedLogs = [...logs].sort((a, b) => {
        const { key, direction } = sortConfig;
        const order = direction === 'asc' ? 1 : -1;

        const getValue = (item) => {
            if (key === 'timestamp' || key === 'action') {
                return item[key];
            } else {
                return item.details[key] || '';
            }
        };

        const valueA = getValue(a);
        const valueB = getValue(b);

        if (valueA < valueB) return -order;
        if (valueA > valueB) return order;
        return 0;
    });

    const filteredLogs = sortedLogs.filter((log) => {

        const { assetID, assetType, employeeId, employeeName, employeeEmail, status, manufacturer } = log.details;
        const query = searchQuery.toLowerCase();
    
        return (
          (log.action && String(log.action).toLowerCase().includes(query)) ||
          (assetID && String(assetID).toLowerCase().includes(query)) ||
          (assetType && String(assetType).toLowerCase().includes(query)) ||
          (employeeName && String(employeeName).toLowerCase().includes(query)) ||
          (employeeEmail && String(employeeEmail).toLowerCase().includes(query)) ||
          (employeeId && String(employeeId).toLowerCase().includes(query)) ||
          (status && String(status).toLowerCase().includes(query)) ||
          (manufacturer && String(manufacturer).toLowerCase().includes(query))
        );
    });

    const paginatedLogs = filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderSortIcon = (key) => (
        <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: 4 }}>
            <ArrowDropUpIcon
                onClick={() => handleSort(key)}
                sx={{ cursor: 'pointer', color: sortConfig.key === key && sortConfig.direction === 'asc' ? 'primary.main' : 'inherit' }}
            />
            <ArrowDropDownIcon
                onClick={() => handleSort(key)}
                sx={{ cursor: 'pointer', color: sortConfig.key === key && sortConfig.direction === 'desc' ? 'primary.main' : 'inherit' }}
            />
        </span>
    );

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 5 }}>
            <Typography variant="h4" textAlign="center" marginY={3}>Logs History</Typography>
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
                fullWidth
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Timestamp {renderSortIcon('timestamp')}</TableCell>
                            <TableCell>Action {renderSortIcon('action')}</TableCell>
                            <TableCell>Asset ID {renderSortIcon('assetID')}</TableCell>
                            <TableCell>Asset Type {renderSortIcon('assetType')}</TableCell>
                            <TableCell>Employee ID {renderSortIcon('employeeId')}</TableCell>
                            <TableCell>Employee Name {renderSortIcon('employeeName')}</TableCell>
                            <TableCell>Employee Email {renderSortIcon('employeeEmail')}</TableCell>
                            <TableCell>Status {renderSortIcon('status')}</TableCell>
                            <TableCell>Manufacturer {renderSortIcon('manufacturer')}</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedLogs.length > 0 ? (
                            paginatedLogs.map((log, index) => {
                                const { assetID, assetType, employeeId, employeeName, employeeEmail, status, manufacturer } = log.details;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{log.timestamp}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>{assetID}</TableCell>
                                        <TableCell>{assetType}</TableCell>
                                        <TableCell>{employeeId || 'N/A'}</TableCell>
                                        <TableCell>{employeeName || 'N/A'}</TableCell>
                                        <TableCell>{employeeEmail || 'N/A'}</TableCell>
                                        <TableCell>{status || 'N/A'}</TableCell>
                                        <TableCell>{manufacturer || 'N/A'}</TableCell>
                                        <TableCell><Button>Edit</Button></TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10}>No logs available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', alignItems: 'center',marginY:2 }}>
            <IconButton 
                onClick={(event) => handleChangePage(event, page - 1)} 
                disabled={page === 0}
            >
                <ChevronLeftIcon />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'center',flexDirection:'row',gap:2}}>
                {pageNumbers.map((number) => (
                    <Button
                        key={number}
                        onClick={() => handleChangePage(null, number)}
                        variant={page === number ? 'contained' : 'outlined'}
                        sx={{padding:'0px'}}
                    >
                        {number + 1}
                    </Button>
                ))}
            </Box>
            {/* <Typography variant="body2" sx={{ marginX: 2 ,display:'flex'}}>
                Page {page + 1} of {totalPages}
            </Typography> */}
            <IconButton 
                onClick={(event) => handleChangePage(event, page + 1)} 
                disabled={page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1}
            >
                <ChevronRightIcon />
            </IconButton>
        </Box>
        </Box>
    );
};
