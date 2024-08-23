'use server';

import { clientConfig, serverConfig } from '@/config';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { getUserById } from './userActions';

export const getAuthenticatedUser = async () => {
    const tokens = await getTokens(cookies(), {
        apiKey: clientConfig.apiKey,
        cookieName: serverConfig.cookieName,
        cookieSignatureKeys: serverConfig.cookieSignatureKeys,
        serviceAccount: serverConfig.serviceAccount,
    })
    
    const user = await getUserById(tokens?.decodedToken.uid!);

    return user;
}