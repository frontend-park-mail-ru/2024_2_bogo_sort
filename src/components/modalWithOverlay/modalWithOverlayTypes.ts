export interface SelectOption {
    name: string,
    value: string,
}

export type InputTypes = 'text' | 'number' | 'checkbox' | 'range' | 'file';

export interface Input {
    name: string,
    type: InputTypes,
    label: string,
    placeholder: string
}

export interface ModalWithOverlayTemplateData {
    title: string,
    info: string,
    select?: boolean,
    selectLabel?: string,
    selectOptions?: SelectOption[],
    selectName?: string,
    inputs?: Input[],
    buttonText: string,
    redirectUrl?: string 
}