const { PublicKey, Transaction, sendAndConfirmTransaction,Keypair,Connection,LAMPORTS_PER_SOL } = require('@solana/web3.js');
const open = require('open');

// Replace these values with your program ID and the URL of your Solana node
const PROGRAM_ID = 'Gp8jGWmHozwDpX3g1PQ6TTPazTAx3vddvQ8jxB5uKaED';
const NODE_URL = 'https://api.devnet.solana.com';

let secretKey = Uint8Array.from([
  202, 171, 192, 129, 150, 189, 204, 241, 142, 71, 205, 2, 81, 97, 2, 176, 48,
  81, 45, 1, 96, 138, 220, 132, 231, 131, 120, 77, 66, 40, 97, 172, 91, 245, 84,
  221, 157, 190, 9, 145, 176, 130, 25, 43, 72, 107, 190, 229, 75, 88, 191, 136,
  7, 167, 109, 91, 170, 164, 186, 15, 142, 36, 12, 23,
]);

let keypair = Keypair.fromSecretKey(secretKey);

open('https://www.codexworld.com', '_blank');

// Convert the Uint8Array to a hexadecimal string

async function main() {

  console.log(keypair)


  // Connect to the Solana network
  const connection = new Connection(NODE_URL, "confirmed");

  let balance = await connection.getBalance(keypair.publicKey);
  console.log(`${balance / LAMPORTS_PER_SOL} SOL`);

  if(balance < 2)
  {
    let txhash = await connection.requestAirdrop(keypair.publicKey, 2e9);
    console.log(`txhash: ${txhash}`);
  }

  // Get the recent blockhash
  const { blockhash } = await connection.getRecentBlockhash();
  console.log(`Recent blockhash: ${blockhash}`);

  // Get the public key of the account that will call the program
  const callerPublicKey =keypair.publicKey;

  // Get the program account public key
  const programPublicKey = new PublicKey(PROGRAM_ID);

  // Create a new transaction
  const transaction = new Transaction();

  transaction.recentBlockhash = blockhash;

  // Add the program instruction to the transaction
  transaction.add({
    keys: [
      {pubkey: callerPublicKey, isSigner: true, isWritable: false},
    ],
    programId: programPublicKey,
    data: Buffer.from([]),
  });

  // Sign the transaction
  transaction.sign(keypair);

  // Send the transaction and wait for confirmation
  console.log("wait 1 second");
  const signature = await sendAndConfirmTransaction(connection,transaction,[keypair]);
  console.log(`Transaction confirmed. Signature: ${signature}`);
  open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
