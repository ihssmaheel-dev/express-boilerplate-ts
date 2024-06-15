import { hashingConfig } from "../config/config";

class AESGCM {
    static ALGORITHM: string = "AES-GCM";
    static HASH: string = "SHA-256";
    static KEY_SIZE: number = 256;
    static ITERATION_COUNT: number = 100000;

    private textEncoder: TextEncoder;
    private textDecoder: TextDecoder;

    constructor() {
        this.textEncoder = new TextEncoder();
        this.textDecoder = new TextDecoder();
    }

    async generateKeyMaterial(): Promise<CryptoKey> {
        return crypto.subtle.importKey(
            "raw",
            this.textEncoder.encode(hashingConfig.hashing_key),
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
        );
    }

    async generateKey(keyMaterial: CryptoKey, salt: Uint8Array): Promise<CryptoKey> {
        const algorithm: string = AESGCM.ALGORITHM;
        const hash: string = AESGCM.HASH;
        const iterationCount: number = AESGCM.ITERATION_COUNT;
        const keySize: number = AESGCM.KEY_SIZE;

        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt,
                iterations: iterationCount,
                hash: hash
            },
            keyMaterial,
            { 
                name: algorithm,
                length: keySize 
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    async encrypt(plaintext: string): Promise<string> {
        const data: Uint8Array = this.textEncoder.encode(plaintext);
        const salt: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
        const keyMaterial: CryptoKey = await this.generateKeyMaterial();
        const key: CryptoKey = await this.generateKey(keyMaterial, salt);
        const algorithm: string = AESGCM.ALGORITHM;
        const iv: Uint8Array = crypto.getRandomValues(new Uint8Array(12));
        const encryptedData: ArrayBuffer = await crypto.subtle.encrypt(
            {
                name: algorithm,
                iv
            },
            key,
            data
        );

        const ciphertextBase64: string = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
        const ivBase64: string = btoa(String.fromCharCode(...iv));
        const saltBase64: string = btoa(String.fromCharCode(...salt));

        return ciphertextBase64 + ":" + ivBase64 + ":" + saltBase64;
    }

    async decrypt(encryptedData: string): Promise<string> {
        const [ciphertextStr, ivStr, saltStr]: string[] = encryptedData.split(":");
        const ciphertext: Uint8Array = new Uint8Array(Array.from(atob(ciphertextStr), c => c.charCodeAt(0)));
        const iv: Uint8Array = new Uint8Array(Array.from(atob(ivStr), c => c.charCodeAt(0)));
        const salt: Uint8Array = new Uint8Array(Array.from(atob(saltStr), c => c.charCodeAt(0)));
        const algorithm: string = AESGCM.ALGORITHM;
        const keyMaterial: CryptoKey = await this.generateKeyMaterial();
        const key: CryptoKey = await this.generateKey(keyMaterial, salt)

        const decryptedData: ArrayBuffer = await crypto.subtle.decrypt(
            {
                name: algorithm,
                iv
            },
            key,
            ciphertext
        );

        return this.textDecoder.decode(decryptedData);
    }
}

export default AESGCM;
