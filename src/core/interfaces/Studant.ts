export interface Studant {
    
    name: string,
    birthdate: Date, // 'YYYY-MM-DD HH:MM:SS.ffffff'
    gender: string,
    cpf: string,
    phone?: string | undefined,
    email: string,
    subject: string,
    registered: boolean,
    subjectId: number

};
