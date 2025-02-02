# Implementation of "Stealth Address"-based Mixer

Privacy remains a fundamental challenge in public blockchain ecosystems. On platforms like Ethereum, transaction data is inherently transparent, allowing for unrestricted access and analysis. While zero-knowledge proof (ZKP) technologies have given rise to privacy-preserving protocols, such as ZKP mixers, these solutions have been limited to transactions between addresses within the same entity and typically support only a narrow range of assets. For example, Tornado Cash (TC), which was sanctioned in 2022, primarily facilitated privacy-preserving transfers of native tokens and popular ERC-20 tokens.

This work introduces an approach leveraging ["stealth addresses"](https://vitalik.eth.limo/general/2023/01/20/stealth.html) to enable privacy-preserving transactions involving cross-entity transfers and flexible assets. This repository provides an implementation of a Zero-Knowledge Proof for the mixing service using RSA-based Public Key Encryption (PKE) algorithms in the [Circom](https://docs.circom.io) language. The system, referred to as SAM, allows for direct transfers to globally public addresses, ensuring complete privacy for the recipient's address. By expanding the anonymous set beyond deposit addresses and removing constraints on fixed-asset denominations, the proposed solution enhances privacy while improving the usability of ZKP-based mixers.

# Getting started

To run the circuit test cases:

```sh
git submodule update --init --recursive
```
```sh
cd circomlib; npm i;
```

Download Circom: follow the instructions at installing [Circom](https://docs.circom.io/getting-started/installation/).

To test all circuits and generate input files for test circuits:

```sh
npm run test;
```

Run benchmark script to generate zkp with Groth16:

Download the required [ptau files](https://github.com/iden3/snarkjs) for the setup, specifically `pot13_final.ptau`, and place it in the `.ptau` directory.  

```sh
bash run_groth16.sh;
```

This repository utilizes [blockchain_ZKPs](https://github.com/badblood8/blockchain_ZKPs), a Circom library for primality testing algorithms, and [circom-ecdsa](https://github.com/0xPARC/circom-ecdsa), which provides circuit templates for modular exponentiation of large integers with fixed exponent sizes (non-input signals), among other functionalities.  

## Circuits Benchmark

* MacBook (Apple M1 Pro, 16 GB memory, 10-core CPU)
<!-- * Proof system: Groth16 -->

| Test Case               | Template Instances | Non-linear Constraints | Linear Constraints | Public Inputs | Private Inputs           | Public Outputs | Wires     | Labels    |
| ----------------------- | ------------------ | ---------------------- | ------------------ | ------------- | ------------------------ | -------------- | --------- | --------- |
| spend.circom            | 101                | 6,147,001              | 1                  | 0             | 143                      | 1              | 6,105,363 | 6,760,823 |
|                         |
| verify_wtns.circom      | 24                 | 6,118,977              | 1                  | 0             | 97                       | 1              | 6,077,315 | 6,722,533 |
|                         |
| pow_mod_1024_64.circom  | 22                 | 1,533,729              | 0                  | 0             | 33                       | 16             | 1,523,138 | 1,685,955 |
|                         |
| pow_mod_1024_128.circom | 23                 | 3,067,489              | 0                  | 0             | 33                       | 16             | 3,046,274 | 3,371,843 |
|                         |
| pow_mod_2048_64.circom  | 22                 | 3,059,457              | 0                  | 0             | 65                       | 32             | 3,038,658 | 3,361,283 |
|                         |
| pow_mod_2048_128.circom | 23                 | 6,118,977              | 0                  | 0             | 65                       | 32             | 6,077,314 | 6,722,435 |
|                         |
| primality.circom        | 3                  | 6,414                  | 0                  | 6             | 2 (1 belongs to witness) | 1              | 6,382     | 26,095    |

