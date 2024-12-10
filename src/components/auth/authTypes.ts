export interface AuthData{
    email: string,
    password: string,
    confirmPassword?: string,
    [key: string]: string | undefined
}

interface Input {
    form: string,
    type: string,
    class: string,
    name: string,
    placeholder: string
}

export interface AuthTemplateData {
    title: string,
    info: string,
    inputs: Input[],
    buttontitle: string,
    pretext: string,
    anchortext: string
}