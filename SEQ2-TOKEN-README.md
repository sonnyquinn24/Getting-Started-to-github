# SEQ2 Token Smart Contract

A comprehensive TON blockchain smart contract for the SEQ2 utility token with an initial price of $1.50 and advanced token management features.

## 🎯 Overview

The SEQ2 Token is a smart contract built for the TON (The Open Network) blockchain that implements a utility token with the following key features:

- **Initial Price**: $1.50 per SEQ2 token
- **Dynamic Pricing**: Owner/oracle can update prices
- **Standard Operations**: Mint, transfer, deposit, withdrawal
- **Access Control**: Owner and oracle management
- **Security**: Comprehensive input validation and access controls
- **Future-Proof**: Designed for price oracle integration

## 📋 Features

### Core Token Functions
- ✅ **Minting**: Owner can mint new tokens to any address
- ✅ **Transfers**: Users can transfer tokens between addresses
- ✅ **Deposits**: Users can deposit TON to buy tokens at current price
- ✅ **Withdrawals**: Users can burn tokens to withdraw TON
- ✅ **Balance Queries**: Get token balance for any address

### Management Functions
- ✅ **Price Updates**: Owner/oracle can update token price
- ✅ **Transfer Freeze**: Owner can temporarily freeze all transfers
- ✅ **Fund Withdrawal**: Owner can withdraw contract's TON balance
- ✅ **Oracle Management**: Support for external price oracle integration

### Security Features
- ✅ **Access Control**: Owner-only operations protected
- ✅ **Input Validation**: All parameters validated before processing
- ✅ **Balance Checks**: Insufficient balance protection
- ✅ **Integer Overflow Protection**: FunC type system prevents overflows
- ✅ **Reentrancy Protection**: Safe external call patterns

## 🏗️ Contract Architecture

### Storage Layout

The contract stores the following data in a structured format:

```func
storage:
  total_supply: uint64        - Total tokens in circulation
  owner_address: MsgAddress   - Contract owner address  
  price_nanoton: uint64       - Current price in nanotons
  oracle_address: MsgAddress  - Price oracle address
  balances: dict              - User token balances
  freeze_admin: int           - Transfer freeze status
```

### Constants

```func
INITIAL_PRICE_USD = 150      - $1.50 in cents
TON_USD_RATE = 200          - Assumed $2.00 per TON (configurable)
NANOTONS_PER_TON = 10^9     - Conversion factor
```

## 🔧 Operations

### 1. Minting Tokens (OP_MINT = 1)
**Access**: Owner only  
**Purpose**: Create new tokens and assign to specified address

**Parameters**:
- `to_address`: Target address for new tokens
- `amount`: Number of tokens to mint

**Example Usage**:
```
// Mint 1000 SEQ2 tokens to user address
send_message(contract_address, OP_MINT, to_address, 1000)
```

### 2. Transfer Tokens (OP_TRANSFER = 2)
**Access**: Any token holder  
**Purpose**: Transfer tokens between addresses

**Parameters**:
- `to_address`: Recipient address
- `amount`: Number of tokens to transfer

**Validation**:
- Transfers not frozen
- Sender has sufficient balance
- Amount > 0

### 3. Deposit TON (OP_DEPOSIT = 3)
**Access**: Anyone  
**Purpose**: Buy tokens by depositing TON

**Behavior**:
- Calculates tokens based on current price
- Mints tokens to sender's address
- Increases total supply

**Formula**: `tokens = (ton_amount * 10^9) / price_nanoton`

### 4. Withdraw TON (OP_WITHDRAW = 4)
**Access**: Token holders  
**Purpose**: Burn tokens to receive TON

**Parameters**:
- `token_amount`: Number of tokens to burn

**Validation**:
- Sender has sufficient tokens
- Contract has sufficient TON balance
- Reserves 0.1 TON for gas

### 5. Update Price (OP_UPDATE_PRICE = 5)
**Access**: Owner or Oracle only  
**Purpose**: Update token price

**Parameters**:
- `new_price`: New price in nanotons

**Security**: Only authorized addresses can update price

### 6. Freeze Transfers (OP_FREEZE_TRANSFERS = 6)
**Access**: Owner only  
**Purpose**: Emergency transfer freeze

**Parameters**:
- `freeze_status`: 0 = unfreeze, 1 = freeze

## 📊 Get Methods

### Query Contract State

```func
get_total_supply() -> int
// Returns total tokens in circulation

get_balance_of(slice user_address) -> int  
// Returns token balance for specific address

get_price() -> int
// Returns current price in nanotons

get_owner() -> slice
// Returns owner address

get_oracle() -> slice  
// Returns oracle address

get_freeze_status() -> int
// Returns transfer freeze status (0/1)

calculate_tokens_for_ton(int ton_amount) -> int
// Calculate tokens purchasable with given TON

calculate_ton_for_tokens(int token_amount) -> int
// Calculate TON receivable for given tokens
```

## 💰 Price Economics

### Initial Pricing
- **USD Price**: $1.50 per SEQ2 token
- **TON Exchange Rate**: $2.00 per TON (configurable)
- **Initial TON Price**: 0.75 TON per SEQ2 token
- **Nanotons**: 750,000,000 nanotons per SEQ2 token

### Price Updates
- Owner or designated oracle can update prices
- Supports integration with external price feeds
- Price changes affect future deposits/withdrawals
- Existing token balances remain unchanged

### Economics Model
```
Token Purchase: TON → SEQ2 at current price
Token Redemption: SEQ2 → TON at current price
Price Discovery: Via oracle or manual updates
```

## 🔒 Security Considerations

### Access Control
- **Owner Operations**: Minting, price updates, freezing, fund withdrawal
- **Oracle Operations**: Price updates only
- **User Operations**: Transfers, deposits, withdrawals

### Input Validation
- All amounts validated > 0
- Address format validation
- Balance sufficiency checks
- Integer overflow protection via FunC

### Economic Security
- Price update authorization
- Minimum TON reserves for gas
- Transfer freeze emergency mechanism
- Oracle manipulation resistance

### Best Practices Implemented
- Fail-safe defaults
- Clear error messages  
- Comprehensive logging via operations
- Atomic state updates

## 🚀 Deployment Guide

### Prerequisites
1. TON development tools (func, fift)
2. Wallet with sufficient TON (minimum 2 TON)
3. TestNet environment for initial testing

### Compilation
```bash
# Compile smart contract
func -o build/seq2-token.fif contracts/seq2-token.fc

# Generate deployment message
fift -s scripts/deploy.fif
```

### Testing Checklist
- [ ] Compile without errors
- [ ] Deploy to TestNet
- [ ] Test all operations
- [ ] Verify get methods
- [ ] Test error conditions
- [ ] Security audit
- [ ] Gas optimization

### MainNet Deployment
1. Complete TestNet validation
2. Security audit by experts
3. Community testing period
4. Legal compliance review
5. Deploy with ceremony
6. Verify deployment
7. Initialize operations

## 📚 Integration Examples

### Web3 Integration
```javascript
// Example integration with TON web3 library
const contract = new TonContract(contractAddress);

// Buy tokens
await contract.send({
  to: contractAddress,
  value: '1000000000', // 1 TON
  body: beginCell()
    .storeUint(3, 32) // OP_DEPOSIT
    .storeUint(0, 64) // query_id
    .endCell()
});

// Check balance
const balance = await contract.call('get_balance_of', [userAddress]);
```

### Price Oracle Integration
```javascript
// Example price update from oracle
const newPrice = await priceOracle.getPrice('SEQ2/TON');
await contract.send({
  body: beginCell()
    .storeUint(5, 32) // OP_UPDATE_PRICE
    .storeUint(0, 64) // query_id  
    .storeUint(newPrice, 64)
    .endCell()
});
```

## 🛠️ Development Scripts

### Available Commands
```bash
npm run compile-ton    # Compile smart contract
npm run test-ton       # Run contract tests
npm run deploy-ton     # Generate deployment guide
```

### File Structure
```
contracts/
  ├── seq2-token.fc           # Main smart contract
  └── imports/
      └── stdlib.fc           # Standard library
scripts/
  ├── compile.js              # Compilation script
  ├── test.js                 # Testing script
  └── deploy.js               # Deployment script
build/                        # Compiled artifacts
tests/                        # Test files
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add comprehensive tests
4. Ensure security review
5. Submit pull request

## ⚠️ Disclaimer

This smart contract is provided as-is. While security best practices have been followed, users should:

- Conduct independent security audits
- Test thoroughly on TestNet
- Understand economic implications
- Consider regulatory compliance
- Use at their own risk

## 📞 Support

For questions and support:
- GitHub Issues: [Project Issues](https://github.com/sonnyquinn24/Getting-Started-to-github/issues)
- Documentation: This README
- Code Comments: Inline in smart contract

---

**SEQ2 Token v1.0.0** - Built with ❤️ for the TON ecosystem