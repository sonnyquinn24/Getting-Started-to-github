# Ethereum Signature Verification

This script demonstrates how to verify an Ethereum signature using ethers.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the verification script:
```bash
npm run verify
```

Or directly with Node.js:
```bash
node verify.js
```

## What it does

The script:
- Takes a message ("verify")
- Uses a provided signature
- Recovers the address that signed the message
- Compares it with the expected address

## Example Output

```
Recovered address: 0xe25Cf05796a5c74C295CD7675BDA71f6D3BA39f2
Matches expected: false
```

The recovered address shows which Ethereum address actually signed the message "verify" with the given signature.