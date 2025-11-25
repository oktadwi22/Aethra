// Smart Contract Host
const SC_HOST: `0x${string}` =
    "0x62c4F631D791653EE1676EE414E02022E529FFfe";

type MockHost = {
    addressHost: `0x${string}`,
    smartcontract: `0x${string}`
}
const mockHost: MockHost[] = [{
    addressHost: `0x${"0xdf0f7cd19c2779ce0b72b768b445ac97979a3fd9"}`,
    smartcontract: `${SC_HOST}`,
}];

// Login Model untuk Host
export async function loginHostModel(address: `0x${string}`) {
    const found = mockHost.find(h => h.addressHost.toLowerCase() === address.toLowerCase());

    if (!found) {
        return {
            success: false,
            message: "Wallet ini tidak terdaftar sebagai Host",
        };
    }

    return {
        success: true,
        addressHost: found.addressHost,
        smartcontract: found.smartcontract,
    };
}