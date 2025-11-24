// SPDX-License-Identifier: MIT
// DeEnergyEVM Smart Contract
pragma solidity ^0.8.20;

contract DeEnergyEVM {

    // Host / Owner Address
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Modifier hanya untuk host
    modifier onlyHost() {
        require(msg.sender == owner, "Only host can call this");
        _;
    }

    // Struktur User
    struct User {
        uint256 userId;
        bool exists;
    }

    // Mapping wallet → user
    mapping(uint256 => User) public users;

    // Counter userId
    uint256 public userCounter = 1;

    // Struktur pembelian kWh
    struct Purchase {
        uint256 kwhValue;
        bool active;
    }

    // Daftar token per user
    mapping(uint256 => uint256[]) public userTokens;

    // Mapping userId → tokenUnique → Purchase data
    mapping(uint256 => mapping(uint256 => Purchase)) public purchases;


    // -----------------------------------------------------------------
    // Host mendaftarkan user → return userId unik
    // -----------------------------------------------------------------
    function registerUser()
        external
        onlyHost
        returns(uint256)
    {
        require(userCounter <= 8, "maximum register user reached");
        // Jika user sudah terdaftar → balikan userId yang sama
        if (users[userCounter].exists) {
            return users[userCounter].userId;
        }

        // Buat user baru
        users[userCounter] = User({
            userId: userCounter,
            exists: true
        });

        userCounter++;
        return users[userCounter].userId;
    }


    // -----------------------------------------------------------------
    // Backend memasukkan transaksi pembelian kWh
    // purchaseKwh(userId, tokenUnique, kwhValue)
    // -----------------------------------------------------------------
    function purchaseKwh(
        uint256 userId,
        uint256 tokenUnique,
        uint256 kwhValue
    )
        external payable 
        onlyHost
    {
        purchases[userId][tokenUnique] = Purchase({
            kwhValue: kwhValue,
            active: true
        });

        // SIMPAN ke daftar token untuk user
        userTokens[userId].push(tokenUnique);
    }


    // -----------------------------------------------------------------
    // IoT membaca nilai akun kWh jika masih aktif
    // Akan return nilai kWh
    // -----------------------------------------------------------------
   function consumeKwh(
        uint256 userId
    )
        external
        view
        returns(uint256)
    {
        uint256[] memory tokens = userTokens[userId];

        // cari token terbaru yang masih aktif
        for (uint256 i = tokens.length; i > 0; i--) {
            Purchase memory p = purchases[userId][tokens[i-1]];
            if (p.active) {
                return p.kwhValue;
            }
        }

        revert("No active token found");
    }


    // -----------------------------------------------------------------
    // IoT menandai token sudah digunakan agar tidak bisa dipakai ulang
    // -----------------------------------------------------------------
    function markUsed(
        uint256 userId,
        uint256 tokenUnique
    )
        external
        onlyHost
    {
        Purchase storage p = purchases[userId][tokenUnique];
        require(p.active == true, "Already used");

        p.active = false;
    }
}
