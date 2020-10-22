class User{
    private _id: number;
    private _nombre: string;
    private _eMail: string;
    private _isLogged: boolean;

    constructor (id: number, nombre: string, eMail: string){
        this._id= id;
        this._nombre= nombre;
        this._eMail= eMail;
    }

    set id (id: number){
        this._id= id;
    }

    get id (): number {
        return this._id;
    }
    
    set nombre (nombre: string){
        this._nombre= nombre;
    }

    get nombre (): string {
        return this._nombre;
    }
    
    set email (eMail: string){
        this._eMail= eMail;
    }

    get email (): string {
        return this._eMail;
    }

    printInfo(): void {
        console.log("id: " + this._id + ", nombre: " + this._nombre + ", email: " + this._eMail);
    }

    get isLogged(): boolean{
        return this._isLogged;
    }
}