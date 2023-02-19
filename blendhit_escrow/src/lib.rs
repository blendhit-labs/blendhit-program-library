use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    //program_error::ProgramError,
};

entrypoint!(process_instruction);

fn process_instruction(_program_id: &Pubkey, accounts: &[AccountInfo], _instruction_data: &[u8]) -> ProgramResult {
    // Ensure that there is only one account being passed to the program
    let accounts_iter = &mut accounts.iter();
    let caller_info = next_account_info(accounts_iter)?;

    // Get the public key of the caller
    let caller_key = caller_info.key;

    // Log the caller's public key
    msg!("Caller's pubkey: {}", caller_key);

    Ok(())
}