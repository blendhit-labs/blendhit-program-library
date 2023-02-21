use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

// Program entrypoint
fn process_instruction(
    program_id: &Pubkey, // Public key of the program account
    accounts: &[AccountInfo], // Accounts passed to the program
    _instruction_data: &[u8], // Instruction data passed to the program
) -> ProgramResult {

    // Iterate through the accounts passed to the program
    let accounts_iter = &mut accounts.iter();
    let user_account_info = next_account_info(accounts_iter)?;

    // Check that the user account is owned by the program
    if user_account_info.owner != program_id {
        msg!("User account does not have the correct program ID");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Get the public key passed by the user
    let user_pubkey_info = next_account_info(accounts_iter)?;
    let user_pubkey = user_pubkey_info.key;

    // Store the user's public key in the user account
    msg!("Storing user public key: {:?}", user_pubkey);
    user_account_info.data.borrow_mut()[0..32].copy_from_slice(user_pubkey.as_ref());

    Ok(())
}
