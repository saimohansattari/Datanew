import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
 
export const LogAsset = () => {
    const [logs, setLogs] = useState([]);
    const [filterType, setFilterType] = useState('manufacturer');
    const [filterValue, setFilterValue] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/assets/revisions/filter', {
                params: {
                    [filterType]: filterValue || null,
                    page,
                    size: pageSize,
                },
            });
 
            const data = response.data;
            console.log('API Response:', data);
            setLogs(data|| []);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setLogs([]);
        }
    };
 
   
 
    useEffect(() => {
        fetchLogs();
    }, [filterType, filterValue, page, pageSize]);
 
    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
        setFilterValue('');
        setPage(0);
    };
 
    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
        setPage(0);
    };
 
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
 
    const handlePageNumberChange = (newPage) => {
        setPage(newPage);
    };
 
    const generatePageNumbers = () => {
        const totalRecords = 50;
        const totalPages = Math.ceil(totalRecords / pageSize);
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };
 
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 5 }}>
            <Typography variant="h4" textAlign="center" marginY={3}>
                Logs History
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, width: '100%' }}>
                <FormControl fullWidth>
                    <InputLabel>Filter Type</InputLabel>
                    <Select
                        value={filterType}
                        label="Filter Type"
                        onChange={handleFilterTypeChange}
                    >
                        <MenuItem value="manufacturer">Manufacturer</MenuItem>
                        <MenuItem value="assetType">Asset Type</MenuItem>
                        <MenuItem value="status">Status</MenuItem>
                        <MenuItem value="operatingSystem">Operating System</MenuItem>
                        <MenuItem value="configuration">Configuration</MenuItem>
                        <MenuItem value="vendor">Vendor</MenuItem>
                        <MenuItem value="hostID">Host ID</MenuItem>
                        <MenuItem value="revisionType">Action</MenuItem>
                        <MenuItem value="model">Modal</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label={`Search by ${filterType}`}
                    variant="outlined"
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    fullWidth
                />
            </Box>
 
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Log ID</TableCell>
                            <TableCell>Action Type</TableCell>
                            <TableCell>Host ID</TableCell>
                            <TableCell>Vendor</TableCell>
                            <TableCell>Asset Type</TableCell>
                            <TableCell>Manufacturer</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.length > 0 ? (
                            logs.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell>{log.revision?.id || 'N/A'}</TableCell>
                                    <TableCell>{log.revisionType || 'N/A'}</TableCell>
                                    <TableCell>{log.entity?.hostID || 'N/A'}</TableCell>
                                    <TableCell>{log.entity?.vendor || 'N/A'}</TableCell>
                                    <TableCell>{log.entity?.assetType || 'N/A'}</TableCell>
                                    <TableCell>{log.entity?.manufacturer || 'N/A'}</TableCell>
                                    <TableCell>{log.entity?.status || 'N/A'}</TableCell>
                                    <TableCell>{log.revision?.timestamp ? new Date(log.revision.timestamp).toLocaleString() : 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No logs available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    <ChevronLeftIcon />
                </IconButton>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {generatePageNumbers().map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            variant={page === pageNumber ? 'contained' : 'outlined'}
                            onClick={() => handlePageNumberChange(pageNumber)}
                        >
                            {pageNumber + 1}
                        </Button>
                    ))}
                </Box>
 
                <IconButton onClick={() => handlePageChange(page + 1)}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
 