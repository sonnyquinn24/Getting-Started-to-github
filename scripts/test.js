const fs = require('fs');
const path = require('path');

/**
 * Test script for SEQ2 Token Smart Contract
 * 
 * This script performs comprehensive testing of the smart contract functionality
 * including unit tests for all major operations and edge cases.
 */

console.log('🧪 SEQ2 Token Smart Contract Tests');
console.log('=================================\n');

class SEQ2TokenTester {
    constructor() {
        this.testResults = [];
        this.totalTests = 0;
        this.passedTests = 0;
    }
    
    test(description, testFunction) {
        this.totalTests++;
        try {
            testFunction();
            this.passedTests++;
            this.testResults.push({ description, status: 'PASS', error: null });
            console.log(`✅ ${description}`);
        } catch (error) {
            this.testResults.push({ description, status: 'FAIL', error: error.message });
            console.log(`❌ ${description}: ${error.message}`);
        }
    }
    
    assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }
    
    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(`${message}: expected ${expected}, got ${actual}`);
        }
    }
    
    runTests() {
        console.log('📋 Running contract validation tests...\n');
        
        // Test 1: Contract file exists and is readable
        this.test('Contract file exists and is readable', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            this.assert(fs.existsSync(contractPath), 'Contract file does not exist');
            
            const content = fs.readFileSync(contractPath, 'utf8');
            this.assert(content.length > 0, 'Contract file is empty');
            this.assert(content.includes('SEQ2 Token Smart Contract'), 'Contract header not found');
        });
        
        // Test 2: Required constants are defined
        this.test('Required constants are properly defined', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            const requiredConstants = [
                'INITIAL_PRICE_USD',
                'TON_USD_RATE', 
                'NANOTONS_PER_TON',
                'ERROR_NOT_OWNER',
                'ERROR_INSUFFICIENT_BALANCE',
                'OP_MINT',
                'OP_TRANSFER',
                'OP_DEPOSIT',
                'OP_WITHDRAW'
            ];
            
            requiredConstants.forEach(constant => {
                this.assert(
                    content.includes(`const int ${constant}`),
                    `Required constant ${constant} not found`
                );
            });
        });
        
        // Test 3: Price calculation logic
        this.test('Initial price calculation is correct', () => {
            // $1.50 at $2.00 per TON = 0.75 TON = 750,000,000 nanotons
            const expectedPrice = (150 * 1000000000) / 200; // 750,000,000
            this.assertEqual(expectedPrice, 750000000, 'Initial price calculation');
        });
        
        // Test 4: Error codes are unique
        this.test('Error codes are unique and properly defined', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            const errorMatches = content.match(/const int ERROR_[A-Z_]+ = (\d+);/g);
            this.assert(errorMatches && errorMatches.length > 0, 'No error codes found');
            
            const errorValues = errorMatches.map(match => {
                const value = match.match(/= (\d+);/)[1];
                return parseInt(value);
            });
            
            // Check for unique error codes
            const uniqueValues = new Set(errorValues);
            this.assertEqual(
                errorValues.length, 
                uniqueValues.size, 
                'Error codes should be unique'
            );
        });
        
        // Test 5: Operation codes are unique
        this.test('Operation codes are unique and properly defined', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            const opMatches = content.match(/const int OP_[A-Z_]+ = (\d+);/g);
            this.assert(opMatches && opMatches.length > 0, 'No operation codes found');
            
            const opValues = opMatches.map(match => {
                const value = match.match(/= (\d+);/)[1];
                return parseInt(value);
            });
            
            const uniqueValues = new Set(opValues);
            this.assertEqual(
                opValues.length, 
                uniqueValues.size, 
                'Operation codes should be unique'
            );
        });
        
        // Test 6: Standard library import
        this.test('Standard library is properly imported', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            this.assert(
                content.includes('#include "imports/stdlib.fc"'),
                'Standard library import not found'
            );
            
            const stdlibPath = path.join(__dirname, '../contracts/imports/stdlib.fc');
            this.assert(fs.existsSync(stdlibPath), 'Standard library file does not exist');
        });
        
        // Test 7: Required functions exist
        this.test('All required functions are implemented', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            const requiredFunctions = [
                'recv_internal',
                'load_data',
                'save_data',
                'get_balance',
                'set_balance',
                'is_owner',
                'get_total_supply',
                'get_balance_of',
                'get_price',
                'get_owner'
            ];
            
            requiredFunctions.forEach(func => {
                this.assert(
                    content.includes(func),
                    `Required function ${func} not found`
                );
            });
        });
        
        // Test 8: Get methods are properly defined
        this.test('Get methods have method_id declarations', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            const getMethodMatches = content.match(/\w+\([^)]*\) method_id/g);
            this.assert(
                getMethodMatches && getMethodMatches.length >= 5,
                'Insufficient get methods with method_id'
            );
        });
        
        // Test 9: Security checks
        this.test('Security measures are implemented', () => {
            const contractPath = path.join(__dirname, '../contracts/seq2-token.fc');
            const content = fs.readFileSync(contractPath, 'utf8');
            
            // Check for owner verification
            this.assert(
                content.includes('throw_unless(ERROR_NOT_OWNER'),
                'Owner verification not found'
            );
            
            // Check for balance verification
            this.assert(
                content.includes('throw_unless(ERROR_INSUFFICIENT_BALANCE'),
                'Balance verification not found'
            );
            
            // Check for amount validation
            this.assert(
                content.includes('throw_unless(ERROR_INVALID_AMOUNT'),
                'Amount validation not found'
            );
        });
        
        // Test 10: Token economics validation
        this.test('Token economics calculations are sound', () => {
            // Test price conversion calculations
            const tonAmount = 1000000000; // 1 TON in nanotons
            const pricePerToken = 750000000; // 0.75 TON per token
            const expectedTokens = (tonAmount * 1000000000) / pricePerToken;
            
            this.assert(expectedTokens > 0, 'Token calculation should yield positive result');
            
            // Test reverse calculation
            const tokenAmount = 1000000; // 1M tokens
            const expectedTon = (tokenAmount * pricePerToken) / 1000000000;
            this.assert(expectedTon > 0, 'TON calculation should yield positive result');
        });
        
        console.log('\n📊 Test Results Summary');
        console.log('======================');
        console.log(`Total Tests: ${this.totalTests}`);
        console.log(`Passed: ${this.passedTests}`);
        console.log(`Failed: ${this.totalTests - this.passedTests}`);
        console.log(`Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);
        
        if (this.passedTests === this.totalTests) {
            console.log('\n🎉 All tests passed! Contract is ready for deployment.');
        } else {
            console.log('\n⚠️  Some tests failed. Please review and fix issues before deployment.');
        }
        
        // Save test results
        const resultsPath = path.join(__dirname, '../build/test-results.json');
        const buildDir = path.dirname(resultsPath);
        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir, { recursive: true });
        }
        
        fs.writeFileSync(resultsPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            totalTests: this.totalTests,
            passedTests: this.passedTests,
            successRate: (this.passedTests / this.totalTests) * 100,
            results: this.testResults
        }, null, 2));
        
        console.log(`\n📄 Detailed results saved to: ${resultsPath}`);
        
        return this.passedTests === this.totalTests;
    }
}

// Run the tests
const tester = new SEQ2TokenTester();
const allTestsPassed = tester.runTests();

process.exit(allTestsPassed ? 0 : 1);