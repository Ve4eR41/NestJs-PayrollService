export default interface Request {
    user?: {
        email: string;
        id: number;
        roles: {
            id: number;
            value: string;
            description: string;
            createdAt: string;
            updatedAt: string;
        }[];
        iat: number;
        exp: number;
    }
}