export interface MathSolveProblemsResponse {
    success: boolean;
    data: Data;
    originalImage: string;
    timestamp: Date;
}

export interface Data {
    transcripcion: string;
    tipoProblema: string;
    conceptosClave: string[];
    solucion: string;
    metodosAlternativos: string;
    conceptosRelacionados: string[];
    nivelDificultad: string;
}

export interface Solucion {
    pasos: Paso[];
    respuestaFinal: string;
    verificacion: string;
}

export interface Paso {
    numero: number;
    descripcion: string;
    formula: string;
    explicacion: string;
}
