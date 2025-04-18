import {jwtDecode} from 'jwt-decode';

export interface TokenPayload {
    id: string;
    username?: string;
    email?: string;
    role_id: string;
}

export function getUserIdFromToken(token: string): string | null {
    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.id;
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
}

export function getTokenPayload(token: string): TokenPayload | null {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
}