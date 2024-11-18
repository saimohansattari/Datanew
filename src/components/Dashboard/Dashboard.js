import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
 
 
const Dashboard = () => {
  const [assetData, setAssetData] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:8080/api/assets?status.equals")
      .then((response) => response.json())
      .then((data) => setAssetData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
 
  console.log(assetData)
  const totalAssestCount =assetData.length;
  console.log(totalAssestCount)
 
  const availableAssetsCount = assetData.filter(assests=> assests.status=== "AVAILABLE").length
  console.log(availableAssetsCount)
 
  const allocatedAssetsCount = assetData.filter(assests => assests.status === "ALLOCATED").length
  console.log(allocatedAssetsCount)
 
  const disposedAssetsCount = assetData.filter(assests=>assests.status ==="DISPOSED").length
  console.log(disposedAssetsCount)
 
  const data = [
    {
      name: 'Total Assets',
      count: totalAssestCount,
      color: '#bbdefb', // Light blue
    },
    {
      name: 'Available Assets',
      count: availableAssetsCount,
      color: '#c8e6c9', // Light green
    },
    {
      name: 'Allocated Assets',
      count: allocatedAssetsCount,
      color: '#ffe0b2', // Light orange
    },
    {
      name: 'Disposed Assets',
      count: disposedAssetsCount,
      color: '#b4b4b4', // Light orange
    },
  ];
 
  const chartData = [
    { name: 'Available Assets', value: availableAssetsCount },
    { name: 'Allocated Assets', value: allocatedAssetsCount },
    { name: 'Disposed Assets', value: disposedAssetsCount },
  ];
 
  const COLORS = ['#1b5e20', '#ff6f00'];
 
  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Asset Overview
      </Typography>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={8} sm={3} key={item.name}>
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
            <text x={300} y={30} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Asset Distribution
            </text>
            <Pie
              data={chartData}
              cx={300} // Center x position
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