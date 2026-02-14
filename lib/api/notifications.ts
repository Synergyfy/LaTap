
export const sendVerificationEmail = async (email: string, name: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[Mock Email Service] Sending verification email to ${email} for user ${name}`);
    return true;
};
