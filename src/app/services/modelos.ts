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
    lat: string,
    lng: string
}
export interface Itinerario{
    idlinha: number,
    nome: string,
    codigo: string,
    locates: [Locate]
}
