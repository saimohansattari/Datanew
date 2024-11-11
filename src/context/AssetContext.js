
import React, { createContext, useState } from 'react';

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);

  const addAsset = (newAsset) => setAssets((prev) => [...prev, newAsset]);

  const updateAsset = (updatedAsset) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.assetID === updatedAsset.assetID ? updatedAsset : asset
      )
    );
  };
  console.log(assets)

  return (
    <AssetContext.Provider
      value={{ assets, addAsset, updateAsset, setAssets }}
    >
      {children}
    </AssetContext.Provider>
  );
};


