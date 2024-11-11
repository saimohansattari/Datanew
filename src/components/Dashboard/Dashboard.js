import React, { useContext } from 'react';
import { AssetContext } from '../../context/AssetContext';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const Dashboard = () => {
  const { availableAssets, allocatedAssets } = useContext(AssetContext);
  const data = [
    {
      name: 'Total Assets',
      count: availableAssets?.length + allocatedAssets?.length || 0,
      color: '#bbdefb', // Light blue
    },
    {
      name: 'Available Assets',
      count: availableAssets?.length || 0,
      color: '#c8e6c9', // Light green
    },
    {
      name: 'Allocated Assets',
      count: allocatedAssets?.length || 0,
      color: '#ffe0b2', // Light orange
    },
  ];

  const chartData = [
    { name: 'Available Assets', value: availableAssets?.length || 0 },
    { name: 'Allocated Assets', value: allocatedAssets?.length || 0 },
  ];

  const COLORS = ['#1b5e20', '#ff6f00'];

  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Asset Overview
      </Typography>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={4} key={item.name}>
            <Card sx={{ backgroundColor: item.color }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" component="div">
                  {item.name}
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {item.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} marginTop={5} >
        <Grid item xs={12} sm={8} border={'1px solid #e0e0e0'}>
          <PieChart width={400} height={300}>
            <text x={200} y={30} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Asset Distribution
            </text>
            <Pie
              data={chartData}
              cx={200} // Center x position
              cy={200} // Center y position
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '5px' }}
              itemStyle={{ color: '#333' }}
              cursor={{ fill: 'transparent' }}
            />
          </PieChart>
          <Box display="flex" justifyContent="space-between" flexDirection="row" alignItems="flex-start" gap={10} padding={3}>
            {chartData.map((entry, index) => (
              <Box key={index} display="flex" alignItems="center" marginBottom={1}>
                <Box
                  width={16}
                  height={16}
                  bgcolor={COLORS[index % COLORS.length]}
                  borderRadius="50%"
                  marginRight={1}
                />
                <Typography variant="body1">{entry.name}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

      </Grid>

    </Box>
  );
};

export default Dashboard;