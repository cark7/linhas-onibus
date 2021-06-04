export interface Onibus { 
    id:number,
    codigo: string,
    nome:string
}
export interface Lotacao{
    id: number,
    codigo: string,
    nome: string
}
export interface Locate {
    lat: any,
    lng: any
}

export interface ItinerarioHeader{
    idlinha: number,
    nome: string,
    codigo: string,
}
export interface ItinerarioItems{ // prespuesta del servidor 
    idlinha: number,
    nome: string,
    codigo: string,
    locates: [Locate]
}