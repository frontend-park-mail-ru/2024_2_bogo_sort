declare module '*.hbs' {
    const content: (context?: object) => string;
    export default content;
}