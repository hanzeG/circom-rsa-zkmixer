const { prime, modInv, modPow } = require('bigint-crypto-utils');

// RSA class for const exp = 65537
class RSA_65537 {
    constructor(p, q, bitLength) {
        // TODO: security check
        this.bitLength = bitLength; // Security length
        this.p = p; // First prime factor
        this.q = q; // Second prime factor
        this.exp = 65537n; // Exponent
        this.N = p * q; // Modulus
        this.phiN = (p - 1n) * (q - 1n); // Euler's totient function
        this.inv = modInv(this.exp, this.phiN); // The modular inverse of exp
        // console.debug(`Initialized RSA: p=${this.p}, q=${this.q}, exp=${this.exp}, N=${this.N}`);
    }

    // Given a message m, output the ciphertext c
    encrypt(m) {
        // console.debug(`Message: m=${m}`);
        const c = modPow(m, this.exp, this.N);
        // console.debug(`Ciphertext: c=${c}`);
        return c;
    }

    // Given a ciphertext c, calculate the plaintext p
    decrypt(c) {
        // console.debug(`Ciphertext c=${c}`);
        const m = modPow(c, this.inv, this.N);
        // console.debug(`Plaintext: m=${m}`);
        return m;
    }

    // Static method to initialize the RSA with random parameters
    static async initialize(bitLength) {
        // console.debug(`Initializing RSA with bit lengths: p, q=${bitLength}`);
        const p = await prime(bitLength); // Generate a random prime for p
        const q = await prime(bitLength); // Generate a random prime for q
        // console.debug(`Generated parameters: p=${p}, q=${q}`);
        return new RSA_65537(p, q, bitLength);
    }
}

module.exports = {
    RSA_65537
}
