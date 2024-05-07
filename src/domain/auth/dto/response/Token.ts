

export class Token{

    private accessToken: string;
    private refreshToken: string;

    constructor(accessToken: string, refreshToken: string){
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
    }

    public static of(accessToken: string, refreshToken: string){
        return new Token(accessToken, refreshToken);
    }


    private setAccessToken(accessToken: string){
        this.accessToken=accessToken;
    }

    private setRefreshToken(refreshToken: string){
        this.refreshToken=refreshToken;
    }
}