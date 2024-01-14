/**
 * Copyright Clave - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import '@matterlabs/hardhat-zksync-toolbox';
import '@nomicfoundation/hardhat-ethers';
import '@typechain/hardhat';
import dotenv from 'dotenv';
import type { HardhatUserConfig } from 'hardhat/config';
import type { NetworkUserConfig } from 'hardhat/types';

dotenv.config();

// dynamically changes endpoints for local tests
const zkSyncTestnet: NetworkUserConfig =
    process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'snapshot'
        ? {
              url: 'http://127.0.0.1:8011',
              ethNetwork: 'http://127.0.0.1:8545',
              zksync: true,
          }
        : {
              url: 'https://sepolia.era.zksync.dev/',
              ethNetwork: 'sepolia',
              zksync: true,
              // contract verification endpoint
              verifyURL:
                  'https://explorer.sepolia.era.zksync.dev/contract_verification',
              chainId: 300,
          };

const config: HardhatUserConfig = {
    zksolc: {
        version: '1.3.19',
        settings: {
            isSystem: true,
            optimizer: {
                fallbackToOptimizingForSize: false,
            },
        },
    },
    defaultNetwork: 'zkSyncTestnet',
    networks: {
        hardhat: {
            zksync: false,
        },
        zkSyncTestnet,
    },
    solidity: {
        compilers: [{ version: '0.8.17' }],
        // using different compiler version for separate contracts
        // overrides: {
        //     'contracts/path/contract.sol': {
        //         version: '0.8.21',
        //         settings: {},
        //     },
        // },
    },
    paths: {
        //comment this line when running scripts or compiling, uncomment when writing code
        //root: './apps/clave-contracts',
    },
};

export default config;