import React, { createContext, useState } from 'react';
 
export const AssetContext = createContext();
 
export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [logs,setLogs]=useState([]);
 
  const addLogs=(action,asset)=>{
    const timestamp=new Date().toLocaleString();
    const newLogs={
      timestamp,
      action,
      details:{...asset}
    }
    setLogs((prevLogs)=>[...prevLogs,newLogs])
  }
 
 
  const addAsset = (newAsset) =>
  {
    setAssets((prev) => [...prev, newAsset]);
    addLogs('CREATED',newAsset);
  }
 
  const updateAsset = (updatedAsset) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.assetID === updatedAsset.assetID ? updatedAsset : asset
      )
    );
    addLogs('UPDATED',updatedAsset);
  };
  console.log(assets)
 
  return (
    <AssetContext.Provider
      value={{ assets, addAsset, updateAsset, setAssets,logs }}
    >
      {children}
    </AssetContext.Provider>
  );
};
 